import Replicate from "replicate";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json({ error: "Image required" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

    const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN! });

const outputUrl = await replicate.run("lucataco/headshot-generator", {
  input: {
    image: base64Image,
    guidance_scale: 7.5,
    prompt: "professional passport-style headshot with formal suit and blue background",
    num_inference_steps: 30
  }
});

    if (!outputUrl) {
      return NextResponse.json({ error: "Suit generation failed" }, { status: 500 });
    }

    return NextResponse.json({ url: outputUrl });

  } catch (err) {
    console.error("Suit API Error:", err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
