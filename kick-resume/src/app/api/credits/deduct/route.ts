import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "../../../../../models/user";

export async function POST(req: NextRequest) {
  try {
    const { email, amount } = await req.json(); // amount = -3 or -5

    await connectToDatabase();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.credits - amount < 0) {
      return NextResponse.json(
        { error: "Not enough credits" },
        { status: 400 }
      );
    }

    const updatedCredits = user.credits - amount;

    user.credits = updatedCredits;
    await user.save();

    return NextResponse.json({ success: true, credits: user.credits });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
