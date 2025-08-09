export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import pdfParse from "pdf-parse";

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const jobDescription = formData.get("jobDescription");
    const resumeFile = formData.get("resume");

    if (!jobDescription || !resumeFile) {
      return NextResponse.json(
        { error: "Missing job description or resume" },
        { status: 400 }
      );
    }

    if (!(resumeFile instanceof Blob)) {
      return NextResponse.json(
        { error: "Invalid resume file" },
        { status: 400 }
      );
    }

    const fileBuffer = Buffer.from(await resumeFile.arrayBuffer());
    const pdfData = await pdfParse(fileBuffer);
    const resumeText = pdfData.text;

    const model = genAi.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `
Compare the following resume with the given job description. 
Provide:
1. Compatibility score out of 100
2. Missing keywords/skills
3. Specific suggestions to improve the resume to match the job.

Job Description:
${jobDescription}

Resume:
${resumeText}

Output the result in a structured JSON format with this structure:
{
  "score": number,
  "missingSkills": ["..."],
  "suggestions": ["..."]
}
    `;

    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    let jsonData;
    try {
      const match = text.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("No JSON found");
      jsonData = JSON.parse(match[0]);
    } catch (err) {
      console.error("Failed to parse AI JSON:", err, text);
      return NextResponse.json(
        { error: "Invalid JSON from AI" },
        { status: 500 }
      );
    }

    return NextResponse.json(jsonData);
  } catch (error) {
    console.error("Error analyzing resume:", error);
    return NextResponse.json({ error: "Failed to analyze" }, { status: 500 });
  }
}
