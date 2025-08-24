"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm";

export default function SignUpPage() {
  const [mode, setMode] = useState<"login" | "signup" | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignUpSubmit = async () => {
    setError("");
    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.status === 201) {
      alert("Account created! Please login.");
      setMode(null);
    } else {
      const data = await res.json();
      setError(data.error);
    }
  };

  const handleLoginSubmit = async () => {
    setError("");
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/dashboard"); // change as needed
    }
  };

  return <AuthForm mode="signup" />;
  // <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white space-y-4 px-4">
  //   <h1 className="text-2xl font-bold">Welcome</h1>

  //   {mode === null && (
  //     <>
  //       <button
  //         onClick={() => setMode('login')}
  //         className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 w-60"
  //       >
  //         Log In
  //       </button>

  //       <button
  //         onClick={() => setMode('signup')}
  //         className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 w-60"
  //       >
  //         Sign Up
  //       </button>
  //     </>
  //   )}

  //   {(mode === 'signup' || mode === 'login') && (
  //     <div className="flex flex-col space-y-3 items-center border border-gray-700 p-4 rounded w-full max-w-sm">
  //       <h2 className="text-xl font-semibold">
  //         {mode === 'signup' ? 'Sign Up Options' : 'Log In Options'}
  //       </h2>

  //       {/* Email/Password Form */}
  //       <input
  //         type="email"
  //         placeholder="Email"
  //         value={email}
  //         onChange={(e) => setEmail(e.target.value)}
  //         className="p-2 rounded text-black w-full"
  //       />
  //       <input
  //         type="password"
  //         placeholder="Password"
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //         className="p-2 rounded text-black w-full"
  //       />

  //       {error && <p className="text-red-500">{error}</p>}

  //       <button
  //         onClick={mode === 'signup' ? handleSignUpSubmit : handleLoginSubmit}
  //         className={`w-full ${
  //           mode === 'signup' ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
  //         } px-4 py-2 rounded`}
  //       >
  //         {mode === 'signup' ? 'Create Account' : 'Log In with Email'}
  //       </button>

  //       {/* Google Sign-in Button */}
  //       <button
  //         onClick={() => signIn('google')}
  //         className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded w-full"
  //       >
  //         {mode === 'signup' ? 'Sign Up with Google' : 'Log In with Google'}
  //       </button>

  //       <button
  //         onClick={() => {
  //           setMode(null);
  //           setError('');
  //           setEmail('');
  //           setPassword('');
  //         }}
  //         className="text-sm underline text-gray-400 mt-2"
  //       >
  //         Back
  //       </button>
  //     </div>
  //   )}
  // </div>
}
