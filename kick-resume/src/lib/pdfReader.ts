import pdf from "pdf-parse";
import { promises as fs } from "fs";

export async function extractTextFromPdf(filePath: string): Promise<string> {
  try {
    const dataBuffer = await fs.readFile(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    throw new Error("Failed to extract text from PDF");
  }
}
