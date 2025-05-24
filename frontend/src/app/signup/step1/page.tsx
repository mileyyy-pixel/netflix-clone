"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function SignUpStep1() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Get email from localStorage
    const storedEmail = localStorage.getItem('signup-email');
    if (storedEmail) {
      setEmail(storedEmail);
      setIsLoading(false);
    } else {
      // If no email is stored, redirect back to signup
      // Adding a small delay to prevent flickering
      const timer = setTimeout(() => {
        router.push('/signup');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [router]);

  const handleContinue = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Save the potentially updated email
    localStorage.setItem('signup-email', email);
    router.push('/signup/step2');
  };

  // Show loading state until we've checked for email
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <img
          src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
          alt="Netflix"
          className="h-16 mb-6"
        />
        <p>Loading...</p>
      </div>
    );
  }

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
            <p className="text-sm mb-4">STEP 1 OF 4</p>
            <h1 className="text-3xl font-bold mb-4">Verify your email</h1>
            <p className="text-xl">
              We'll need to verify this email: <strong>{email}</strong>
            </p>
          </div>

          <form onSubmit={handleContinue} className="space-y-6">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 rounded bg-gray-700 text-white"
                required
              />
              <p className="text-sm text-gray-400 mt-1">Please confirm your email address.</p>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white p-4 rounded font-bold text-xl hover:bg-red-700"
            >
              Verify and Continue
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}