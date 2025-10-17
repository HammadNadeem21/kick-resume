// export const runtime = "nodejs";

// import { NextRequest, NextResponse } from "next/server";
// import pdfParse from "pdf-parse";
// import mammoth from "mammoth";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { tr } from "date-fns/locale";

// const geminiApiKey = process.env.GEMINI_BATCH_API_KEY;

// if (!geminiApiKey) {
//   // This check is crucial for a production environment.
//   // It ensures the API key is always configured before the app starts.
//   throw new Error("GEMINI_BATCH_API_KEY environment variable is not set.");
// }

// const genAI = new GoogleGenerativeAI(geminiApiKey);

// const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();
//     const jobDescription = formData.get("jobDescription") as string;
//     const files = formData.getAll("resumes") as File[];

//     if (!jobDescription || files.length === 0) {
//       return NextResponse.json(
//         { error: "Job description and resumes are required." },
//         { status: 400 }
//       );
//     }
//     return NextResponse.json({
//       success: true,
//       message: "Endpoint is working.",
//       jobDescription,
//       fileCount: files.length,
//     });
//   } catch (err: any) {
//     console.error("Error analyzing resumes:", err);
//     return NextResponse.json(
//       { error: "Failed to analyze resumes", details: err.message },
//       { status: 500 }
//     );
//   }
// }

export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import textract from "textract";
import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiApiKey = process.env.GEMINI_BATCH_API_KEY;

if (!geminiApiKey) {
  throw new Error("GEMINI_BATCH_API_KEY environment variable is not set.");
}

const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

// Helper function: extract text from file using textract
async function extractText(buffer: Buffer, fileName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    textract.fromBufferWithMime(
      fileName.endsWith(".pdf")
        ? "application/pdf"
        : "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      buffer,
      (error, text) => {
        if (error) reject(error);
        resolve(text || "");
      }
    );
  });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const jobDescription = formData.get("jobDescription") as string;
    const files = formData.getAll("resumes") as File[];

    if (!jobDescription || files.length === 0) {
      return NextResponse.json(
        { error: "Job description and resumes are required." },
        { status: 400 }
      );
    }

    // Extract text from all uploaded resumes
    const resumeTexts: string[] = [];
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const text = await extractText(buffer, file.name);
      resumeTexts.push(text);
    }

    // 🔹 For now, just return extracted text (AI analysis baad me add karenge)
    return NextResponse.json({
      success: true,
      jobDescription,
      fileCount: files.length,
      extractedTexts: resumeTexts,
    });
  } catch (err: any) {
    console.error("Error analyzing resumes:", err);
    return NextResponse.json(
      { error: "Failed to analyze resumes", details: err.message },
      { status: 500 }
    );
  }
}
