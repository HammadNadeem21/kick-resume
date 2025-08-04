// import Replicate from "replicate";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const formData = await req.formData();
//   const file = formData.get("image") as File;

//   if (!file) {
//     return NextResponse.json({ error: "Image required" }, { status: 400 });
//   }

//   const buffer = Buffer.from(await file.arrayBuffer());
//   const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

//   const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN! });

//   // 🤵 Suit overlay model with face-preserve
//   const outputUrl = await replicate.run(
//     "akira124/suitup",
//     { input: { image: base64Image } }
//   );

//   return NextResponse.json({ url: outputUrl });
// }
