"use client";
import { useState } from "react";
import { login } from "../api/auth"; // Adjust path as needed
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() { // Make sure this is here and properly formatted
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      
      // Store token and user info
      localStorage.setItem('auth-token', response.accessToken);
      localStorage.setItem('user-info', JSON.stringify(response.user));
      
      // Check if user has profiles
      if (response.user.profiles && response.user.profiles.length > 0) {
        // Redirect to profiles selection page
        window.location.href = '/browse/profiles';
      } else {
        // If no profiles, redirect to create profile page
        window.location.href = '/browse/create-profile';
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Header */}
      <header className="p-6">
        <div className="max-w-screen-xl mx-auto">
          <Link href="/">
            <span className="cursor-pointer">
              <Image 
                src="https://www.freepnglogos.com/uploads/netflix-logo-0.png" 
                alt="Netflix" 
                width={167} 
                height={45} 
              />
            </span>
          </Link>
        </div>
      </header>

      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/NetflixImage.jpg"
          alt="Background"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Login Form */}
      <main className="flex-grow flex items-center justify-center py-10">
        <div className="bg-black bg-opacity-75 p-16 rounded w-full max-w-md mx-4">
          <h1 className="text-white text-3xl font-bold mb-8">Sign In</h1>
          
          {error && (
            <div className="bg-[#e87c03] text-white p-4 mb-4 rounded">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email or phone number"
                className="w-full p-4 rounded bg-[#333] text-white"
                required
              />
            </div>
            
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-4 rounded bg-[#333] text-white"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-[#e50914] text-white p-4 rounded font-bold"
            >
              Sign In
            </button>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 bg-[#333] border-0"
                />
                <label htmlFor="remember" className="ml-2 text-gray-400 text-sm">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-gray-400 text-sm hover:underline">
                Need help?
              </a>
            </div>
          </form>
          
          <div className="mt-16">
            <p className="text-gray-400">
              New to Netflix?{" "}
              <Link href="/signup" className="text-white hover:underline">
                Sign up now
              </Link>
            </p>
            
            <p className="text-gray-400 text-sm mt-4">
              This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Learn more.
              </a>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black bg-opacity-75 py-8 text-gray-500 text-sm">
        <div className="max-w-screen-xl mx-auto px-4">
          <p className="mb-6">Questions? Call 1-800-NETFLIX</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="#" className="hover:underline">FAQ</a>
            <a href="#" className="hover:underline">Help Center</a>
            <a href="#" className="hover:underline">Terms of Use</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Cookie Preferences</a>
            <a href="#" className="hover:underline">Corporate Information</a>
          </div>
        </div>
      </footer>
    </div>
  );
}