import { NextRequest, NextResponse } from "next/server";
import { Runner, Agent } from "@openai/agents";
import { OpenAIChatCompletionsModel } from "@openai/agents-openai";
import OpenAI from "openai";

const geminiApiKey = process.env.GEMINI_API_KEY2;

export async function POST(request: NextRequest) {
    try {
        const pdf = require("pdf-parse/lib/pdf-parse.js");
        const mammoth = require("mammoth");

        if (!geminiApiKey) {
            return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
        }

        const openai = new OpenAI({
            apiKey: geminiApiKey,
            baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
        });

        const model = new OpenAIChatCompletionsModel(openai, "models/gemini-flash-latest");

        const formData = await request.formData();
        const file = formData.get("resume") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        let extractedText = "";

        const fileType = file.type;
        const fileName = file.name.toLowerCase();

        if (fileType === "application/pdf" || fileName.endsWith(".pdf")) {
            const data = await pdf(buffer);
            extractedText = data.text;
        } else if (
            fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
            fileName.endsWith(".docx")
        ) {
            const result = await mammoth.extractRawText({ buffer });
            extractedText = result.value;
        } else {
            return NextResponse.json(
                { error: "Unsupported file type" },
                { status: 400 }
            );
        }

        if (!extractedText.trim()) {
            return NextResponse.json({ error: "Failed to extract text" }, { status: 400 });
        }

        const agent = new Agent({
            name: "ResumeAnalyzerAgent",
            model: model,
            instructions: `
You are an expert in Applicant Tracking Systems (ATS) and resume optimization.  
Your task is to analyze the provided resume strictly for ATS compatibility and return your response in **valid JSON format** matching the structure below.  

Return data in this strict JSON format:
{
    "ats_score": 0,
    "overall_assessment": "",
    "actual_summary": "",
    "summary_mistakes": [],
    "improved_summary": "",
    "cover_letter": "",
    "keywords_suggestions_score": 0,
    "keywords_suggestions": [],
    "formatting_suggestions_score": 0,
    "formatting_suggestions": [],
    "education_suggestions_score": 0,
    "education_suggestions": [],
    "experience_suggestions_score": 0,
    "experience_suggestions": []
}
      `,
        });

        const runner = new Runner();
        const result = await runner.run(agent, `Analyze the following resume: ${extractedText}`);

        const text = result.finalOutput as string;

        const match = text?.match(/\{[\s\S]*\}/);
        if (!match) {
            throw new Error("No JSON found in response");
        }

        const jsonData = JSON.parse(match[0]);
        return NextResponse.json({
            success: true,
            filename: file.name,
            result: jsonData,
        });

    } catch (error) {
        console.error("Error in analyze-resume API:", error);
        return NextResponse.json(
            { error: "Internal server error", details: String(error) },
            { status: 500 }
        );
    }
}
