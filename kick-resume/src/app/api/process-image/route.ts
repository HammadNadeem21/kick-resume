// import Replicate from 'replicate';
// import { NextResponse } from 'next/server';

// export async function POST(request: Request) {
//     const formData = await request.formData();
//     const file = formData.get('image') as File;

//     console.log("File",file);
    

//     if (!file) {
//         return NextResponse.json({ error: 'Image file is required' }, { status: 400 });
//     }

//     const buffer = Buffer.from(await file.arrayBuffer());
//     const replicate = new Replicate({
//         auth: process.env.REPLICATE_API_TOKEN!,
//     });

//     // Background removal model
//     const output = await replicate.run("cjwbw/rembg", {
//       input: {
//         image: buffer,
//         model_name: "isnet-general-use"
//       }
//     });

//     console.log("Output from replicate:", output);

//     return NextResponse.json({ url: output }, { status: 200 });

// }



// /app/api/process-image/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const imageFile = formData.get("image") as File;

  if (!imageFile) {
    return NextResponse.json({ error: "No image provided" }, { status: 400 });
  }

  const buffer = Buffer.from(await imageFile.arrayBuffer());

  const response = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: {
      "X-Api-Key": process.env.REMOVE_BG_API_KEY!, // ✅ .env file me rakhna
    },
    body: (() => {
      const fd = new FormData();
      fd.append("image_file", new Blob([buffer]), imageFile.name);
      fd.append("size", "auto");
      return fd;
    })(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json({ error: errorText }, { status: 500 });
  }

  const blob = await response.blob();

  // ✅ Convert blob to base64 image URL
  const arrayBuffer = await blob.arrayBuffer();
  const base64Image = Buffer.from(arrayBuffer).toString("base64");
  const mimeType = blob.type;
  const base64Url = `data:${mimeType};base64,${base64Image}`;

  return NextResponse.json({ url: base64Url });
}
