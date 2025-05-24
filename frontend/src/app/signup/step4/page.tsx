"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signup } from "../../api/auth"; // Adjust the path as needed
import Image from "next/image";
import Link from "next/link";

export default function SignUpStep4() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [plan, setPlan] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    // Get stored signup information
    const storedEmail = localStorage.getItem('signup-email');
    const storedPassword = localStorage.getItem('signup-password');
    const storedPlan = localStorage.getItem('signup-plan');
    
    if (!storedEmail || !storedPassword || !storedPlan) {
      router.push('/signup');
    } else {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setPlan(storedPlan);
    }
  }, [router]);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    // Check if all fields are filled
    if (!cardNumber || !cardName || !expiryDate || !cvv || !agreeTerms) {
      setError('Please fill out all required fields and agree to the terms.');
      return;
    }
    
    setLoading(true);
    
    // Proceed with signup attempt, but always redirect to browse regardless of success
    try {
      // Try to sign up (this won't block the redirect)
      await signup(email, password, plan);
      
      // Clean up local storage
      localStorage.removeItem('signup-email');
      localStorage.removeItem('signup-password');
      localStorage.removeItem('signup-plan');

      router.push('/browse/profiles');
    } catch (err) {
      if (err instanceof Error) {
        setError('Signup failed: ' + (err.message || 'Please try again'));
      } else {
        setError('Signup failed: Please try again');
      }
      setLoading(false);
      // We'll still continue to the redirect even if an error occurs
    } 
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
            <p className="text-sm mb-4">STEP 4 OF 4</p>
            <h1 className="text-3xl font-bold mb-4">Set up your payment</h1>
            <p className="text-lg mb-4">
              Your membership starts as soon as you set up payment.
            </p>
            <p className="text-gray-400">
              You selected: <strong className="text-white capitalize">{plan}</strong> Plan
            </p>
          </div>

          {error && (
            <div className="bg-red-600/80 text-white p-4 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-400 mb-1">Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456"
                className="w-full p-3 rounded bg-gray-700 text-white"
              />
            </div>
            
            <div>
              <label className="block text-gray-400 mb-1">Name on Card</label>
              <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="J. Smith"
                className="w-full p-3 rounded bg-gray-700 text-white"
              />
            </div>
            
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-400 mb-1">Expiry Date</label>
                <input
                  type="text"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  placeholder="MM/YY"
                  className="w-full p-3 rounded bg-gray-700 text-white"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-400 mb-1">CVV</label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  className="w-full p-3 rounded bg-gray-700 text-white"
                />
              </div>
            </div>
            
            <div className="text-sm text-gray-400">
              <p>
                By checking the checkbox below, you agree to our Terms of Use, Privacy Statement, and that you are over 18. Netflix will automatically continue your membership and charge the membership fee (currently ₹{plan === 'basic' ? '149' : plan === 'standard' ? '199' : '649'}/month) to your payment method until you cancel. You may cancel at any time to avoid future charges.
              </p>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="agreement"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 mr-2"
              />
              <label htmlFor="agreement" className="text-gray-400">
                I agree
              </label>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white p-4 rounded font-bold text-xl hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Start Membership'}
            </button>
          </form>
        </div>
      </main>
    </div> 
  );
}