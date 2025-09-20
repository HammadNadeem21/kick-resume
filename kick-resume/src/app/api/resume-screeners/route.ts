import { NextRequest, NextResponse } from "next/server";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiApiKey = process.env.GEMINI_BATCH_API_KEY;

if (!geminiApiKey) {
  // This check is crucial for a production environment.
  // It ensures the API key is always configured before the app starts.
  throw new Error("GEMINI_BATCH_API_KEY environment variable is not set.");
}

const genAI = new GoogleGenerativeAI(geminiApiKey);

const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

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

    // 🔹 Extract text from each file and filter for supported types
    const resumeTexts: { name: string; text: string; error?: string }[] = [];
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      let extractedText = "";
      let error = "";

      if (file.type === "application/pdf") {
        const data = await pdfParse(buffer);
        extractedText = data.text;
      } else if (
        file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        const data = await mammoth.extractRawText({ buffer });
        extractedText = data.value;
      } else if (file.type === "application/msword") {
        error =
          "DOC format is not supported. Please upload a .docx or .pdf file.";
      } else {
        error = `Unsupported file type: ${file.type}`;
      }

      // Only push files that can be processed or have a specific error to report back.
      if (extractedText || error) {
        resumeTexts.push({
          name: file.name,
          text: extractedText,
          error: error || undefined,
        });
      }
    }

    if (resumeTexts.length === 0) {
      return NextResponse.json(
        { error: "No supported resume files were provided." },
        { status: 400 }
      );
    }

    // 🔹 Prepare Batch Requests for Gemini (only for valid resumes)
    const batchRequests = resumeTexts
      .filter((resume) => !resume.error)
      .map((resume) => ({
        customId: resume.name,
        model: "gemini-1.5-pro",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `
                Compare the following resume with this job description.
                Analyze skills, experience, and qualifications to provide a detailed match analysis.
                
                Job Description:
                ${jobDescription}
                
                Resume:
                ${resume.text}
                
                Return ONLY JSON in this format. Do not include any other text or formatting:
                {
                  "matchScore": "percentage%",
                  "missingSkills": ["skill1", "skill2", "skill3"],
                  "strengths": ["point1", "point2", "point3"]
                }
                `,
              },
            ],
          },
        ],
      }));

    let batchResponses: any[] = [];
    if (batchRequests.length > 0) {
      // Sequentially call generateContent for each request
      for (const req of batchRequests) {
        // Pass only the parts array to generateContent
        const response = await model.generateContent(req.contents[0].parts);
        batchResponses.push(response);
      }
    }

    // 🔹 Format AI Response
    let results: any[] = [];
    let batchResponseIndex = 0;

    resumeTexts.forEach((resume) => {
      // Handle files that couldn't be processed before the API call
      if (resume.error) {
        results.push({
          name: resume.name,
          analysis: { error: resume.error },
        });
        return;
      }

      // Access the correct property based on actual response structure
      // Example: if responses are in batchResponse.data
      // const response = batchResponse.data[batchResponseIndex];
      // ...process response...

      batchResponseIndex++;
    });

    return NextResponse.json({ success: true, results });
  } catch (err: any) {
    console.error("Error analyzing resumes:", err);
    return NextResponse.json(
      { error: "Failed to analyze resumes", details: err.message },
      { status: 500 }
    );
  }
}

// import { GoogleGenAI } from '@google/genai';

// const ai = new GoogleGenAI({ apiKey: 'YOUR_API_KEY' });

// async function createBatchJob() {
//   const inlineRequests = [
//     {
//       'key': 'request-1',
//       'request': {
//         'contents': [
//           {
//             'parts': [
//               {
//                 'text': 'Describe the process of photosynthesis in one paragraph.'
//               }
//             ]
//           }
//         ]
//       }
//     },
//     {
//       'key': 'request-2',
//       'request': {
//         'contents': [
//           {
//             'parts': [
//               {
//                 'text': 'Explain the concept of quantum computing in simple terms.'
//               }
//             ]
//           }
//         ]
//       }
//     }
//   ];

//   try {
//     const batchJob = await ai.batches.create({
//       model: 'gemini-2.5-pro',
//       src: {
//         inlinedRequests: inlineRequests
//       },
//       config: {
//         displayName: 'My_First_Batch_Job',
//       }
//     });

//     console.log(Created batch job: ${batchJob.name});
//   } catch (error) {
//     console.error('Error creating batch job:', error);
//   }
// }

// createBatchJob();
