import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Agent, Runner } from "@openai/agents";
import { OpenAIChatCompletionsModel } from "@openai/agents-openai";
import OpenAI from "openai";

const geminiApiKey = process.env.GEMINI_API_KEY2;

const BulkUploadSchema = z.object({
    candidate_name: z.string(),
    relevance_score: z.number(),
    years_of_experience: z.number(),
    key_skills_match: z.array(z.string()),
    keywords_found: z.number(),
    education_level: z.string(),
    certifications: z.array(z.string()),
});

const BulkUploadResultSchema = z.object({
    candidates: z.array(BulkUploadSchema),
});

export async function POST(request: NextRequest) {
    try {
        // Lazy load legacy Node libraries
        const pdf = require("pdf-parse/lib/pdf-parse.js");
        const mammoth = require("mammoth");

        if (!geminiApiKey) {
            return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
        }

        const formData = await request.formData();
        const jobDescription = formData.get("jobDescription") as string | null;
        const resumeFiles = formData.getAll("resumes") as File[];

        if (!jobDescription || resumeFiles.length === 0) {
            return NextResponse.json({ error: "Job description and resumes are required" }, { status: 400 });
        }

        const resumeTexts: { name: string; text: string }[] = [];

        for (const file of resumeFiles) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            let extractedText = "";
            const fileType = file.type;
            const fileName = file.name.toLowerCase();

            try {
                if (fileType === "application/pdf" || fileName.endsWith(".pdf")) {
                    const data = await pdf(buffer);
                    extractedText = data.text;
                } else if (
                    fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                    fileName.endsWith(".docx")
                ) {
                    const result = await mammoth.extractRawText({ buffer });
                    extractedText = result.value;
                }
            } catch (err) {
                console.error(`Error parsing file ${file.name}:`, err);
                // Skip or handle error
            }

            if (extractedText.trim()) {
                resumeTexts.push({
                    name: file.name,
                    text: extractedText,
                });
            }
        }

        if (resumeTexts.length === 0) {
            return NextResponse.json({ error: "No text could be extracted from the provided resumes" }, { status: 400 });
        }

        const openai = new OpenAI({
            apiKey: geminiApiKey,
            baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
        });

        const model = new OpenAIChatCompletionsModel(openai, "models/gemini-flash-latest");

        const agent = new Agent({
            name: "BulkResumeAnalyzerAgent",
            instructions: `
You are a specialized recruitment AI. Your task is to analyze each candidate resume (provided as a list) against the job description. 

For each resume, you MUST return a structured object containing:
- candidate_name: string
- years_of_experience: number
- relevance_score: number (0-100)
- education_level: string
- certifications: array of strings
- key_skills_match: array of strings
- keywords_found: number (count of job-relevant keywords found in resume)

Finally, return an object with a 'candidates' key containing a list of these objects sorted by relevance_score in descending order.
      `,
            model: model,
            outputType: BulkUploadResultSchema,
        });

        const runner = new Runner();
        const userPrompt = `
Analyze the following resumes against the job description:

Job Description:
${jobDescription}

Resumes:
${JSON.stringify(resumeTexts, null, 2)}
`;

        const result = await runner.run(agent, userPrompt);

        return NextResponse.json({
            Success: true,
            resumeTexts: result.finalOutput?.candidates || [],
        });

    } catch (error) {
        console.error("Error in bulk-upload API:", error);
        return NextResponse.json(
            { error: "Internal server error", details: String(error) },
            { status: 500 }
        );
    }
}
