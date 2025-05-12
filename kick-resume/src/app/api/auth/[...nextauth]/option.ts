import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google"
import TwitterProvider from "next-auth/providers/twitter"

import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
   
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     username: {
    //       label: "Email",
    //       type: "email",
    //       placeholder: "Your username",
    //     },
    //     password: {
    //       label: "Password",
    //       type: "password",
    //       placeholder: "Your password",
    //     },
    //   },
    //   async authorize(credentials) {

    //     const user = { id: "42", name: "hammad", password: "1234" };

    //     if (credentials?.username === user.name && credentials?.password === user.password) {
    //       return user;
    //     } else {
    //       return null;
    //     }
    //   }
    // }),
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID as string,
    //   clientSecret: process.env.GITHUB_SECRET as string,
    // }),


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
    //  Email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(credentials?.username || "")) {
      throw new Error("Only Gmail addresses are allowed.");
    }

    //  Hardcoded user for testing
    const user = { id: "42", email: "hammad@gmail.com", password: "1234" };

    if (credentials?.username === user.email && credentials?.password === user.password) {
      return user;
    } else {
      throw new Error("Invalid credentials.");
    }
  }
}),




    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
      version: "2.0",
    })
  ],
  
};
