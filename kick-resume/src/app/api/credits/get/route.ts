import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "../../../../../models/user";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  await connectToDatabase();

  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ error: "User not found" });

  return NextResponse.json({ credits: user.credits });
}
