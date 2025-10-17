import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from pdfminer.high_level import extract_text as extract_pdf_text
import mammoth
import io
import google.generativeai as genai
from flask_cors import CORS  # Import CORS
from agents import (
    Runner,
    set_tracing_disabled,
)
from pydantic import BaseModel
import asyncio
from werkzeug.utils import secure_filename
from pdfminer.high_level import extract_text as pdfminer_extract_text
from backend.my_agents.resume_analyzer_agent import resume_analyzer_agent
from backend.my_agents.resume_job_analysisi_agent import resume_job_analysis_agent

# from backend.output_types.bulk_upload import BulkUpload
from backend.my_agents.bulk_resume_analyzer_agent import bulk_resume_analyzer_agent


# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


set_tracing_disabled(True)  # Disable tracing for cleaner output


@app.route("/api/bulkUpload", methods=["POST"])
def bulk_upload():
    try:
        if "jobDescription" not in request.form or "resumes" not in request.files:
            return jsonify({"error": "Job description and resumes are required."}), 400

        job_description = request.form["jobDescription"]
        files = request.files.getlist("resumes")

        print(
            f"Start - Received Job Description: {job_description}, Files: {len(files)}"
        )

        resume_texts = []
        for file in files:
            extracted_text = ""
            error = ""

            file_bytes = file.read()
            file_stream = io.BytesIO(file_bytes)

            if file.content_type == "application/pdf":
                try:
                    extracted_text = extract_pdf_text(file_stream)
                except Exception as e:
                    error = f"Error processing PDF: {e}"
            elif (
                file.content_type
                == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ):
                try:
                    result = mammoth.extract_raw_text(file_stream)
                    extracted_text = result.value
                except Exception as e:
                    error = f"Error processing DOCX: {e}"
            elif file.content_type == "application/msword":
                error = (
                    "DOC format is not supported. Please upload a .docx or .pdf file."
                )
            else:
                error = f"Unsupported file type: {file.content_type}"

            if extracted_text or error:
                resume_texts.append(
                    {
                        "name": file.filename,
                        "text": extracted_text,
                        # "error": error or None,
                    }
                )

        if not resume_texts:
            return jsonify({"error": "No supported resume files were provided."}), 400

        user_prompt = f"""
Analyze the following resumes against the job description:

Job Description:
{job_description}
`
Resumes:
    {resume_texts}
"""

        result = asyncio.run(
            Runner.run(starting_agent=bulk_resume_analyzer_agent, input=user_prompt)
        )
        print("Raw Responses:", result.raw_responses[0].usage.total_tokens)

        return jsonify(
            {
                "Success": True,
                "resumeTexts": [item.dict() for item in result.final_output],
                "tokenUsage": result.raw_responses[0].usage.total_tokens,
            }
        )

    except Exception as e:
        app.logger.error(f"Error processing request: {e}")
        return jsonify({"error": "Failed to process request", "details": str(e)}), 500


# for resume analysis
def extract_text_from_pdf(file_stream):
    try:
        # pdfminer expects a file-like object
        file_stream.seek(0)
        text = pdfminer_extract_text(file_stream)
        return text
    except Exception as e:
        return f"Error extracting PDF text: {e}"


def extract_text_from_docx(file_stream):
    try:
        file_stream.seek(0)
        result = mammoth.extract_raw_text(file_stream)
        if result.messages:
            # If there are warnings or errors, you can log or return them as needed
            pass
        return result.value
    except Exception as e:
        return f"Error extracting DOCX text: {e}"


@app.route("/api/analyzeResume", methods=["POST"])
def analyze_resume():
    try:
        if "resume" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["resume"]
        filename = secure_filename(file.filename)
        content_type = file.content_type

        extracted_text = None
        error = None

        if content_type == "application/pdf" or filename.lower().endswith(".pdf"):
            file_stream = io.BytesIO(file.read())
            extracted_text = extract_text_from_pdf(file_stream)
            if extracted_text is None or extracted_text.startswith(
                "Error extracting PDF text:"
            ):
                error = extracted_text or "Failed to extract text from PDF."
                extracted_text = None
        elif (
            content_type
            == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            or filename.lower().endswith(".docx")
        ):
            file_stream = io.BytesIO(file.read())
            extracted_text = extract_text_from_docx(file_stream)
            if extracted_text is None or extracted_text.startswith(
                "Error extracting DOCX text:"
            ):
                error = extracted_text or "Failed to extract text from DOCX."
                extracted_text = None
        else:
            error = "Unsupported file type. Please upload a PDF or DOCX file."

        if extracted_text:

            user_prompt = f"Analyze the folowing resume {extracted_text}"

            result = asyncio.run(
                Runner.run(starting_agent=resume_analyzer_agent, input=user_prompt)
            )

            output = result.final_output

            return jsonify(
                {
                    "success": True,
                    "filename": filename,
                    "extracted_text": extracted_text,
                    "result": (
                        [item.dict() for item in output]
                        if isinstance(output, list)
                        else output.dict()
                    ),
                    # "tokenUsage": usage.total_tokens,
                }
            )
        else:
            return (
                jsonify(
                    {
                        "success": False,
                        "filename": filename,
                        "error": error or "Failed to extract text.",
                    }
                ),
                400,
            )

    except Exception as e:
        app.logger.error(f"Error processing request: {e}")
        return jsonify({"error": "Failed to process request", "details": str(e)}), 500


@app.route("/api/resumeJobAnalysis", methods=["POST"])
def resume_job_analysis():
    try:
        if "resume" not in request.files or "jobDescription" not in request.form:
            return jsonify({"error": "No file uploaded"}), 400
        job_description = request.form["jobDescription"]
        file = request.files["resume"]
        filename = secure_filename(file.filename)
        content_type = file.content_type

        extracted_text = None
        error = None

        if content_type == "application/pdf" or filename.lower().endswith(".pdf"):
            file_stream = io.BytesIO(file.read())
            extracted_text = extract_text_from_pdf(file_stream)
            if extracted_text is None or extracted_text.startswith(
                "Error extracting PDF text:"
            ):
                error = extracted_text or "Failed to extract text from PDF."
                extracted_text = None
        elif (
            content_type
            == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            or filename.lower().endswith(".docx")
        ):
            file_stream = io.BytesIO(file.read())
            extracted_text = extract_text_from_docx(file_stream)
            if extracted_text is None or extracted_text.startswith(
                "Error extracting DOCX text:"
            ):
                error = extracted_text or "Failed to extract text from DOCX."
                extracted_text = None
        else:
            error = "Unsupported file type. Please upload a PDF or DOCX file."

        if extracted_text:
            user_prompt = f"Analyze the folowing resume {extracted_text} with the following job description {job_description}"
            result = asyncio.run(
                Runner.run(starting_agent=resume_job_analysis_agent, input=user_prompt)
            )
            return jsonify(
                {
                    "success": True,
                    "result": result.final_output.dict(),
                    "extracted_text": extracted_text,
                    "error": error,
                }
            )

        else:
            return (
                jsonify(
                    {
                        "success": False,
                        "filename": filename,
                        "error": error or "Failed to extract text.",
                    }
                ),
                400,
            )

    except Exception as e:
        app.logger.error(f"Error processing request: {e}")
        return jsonify({"error": "Failed to process request", "details": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
