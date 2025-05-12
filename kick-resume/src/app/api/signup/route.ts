// import { connectToDatabase } from "@/lib/mongodb";
// import User from "../../../../models/user";
// import bcrypt from "bcryptjs";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   await connectToDatabase();

//   const { name, email, password } = await req.json();

//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     return NextResponse.json({ error: "User already exists" }, { status: 400 });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser = new User({ name, email, password: hashedPassword });
//   await newUser.save();

//   return NextResponse.json({ message: "User created successfully" }, { status: 201 });
// }

import { connectToDatabase } from "@/lib/mongodb";
import User from "../../../../models/user"; // ✅ Ensure correct import
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDatabase(); // ✅ Ensure database connection

    const { name, email, password } = await req.json();

    // ✅ Validate input fields
    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // ✅ Email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Only Gmail addresses are allowed." }, { status: 400 });
    }

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists." }, { status: 400 });
    }

    // ✅ Hash password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return NextResponse.json({ message: "User created successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Sign-Up Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
