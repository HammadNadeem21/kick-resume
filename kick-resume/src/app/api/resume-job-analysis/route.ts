
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Agent, Runner } from '@openai/agents';
import { OpenAIChatCompletionsModel } from '@openai/agents-openai';
import OpenAI from 'openai';

const geminiApiKey = process.env.GEMINI_API_KEY2;

const SuggestionSchema = z.object({
    heading: z.string(),
    content: z.string(),
});

const ResumeJobAnalysisSchema = z.object({
    compatibility_score: z.number().min(0).max(100),
    skills_match_percentage: z.number().min(0).max(100),
    education_match: z.enum(["Matched", "Not Matched"]),
    experience_match: z.enum(["Matched", "Not Matched"]),
    missing_keywords_skills: z.array(z.string()),
    suggestions: z.array(SuggestionSchema),
});

export async function POST(request: NextRequest, response: NextResponse) {
    try {
        // Lazy load legacy Node libraries
        const pdf = require("pdf-parse/lib/pdf-parse.js");
        const mammoth = require("mammoth");

        if (!geminiApiKey) {
            return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
        }

        const formData = await request.formData();
        const file = formData.get("resume") as File | null;
        const jobDescription = formData.get("jobDescription") as string | null;

        if (!file || !jobDescription) {
            return NextResponse.json({ error: "Resume file and job description are required" }, { status: 400 });
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
            return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
        }

        if (!extractedText.trim()) {
            return NextResponse.json({ error: "Failed to extract text from resume" }, { status: 400 });
        }

        const openai = new OpenAI({
            apiKey: geminiApiKey,
            baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
        });

        const model = new OpenAIChatCompletionsModel(openai, "models/gemini-flash-latest");

        const agent = new Agent({
            name: "ResumeJobAnalysisAgent",
            model: model,
            instructions: `
You are an AI Resume-Job Compatibility Agent.  
Your task is to analyze a given resume against a job description. 

Specifically, you MUST evaluate:
1. "compatibility_score" (0–100) -> Overall fit between resume and job description.  
2. "skills_match_percentage" (0–100) -> Percentage of required skills present in the resume.  
3. "education_match" ("Matched" or "Not Matched") -> Does the resume’s education align with job requirements?
4. "experience_match" ("Matched" or "Not Matched") -> Does the resume’s experience align with the job description?
5. "missing_keywords_skills" (array of strings) -> List important keywords or skills from the job description missing in the resume.  
6. "suggestions" (array of objects with heading and content) -> Clear, detailed, and actionable recommendations.
      `,
            outputType: ResumeJobAnalysisSchema,
        });

        const runner = new Runner();
        const result = await runner.run(
            agent,
            `Analyze the following resume: ${extractedText} against the following job description: ${jobDescription}`
        );

        return NextResponse.json({
            success: true,
            result: result.finalOutput,
            extracted_text: extractedText
        });

    } catch (error) {
        console.error("Error in resume-job-analysis API:", error);
        return NextResponse.json(
            { error: "Internal server error", details: String(error) },
            { status: 500 }
        );
    }
}
