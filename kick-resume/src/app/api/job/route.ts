import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse, NextRequest } from "next/server";

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY2!);

export async function POST(request: NextRequest) {
  try {
    const { userName, jobDescription } = await request.json();

    const model = genAi.getGenerativeModel({ model: "gemini-flash-latest" });

    const fullPrompt = `
    
    Generate a professional resume based on the following user information.

    User Name: {${userName}}

    Job Description: {${jobDescription}}

    The resume should include the following sections:
    1. Summary
    2. Skills
    3. Experience (at least 2 roles with realistic titles and responsibilities)
    4. Education
    5. Projects (related to the job role)
    6. Certifications (optional)
    7. Languages (optional)

    Use a formal, professional tone. Tailor the resume content to match the job description provided.
    
 Generate **10–20 realistic technical & behavioral interview questions** tailored to the job description.
- Each question should have:
  - \`question\` (string)
  - \`answer\` (string)
    
    
    
    Output the result in a structured JSON format with this structure:

    {
      "name": "{${userName}}",
      "role": "....",
      "summary": "....",
      "skills": ["...", "..."],
      "experience": [
        {
          "title": "...",
          "description": "...",
          "startDate": "...",
          "endDate": "..."
        }
      ],
      "education": [
        {
          "degree": "...",
          "startDate": "...",
          "endDate": "..."
        }
      ],
      "projects": [
        {
          "name": "...",
          "description": "..."
        }
      ],
      "certifications": ["..."],
      "languages": ["..."],
      "mockInterview": [
        {
            "question": "...",
            "answer": "..."
        }
        ]
    }
    `;

    const result = await model.generateContent(fullPrompt);

    const response = await result.response;

    const text = await response.text();
    // Try to extract the first JSON object from the text
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      const jsonData = JSON.parse(match[0]);
      return NextResponse.json(jsonData);
    } else {
      throw new Error("No valid JSON found in response");
    }

    // const jsonData = JSON.parse(text);

    // return NextResponse.json(text);
  } catch (error) {
    console.error("Error in generate-resume API:", error);
    return NextResponse.json({ error: "Failed to Generate" }, { status: 500 });
  }
}
