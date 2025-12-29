import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY2!);

export async function POST(request: NextRequest) {
  try {
    const { prompt, existingResume } = await request.json();
    // console.log("Prompt received:", prompt);
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    const result = await model.generateContent(`
 You are a resume extraction AI. Read the prompt below and extract the following fields in **valid JSON format**.

### Instructions:

- If "skills" are not explicitly provided by the user, intelligently infer them based on the **user's role, responsibilities, and projects**.
- Extract only **relevant technologies and tools** — avoid vague or generic terms like "Web Development", "Communication", or "Programming".
- Do not include job titles as skills.
- Use clean and specific skills like "React.js", "Node.js", "PostgreSQL", "MongoDB", etc.
- Experience descriptions should be 20 to 25 words, clear and action-driven.
- Project descriptions should be 15 to 20 words, clear and action-driven.
- Write a short, **first-person summary (under 80 words)** that sounds natural and professional.
- Carefully **merge** new information into the existing resume. **Preserve all previous data**, unless the new prompt explicitly updates a specific field.


- Each **experience** must contain:
  - **title** (with company if provided)
  - **description** (20 to 25 words using action verbs like "Built", "Managed", "Developed", etc.)
  - **startDate** and **endDate** in format "YYYY-MM". If dates are missing, estimate based on context.
  

- Do **not** remove or overwrite existing values unless the new prompt clearly updates them.
- Keep the structure consistent.

Return data in this strict JSON format:
  {
    "name": "",
    "role": "",
    "email": "",
    "phone": "",
    "address": "",
    "summary": "",
    "skills": [],
    "experience": [
      {
        "title": "",
        "companyName": "",
        "description": "",
        "startDate": "",
        "endDate": ""
      }
    ],
    "education": [
      {
        "degree": "",
        "startDate": "",
        "endDate": ""
      }
    ],
    "certifications": [],
    "languages": [],
    "projects": [
      {
        "name": "",
        "description": ""
      }
    ]
  }
### Existing Resume Data:
${JSON.stringify(existingResume)}

### New User Prompt:
${prompt}
    `);

    const response = await result.response;

    // console.log(
    //   "Raw response received from Gemini API",
    //   response.usageMetadata
    // );

    const tokensUsed = response.usageMetadata;
    console.log("Tokens used in this request:", tokensUsed);
    // const {} = response.usageMetadata;
    const text = await response.text();

    // Try to extract the first JSON object from the text
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      const jsonData = JSON.parse(match[0]);
      return NextResponse.json({
        ...jsonData,
        tokensUsed: tokensUsed || null,
      });
    } else {
      throw new Error("No valid JSON found in response");
    }
  } catch (error) {
    console.error("Error in generate-resume API:", error);
    return NextResponse.json(
      { error: "Failed to generate resume data" },
      { status: 500 }
    );
  }
}
