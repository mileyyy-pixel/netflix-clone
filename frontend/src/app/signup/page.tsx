"use client";
import { useState } from "react";
import TrendingNow from "../components/TrendingNow";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Plus, X } from "lucide-react";

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const router = useRouter();

  const handleGetStarted = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (email) {
      localStorage.setItem('signup-email', email);
      router.push('/signup/step1');
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is Netflix?",
      answer: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices. You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price."
    },
    {
      question: "How much does Netflix cost?",
      answer: "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹149 to ₹649 a month. No extra costs, no contracts."
    },
    {
      question: "Where can I watch?",
      answer: "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles."
    },
    {
      question: "How do I cancel?",
      answer: "Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime."
    },
    {
      question: "What can I watch on Netflix?",
      answer: "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want."
    }
  ];
  
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header with Netflix logo and sign-in button */}
      <header className="flex justify-between items-center px-14 py-6 fixed w-full z-30 bg-gradient-to-b from-black via-black/80 to-transparent">
        <img
          src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
          className="h-8 md:h-12 ml-10"
          alt="Netflix logo"
        />
        <div className="flex items-center gap-4 mr-12">
          <select
            className="bg-black/70 px-3 py-1 text-white rounded border border-white"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
          </select>

          <Link href="/login">
            <button className="bg-red-600 px-4 py-1 text-white rounded hover:bg-red-700">
              Sign in
            </button>
          </Link>
        </div>
      </header>
   
      {/* Hero section */}
      <section className="relative min-h-screen flex justify-center items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/NetflixImage.jpg"
            alt="Netflix Background"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.4)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/20"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-20 flex flex-col justify-center items-center text-center px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-black mb-5 flex flex-col gap-2">
            <span>Unlimited movies,</span>
            <span>TV shows and more</span>
          </h1>
          
          <p className="text-lg md:text-xl mb-7 font-semibold">
            Watch anywhere. Cancel anytime.
          </p>
          <p className="text-base md:text-base mb-3">
            Ready to watch? Enter your email to create or restart your membership.
          </p>
          
          <form onSubmit={handleGetStarted} className="w-full flex flex-col md:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Email address"
              className="px-2 py-3 md:w-96 rounded bg-black/60 border border-white/30"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button 
              className="bg-red-600 text-white px-8 py-3 rounded text-xl hover:bg-red-700"
              type="submit"
            >
              Get Started
            </button>
          </form>
        </div>
      </section>

      {/* Trending Now section */}
      <div className="relative z-[999] bg-black">
        <section className="pt-8 pb-12 px-8">
          <TrendingNow />
        </section>
      </div>
      
      {/* Features section - Netflix style */}
      <section className="bg-black text-white border-t-8 border-[#222]">
        <div className="max-w-6xl mx-auto py-12 px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-bold mb-5">Enjoy on your TV</h2>
              <p className="text-lg md:text-xl">
                Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.
              </p>
            </div>
            <div className="relative">
              <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png" alt="TV" className="relative z-10" />
              <div className="absolute top-[20%] left-[13%] right-[13%] bottom-[20%] z-0">
                <video className="w-full h-full object-cover" autoPlay playsInline muted loop>
                  <source src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black text-white border-t-8 border-[#222]">
        <div className="max-w-6xl mx-auto py-12 px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1 relative">
              <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg" alt="Mobile" className="relative z-10" />
              <div className="absolute left-1/2 bottom-[8%] transform -translate-x-1/2 flex items-center bg-black border-2 border-[#333] rounded-xl p-2 w-[60%] z-20">
                <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/boxshot.png" alt="Boxshot" className="h-16 mr-4" />
                <div className="flex-1">
                  <div className="text-white font-medium">Stranger Things</div>
                  <div className="text-blue-500 text-sm">Downloading...</div>
                </div>
                <div className="w-12 h-12 flex-shrink-0">
                  <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/download-icon.gif" alt="Download" className="w-full" />
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-bold mb-5">Download your shows to watch offline</h2>
              <p className="text-lg md:text-xl">
                Save your favorites easily and always have something to watch.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black text-white border-t-8 border-[#222]">
        <div className="max-w-6xl mx-auto py-12 px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-bold mb-5">Watch everywhere</h2>
              <p className="text-lg md:text-xl">
                Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.
              </p>
            </div>
            <div className="relative">
              <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile.png" alt="Devices" className="relative z-10" />
              <div className="absolute top-[10%] left-[19%] right-[19%] bottom-[40%] z-0">
                <video className="w-full h-full object-cover" autoPlay playsInline muted loop>
                  <source src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices.m4v" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black text-white border-t-8 border-[#222]">
        <div className="max-w-6xl mx-auto py-12 px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <img 
                src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/cards/kidsValueProp.png" 
                alt="Kids" 
                className="w-full" 
              />
            </div>
            <div className="order-1 md:order-2 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-bold mb-5">Create profiles for kids</h2>
              <p className="text-lg md:text-xl">
                Send kids on adventures with their favorite characters in a space made just for them—free with your membership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ section - Netflix style */}
      <section className="bg-black text-white border-t-8 border-[#222] py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="mb-12">
            {faqData.map((faq, index) => (
              <div key={index} className="mb-2">
                <button 
                  className="w-full bg-[#2D2D2D] hover:bg-[#444] transition-colors p-6 text-left flex justify-between items-center"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-xl md:text-2xl">{faq.question}</span>
                  {openFaqIndex === index ? 
                    <X size={30} /> : 
                    <Plus size={30} />
                  }
                </button>
                {openFaqIndex === index && (
                  <div className="bg-[#2D2D2D] mt-px p-6 text-xl">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-lg mb-5">
              Ready to watch? Enter your email to create or restart your membership.
            </p>
            <form onSubmit={handleGetStarted} className="flex flex-col md:flex-row gap-4 justify-center max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Email address"
                className="px-4 py-4 flex-1 rounded bg-black/60 border border-white/30"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button 
                className="bg-red-600 text-white px-8 py-4 rounded text-xl hover:bg-red-700 flex items-center justify-center"
                type="submit"
              >
                Get Started <ChevronRight className="ml-2" />
              </button>
            </form>
          </div>
        </div>
      </section>
      
      {/* Simple Footer */}
      <footer className="bg-black py-8 text-gray-400">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-gray-400 mb-4">
            Questions? Call 
            <a href="tel:0008009191743" className="text-gray-400 underline hover:text-gray-200 ml-1">
              000-800-919-1743
            </a>
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm">
            <a href="#" className="hover:underline">FAQ</a>
            <a href="#" className="hover:underline">Help Centre</a>
            <a href="#" className="hover:underline">Terms of Use</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Cookie Preferences</a>
            <a href="#" className="hover:underline">Corporate Information</a>
          </div>
          
          <p className="text-gray-400 mt-8">
            Netflix India
          </p>
        </div>
      </footer>
    </main>
  );
}