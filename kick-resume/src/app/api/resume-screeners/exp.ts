// import { NextRequest, NextResponse } from "next/server";
// import pdfParse from "pdf-parse";
// import mammoth from "mammoth";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const geminiApiKey = process.env.GEMINI_BATCH_API_KEY;

// if (!geminiApiKey) {
//   throw new Error("GEMINI_BATCH_API_KEY environment variable is not set.");
// }

// const genAI = new GoogleGenerativeAI(geminiApiKey);
// const fileManager = genAI.getGoogleAIFileManager();

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

//     // 🔹 Extract text from each file
//     const resumeTexts: { name: string; text: string; error?: string }[] = [];
//     for (const file of files) {
//       const buffer = Buffer.from(await file.arrayBuffer());
//       let extractedText = "";
//       let error = "";

//       if (file.type === "application/pdf") {
//         const data = await pdfParse(buffer);
//         extractedText = data.text;
//       } else if (
//         file.type ===
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//       ) {
//         const data = await mammoth.extractRawText({ buffer });
//         extractedText = data.value;
//       } else {
//         error = Unsupported file type: ${file.type};
//       }

//       if (extractedText || error) {
//         resumeTexts.push({
//           name: file.name,
//           text: extractedText,
//           error: error || undefined,
//         });
//       }
//     }

//     const validResumes = resumeTexts.filter((resume) => !resume.error);
//     if (validResumes.length === 0) {
//       return NextResponse.json(
//         { error: "No supported resume files were provided." },
//         { status: 400 }
//       );
//     }

//     // 🔹 Prepare Batch Requests for Gemini
//     const inlineRequests = validResumes.map((resume) => ({
//       key: resume.name, // The unique identifier for this specific request
//       request: {
//         model: "gemini-2.5-pro",
//         contents: [
//           {
//             role: "user",
//             parts: [
//               {
//                 text: `
//                 Compare the following resume with this job description.
//                 Analyze skills, experience, and qualifications to provide a detailed match analysis.

//                 Job Description:
//                 ${jobDescription}

//                 Resume:
//                 ${resume.text}

//                 Return ONLY JSON in this format. Do not include any other text or formatting:
//                 {
//                   "matchScore": "percentage%",
//                   "missingSkills": ["skill1", "skill2", "skill3"],
//                   "strengths": ["point1", "point2", "point3"]
//                 }
//                 `,
//               },
//             ],
//           },
//         ],
//       },
//     }));

//     // 🔹 Create the Batch Job
//     const batchJob = await genAI.batches.create({
//       displayName: "Resume_Analysis_Job",
//       model: "gemini-2.5-pro", // This specifies the model for all requests
//       src: {
//         inlinedRequests,
//       },
//     });

//     console.log(Created batch job: ${batchJob.name}. Job status: ${batchJob.state});

//     // At this point, you've successfully created the job.
//     // The results are not yet available.
//     // For a real application, you would save batchJob.name and poll for completion later.

//     // 🔹 For demonstration, we'll poll for the job status (not recommended for production).
//     let jobStatus = await genAI.batches.get(batchJob.name);
//     let attempts = 0;
//     while (jobStatus.state !== 'SUCCEEDED' && jobStatus.state !== 'FAILED' && attempts < 120) {
//         await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
//         jobStatus = await genAI.batches.get(batchJob.name);
//         console.log(Polling status: ${jobStatus.state});
//         attempts++;
//     }

//     if (jobStatus.state === 'SUCCEEDED') {
//       const results = await jobStatus.results;
//       // Process and format the results as needed.
//       return NextResponse.json({
//           success: true,
//           jobStatus: jobStatus.state,
//           results,
//       });
//     } else {
//         return NextResponse.json({
//             success: false,
//             error: "Batch job failed or timed out.",
//             jobStatus: jobStatus.state,
//         }, { status: 500 });
//     }

//   } catch (err: any) {
//     console.error("Error analyzing resumes:", err);
//     return NextResponse.json(
//       { error: "Failed to analyze resumes", details: err.message },
//       { status: 500 }
//     );
//   }
// }
