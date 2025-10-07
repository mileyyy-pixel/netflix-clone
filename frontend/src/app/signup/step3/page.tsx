"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpStep3() {
  const [selectedPlan, setSelectedPlan] = useState('standard');
  const router = useRouter();

  useEffect(() => {
    // Check if previous steps were completed
    const email = localStorage.getItem('signup-email');
    const password = localStorage.getItem('signup-password');
    
    if (!email || !password) {
      router.push('/signup');
    }
  }, [router]);

  const handleContinue = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Store selected plan
    localStorage.setItem('signup-plan', selectedPlan);
    router.push('/signup/step4');
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
        <div className="w-full max-w-2xl mx-4 p-8">
          <div className="text-center mb-8">
            <p className="text-sm mb-4">STEP 3 OF 4</p>
            <h1 className="text-3xl font-bold mb-4">Choose your plan</h1>
            <ul className="text-lg text-left max-w-md mx-auto space-y-4 mb-8">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-red-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Watch all you want. Ad-free.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-red-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Recommendations just for you.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-red-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Change or cancel your plan anytime.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <div 
              className={`border rounded p-4 cursor-pointer ${selectedPlan === 'basic' ? 'border-red-600' : 'border-gray-700'}`}
              onClick={() => setSelectedPlan('basic')}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">Basic</h3>
                  <p className="text-gray-400">₹149/month</p>
                </div>
                <input 
                  type="radio" 
                  checked={selectedPlan === 'basic'} 
                  onChange={() => setSelectedPlan('basic')} 
                  className="w-5 h-5"
                />
              </div>
            </div>
            
            <div 
              className={`border rounded p-4 cursor-pointer ${selectedPlan === 'standard' ? 'border-red-600' : 'border-gray-700'}`}
              onClick={() => setSelectedPlan('standard')}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">Standard</h3>
                  <p className="text-gray-400">₹199/month</p>
                </div>
                <input 
                  type="radio" 
                  checked={selectedPlan === 'standard'} 
                  onChange={() => setSelectedPlan('standard')} 
                  className="w-5 h-5"
                />
              </div>
            </div>
            
            <div 
              className={`border rounded p-4 cursor-pointer ${selectedPlan === 'premium' ? 'border-red-600' : 'border-gray-700'}`}
              onClick={() => setSelectedPlan('premium')}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">Premium</h3>
                  <p className="text-gray-400">₹649/month</p>
                </div>
                <input 
                  type="radio" 
                  checked={selectedPlan === 'premium'} 
                  onChange={() => setSelectedPlan('premium')} 
                  className="w-5 h-5"
                />
              </div>
            </div>
          </div>
          
          <button
            onClick={handleContinue}
            className="w-full bg-red-600 text-white p-4 rounded font-bold text-xl hover:bg-red-700 mt-8"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}