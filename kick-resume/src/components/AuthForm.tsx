'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUpSubmit = async () => {
    const res = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.status === 201) {
      alert('Account created! Please login.');
      router.push('/login');
    } else {
      const data = await res.json();
      setError(data.error);
    }
  };

  const handleLoginSubmit = async () => {
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white space-y-4 px-4">
      <h2 className="text-2xl font-semibold">
        {mode === 'signup' ? 'Create an Account' : 'Welcome Back'}
      </h2>

      <div className="flex flex-col space-y-3 items-center border border-gray-700 p-4 rounded w-full max-w-sm">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded text-black w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded text-black w-full"
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          onClick={mode === 'signup' ? handleSignUpSubmit : handleLoginSubmit}
          className={`w-full ${
            mode === 'signup'
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-blue-500 hover:bg-blue-600'
          } px-4 py-2 rounded`}
        >
          {mode === 'signup' ? 'Sign Up with Email' : 'Log In with Email'}
        </button>

        <button
          onClick={() => signIn('google')}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded w-full"
        >
          {mode === 'signup' ? 'Sign Up with Google' : 'Log In with Google'}
        </button>
      </div>
    </div>
  );
}
