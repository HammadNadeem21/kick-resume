// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { NextRequest, NextResponse } from "next/server";

// const genAai = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

// export async function POST(request: NextRequest) {
//   try {
//     const { prompt } = await request.json();

//     const modal = genAai.getGenerativeModel({ model: "gemini-pro" });

//     const result = await modal.generateContent(
//       `Extract the following fields in JSON format:
//     - name
//     - role
//     - skills (as an array)
//     - experience
//     - education (as an array)
//     - certifications (as an array)
//     - languages (as an array)
//     - projects (as an array)

//     prompt: ${prompt}`
//     );

//     const response = await result.response;
//     const text = await response.text();

//     const jsonData = JSON.parse(text);
//     return NextResponse.json(jsonData);
//   } catch (error) {
//     console.log("Error in generate-resume API:", error);
//     return NextResponse.json(
//       { error: "Failed to generate resume data" },
//       { status: 500 }
//     );
//   }
// }



// app/api/generate-resume/route.ts

console.log("GEMINI_API_KEY present:", !!process.env.GEMINI_API_KEY);
console.log("Request received at /api/generate-resume");

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    console.log("Prompt received:", prompt);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
   const result = await model.generateContent(`
  Extract the following fields in valid JSON format.
 Based on the prompt, generate a short and professional **first-person** summary (as if written by the user themselves).

  {
    "name": "",
    "role": "",
    "summary": "",
    "skills": [],
    "experience": [
      {
        "title": "",
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

  Prompt: ${prompt}
`);



    const response = await result.response;
    const text = await response.text();

    // Try to extract the first JSON object from the text
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      const jsonData = JSON.parse(match[0]);
      return NextResponse.json(jsonData);
    } else {
      throw new Error('No valid JSON found in response');
    }
  } catch (error) {
    console.error("Error in generate-resume API:", error);
    return NextResponse.json(
      { error: "Failed to generate resume data" },
      { status: 500 }
    );
  }
}
