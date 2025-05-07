// // pages/api/analyzeResume.js
// import { GoogleGenerativeAI } from '@google/genai';
// import pdf from 'pdf-parse';
// import { IncomingForm } from 'formidable';
// import fs from 'fs/promises';

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.GenerativeModel({ model: 'gemini-pro' });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const form = new IncomingForm();

//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         console.error('Form parsing error:', err);
//         return res.status(500).json({ error: 'File upload karne mein kharabi hui.' });
//       }

//       const resumeFile = files.resume;

//       if (!resumeFile) {
//         return res.status(400).json({ error: 'Koi resume file upload nahi ki gayi.' });
//       }

//       try {
//         const fileData = await fs.readFile(resumeFile[0].filepath);
//         const pdfData = await pdf(fileData);
//         const resumeText = pdfData.text;

//         const prompt = `Analyze this resume and provide:
//         1. An overall rating out of 100.
//         2. A list of weaknesses in the resume.
//         3. 2-3 specific suggestions for improvement.

//         Resume Text:
//         ${resumeText}`;

//         const aiResponse = await model.generateContent(prompt);
//         const analysisResult = aiResponse.response.text();

//         // Parse the AI response to extract rating, weaknesses, and suggestions
//         const ratingMatch = analysisResult.match(/Rating: (\d+)\/100/i);
//         const rating = ratingMatch ? parseInt(ratingMatch[1]) : null;

//         const weaknessesMatch = analysisResult.match(/Weaknesses:\n([\s\S]*?)Suggestions:/i);
//         const weaknesses = weaknessesMatch ? weaknessesMatch[1].trim().split('\n').filter(item => item.trim() !== '') : [];

//         const suggestionsMatch = analysisResult.match(/Suggestions:\n([\s\S]*)/i);
//         const suggestions = suggestionsMatch ? suggestionsMatch[1].trim().split('\n').filter(item => item.trim() !== '') : [];

//         res.status(200).json({ rating, weaknesses, suggestions, rawAnalysis: analysisResult });

//       } catch (error) {
//         console.error('Error processing PDF or calling Gemini API:', error);
//         res.status(500).json({ error: 'Resume analyze karne mein kharabi hui.' });
//       } finally {
//         await fs.unlink(resumeFile[0].filepath); // Clean up temporary file
//       }
//     });
//   } else {
//     res.status(405).json({ message: 'Sirf POST requests qubool kiye jaate hain.' });
//   }
// }




// import { NextRequest, NextResponse } from 'next/server';
// import { GoogleGenerativeAI } from '@google/generative-ai';

// import pdf from 'pdf-parse';
// import { IncomingForm } from 'formidable';
// import fs from 'fs/promises';
// import path from 'path';

// // Disable Next.js body parser
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// // Helper to parse multipart form (file upload)
// const parseForm = (req: any): Promise<{ fields: any; files: any }> => {
//   return new Promise((resolve, reject) => {
//     const form = new IncomingForm({ keepExtensions: true, multiples: true });

//     form.parse(req, (err, fields, files) => {
//       if (err) reject(err);
//       else resolve({ fields, files });
//     });
//   });
// };

// export async function POST(req: NextRequest) {
//   try {
//     const body = req.body;
//     const reader = body?.getReader?.();

//     if (!reader) {
//       return NextResponse.json({ error: 'Request body stream not found.' }, { status: 400 });
//     }

//     const stream = new ReadableStream({
//       start(controller) {
//         const pump = (): Promise<void> =>
//           reader.read().then(({ done, value }) => {
//             if (done) {
//               controller.close();
//               return;
//             }
//             controller.enqueue(value);
//             return pump();
//           });

//         return pump();
//       },
//     });

//     // Patch request to work with formidable
//     const formReq = Object.assign(req, { body: stream }) as any;
//     const { files } = await parseForm(formReq);

//     const resumeFile = files.resume?.[0] || files.resume;

//     if (!resumeFile) {
//       return NextResponse.json({ error: 'Koi resume file upload nahi hui.' }, { status: 400 });
//     }

//     const fileData = await fs.readFile(resumeFile.filepath);
//     const pdfData = await pdf(fileData);
//     const resumeText = pdfData.text;

//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
//     const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

//     const prompt = `Analyze this resume and provide:
// 1. An overall rating out of 100.
// 2. A list of weaknesses in the resume.
// 3. 2-3 specific suggestions for improvement.

// Resume Text:
// ${resumeText}`;

//     const result = await model.generateContent(prompt);
//     const text = result.response.text();

//     const ratingMatch = text.match(/Rating: (\d+)\/100/i);
//     const rating = ratingMatch ? parseInt(ratingMatch[1]) : null;

//     const weaknessesMatch = text.match(/Weaknesses:\n([\s\S]*?)Suggestions:/i);
//     const weaknesses = weaknessesMatch
//       ? weaknessesMatch[1].trim().split('\n').filter((line) => line.trim())
//       : [];

//     const suggestionsMatch = text.match(/Suggestions:\n([\s\S]*)/i);
//     const suggestions = suggestionsMatch
//       ? suggestionsMatch[1].trim().split('\n').filter((line) => line.trim())
//       : [];

//     await fs.unlink(resumeFile.filepath);

//     return NextResponse.json({
//       rating,
//       weaknesses,
//       suggestions,
//       rawAnalysis: text,
//     });
//   } catch (err: any) {
//     console.error('Resume Analysis Error:', err);
//     return NextResponse.json({ error: 'Resume analyze karne mein masla hua.' }, { status: 500 });
//   }
// }








import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import pdf from 'pdf-parse';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('resume') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  let text = '';
  try {
    const data = await pdf(buffer);
    text = data.text;
  } catch (err) {
    return NextResponse.json({ error: 'Failed to extract PDF text' }, { status: 500 });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `You are an expert resume reviewer. Please read the following resume text and provide constructive feedback, improvement suggestions, and potential issues:\n\n${text}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const suggestions = response.text();

    return NextResponse.json({ suggestions });
  } catch (err) {
    return NextResponse.json({ error: 'Gemini API error', detail: err }, { status: 500 });
  }
}
