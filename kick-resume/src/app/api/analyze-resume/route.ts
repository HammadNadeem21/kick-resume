import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Agent, Runner } from '@openai/agents';
import { OpenAIChatCompletionsModel } from '@openai/agents-openai';
import OpenAI from 'openai';

const geminiApiKey = process.env.GEMINI_API_KEY2;

const AnalyzeResumeSchema = z.object({
    ats_score: z.number().min(0).max(100),
    overall_assessment: z.string(),
    actual_summary: z.string(),
    summary_mistakes: z.array(z.string()),
    improved_summary: z.string(),
    cover_letter: z.string(),
    keywords_suggestions_score: z.number().min(0).max(100),
    keywords_suggestions: z.array(z.string()),
    formatting_suggestions_score: z.number().min(0).max(100),
    formatting_suggestions: z.array(z.string()),
    education_suggestions_score: z.number().min(0).max(100),
    education_suggestions: z.array(z.string()),
    experience_suggestions_score: z.number().min(0).max(100),
    experience_suggestions: z.array(z.string()),
});

export async function POST(request: NextRequest, response: NextResponse) {
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
Your task is to analyze the provided resume strictly for ATS compatibility.

Specifically, evaluate:
1. "ats_score": Overall optimization score.
2. "overall_assessment": General feedback.
3. "actual_summary": The existing summary found in the resume.
4. "summary_mistakes": List of specific issues with the current summary.
5. "improved_summary": A rewritten, ATS-optimized version of the summary.
6. "cover_letter": A drafted cover letter based on the resume.
7. "keywords_suggestions": Missing important keywords.
8. "formatting_suggestions": Layout/structure improvements.
9. "education_suggestions": Ways to better present education.
10. "experience_suggestions": Ways to better present work experience.
      `,
            outputType: AnalyzeResumeSchema,
        });

        const runner = new Runner();
        const result = await runner.run(agent, `Analyze the following resume: ${extractedText}`);

        return NextResponse.json({
            success: true,
            filename: file.name,
            result: result.finalOutput,
        });

    } catch (error) {
        console.error("Error in analyze-resume API:", error);
        return NextResponse.json(
            { error: "Internal server error", details: String(error) },
            { status: 500 }
        );
    }
}
