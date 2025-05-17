// import type { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// import CredentialsProvider from "next-auth/providers/credentials";

// export const options: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: {
//           label: "Email",
//           type: "email",
//           placeholder: "Your email",
//         },
//         password: {
//           label: "Password",
//           type: "password",
//           placeholder: "Your password",
//         },
//       },
//       async authorize(credentials) {
//         //  Email format validation
//         const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
//         if (!emailRegex.test(credentials?.username || "")) {
//           throw new Error("Only Gmail addresses are allowed.");
//         }

//         //  Hardcoded user for testing
//         const user = { id: "42", email: "hammad@gmail.com", password: "1234" };

//         if (
//           credentials?.username === user.email &&
//           credentials?.password === user.password
//         ) {
//           return user;
//         } else {
//           throw new Error("Invalid credentials.");
//         }
//       },
//     }),

//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//   ],
// };


import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/mongodb";
import User from "../../../../../models/user";
import bcrypt from "bcryptjs";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "Your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your password",
        },
      },
      async authorize(credentials) {
        const email = credentials?.username;
        const password = credentials?.password;

        if (!email || !password) {
          throw new Error("Email and Password required");
        }

        // ✅ Gmail-only validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!emailRegex.test(email)) {
          throw new Error("Only Gmail addresses are allowed.");
        }

        // ✅ Connect to DB
        await connectToDatabase();

        // ✅ Check if user already exists
        let user = await User.findOne({ email });

        if (!user) {
          // ✅ Create new user
          const hashedPassword = await bcrypt.hash(password, 10);
          user = await User.create({
            email,
            password: hashedPassword,
          });

          return { id: user._id.toString(), email: user.email };
          
        }

        // ✅ If user exists, check password
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
          throw new Error("Invalid password");
        }

        return { id: user._id.toString(), email: user.email };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  
};

