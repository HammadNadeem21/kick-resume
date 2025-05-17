// import * as pdfjsLib from 'pdfjs-dist';
// import worker from 'pdfjs-dist/build/pdf.worker.entry';

// (pdfjsLib as any).GlobalWorkerOptions.workerSrc = worker;
"use client"
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min';

(pdfjsLib as any).GlobalWorkerOptions.workerSrc = window.URL.createObjectURL(
  new Blob([pdfWorker.toString()], { type: 'application/javascript' })
);


export async function extractTextFromPDF(file: File): Promise<string> {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = async () => {
      try {
        const typedArray = new Uint8Array(reader.result as ArrayBuffer);
        const pdf = await (pdfjsLib as any).getDocument({ data: typedArray }).promise;
        let text = '';

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items.map((item: any) => item.str).join(' ');
          text += pageText + '\n';
        }

        resolve(text);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}
