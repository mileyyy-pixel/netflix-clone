"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function SignUpStep2() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem('signup-email');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      router.push('/signup');
    }
  }, [router]);

  const handleContinue = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    // Validate password strength
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    // Store password and move to next step
    localStorage.setItem('signup-password', password);
    router.push('/signup/step3');
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Header */}
      <header className="p-6 border-b border-gray-800">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <Link href="/">
            <span className="cursor-pointer">
              <img
                src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
                alt="Netflix"
                className="h-8 md:h-10"
              />
            </span>
          </Link>
          <Link href="/login">
            <button className="px-4 py-1 text-lg font-medium hover:underline">
              Sign In
            </button>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center py-10">
        <div className="w-full max-w-md mx-4 p-8">
          <div className="text-center mb-8">
            <p className="text-sm mb-4">STEP 2 OF 4</p>
            <h1 className="text-3xl font-bold mb-4">Create a password</h1>
            <p className="text-xl">
              Just a few more steps and you're finished!
            </p>
          </div>

          <form onSubmit={handleContinue} className="space-y-6">
            <div>
              <input
                type="email"
                value={email}
                disabled
                className="w-full p-4 rounded bg-gray-800 text-gray-400"
              />
            </div>
            
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Add a password"
                className="w-full p-4 rounded bg-gray-700 text-white"
                required
              />
              {error && (
                <p className="text-red-500 mt-1">{error}</p>
              )}
              <p className="text-sm text-gray-400 mt-1">
                Your password must contain at least 6 characters.
              </p>
            </div>
            
            <button
              type="submit"
              className="w-full bg-red-600 text-white p-4 rounded font-bold text-xl hover:bg-red-700"
            >
              Continue
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}