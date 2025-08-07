import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse, NextRequest } from "next/server";

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { userName, jobDescription } = await request.json();

    const model = genAi.getGenerativeModel({ model: "gemini-2.0-flash" });

    const fullPrompt = `Generate a professional resume based on the following user information.

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

    Use a formal, professional tone. Tailor the resume content to match the job description provided. Output the result in a structured JSON format with this structure:

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
      "languages": ["..."]
    }
    `;

    //     const fullPrompt = `
    // You are an expert resume writer. Based on the following user input, generate a professional and ATS-friendly resume tailored to the given job description.

    // User Name: ${userName}
    // Job Description: ${jobDescription}

    // Generate the resume with the following sections:
    // 1. **Summary**
    // 2. **Skills**
    // 3. **Experience**
    // 4. **Education**
    // 5. **Projects**
    // 6. **Certifications**
    // 7. **Languages**

    // 🎯 Use a formal and professional tone.
    // 🧠 Ensure the resume is optimized to match keywords from the job description.
    // 📦 Return the resume strictly in the following structured **JSON format**:

    // {
    //   "name": "${userName}",
    //   "summary": "...",
    //   "skills": ["..."],
    //   "experience": [...],
    //   "education": [...],
    //   "projects": [...],
    //   "certifications": ["..."],
    //   "languages": ["..."]
    // }

    // Only return valid JSON without extra commentary.
    // `;
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
