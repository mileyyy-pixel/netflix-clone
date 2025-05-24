"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProfiles } from "../../api/profiles";
import Image from "next/image";
import Link from "next/link";
import { Profile } from "../../types";

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function loadProfiles() {
      try {
        // First check localStorage for cached profiles
        const cachedProfiles = localStorage.getItem("profiles");
        
        if (cachedProfiles) {
          setProfiles(JSON.parse(cachedProfiles));
        }
        
        // Then try to get from API
        const profileData = await getProfiles();
        
        // Update profiles with API data
        setProfiles(profileData);
        
        // Update localStorage cache
        localStorage.setItem("profiles", JSON.stringify(profileData));
      } catch (err) {
        console.error("Error loading profiles:", err);
        
        // Only show error if we don't have cached profiles to fall back to
        if (!localStorage.getItem("profiles")) {
          setError("Failed to load profiles");
          
          // If you have no fallback, don't use hardcoded profiles
          // This way it's clear something is wrong with your API
          // Or use a more realistic fallback if needed for testing
        }
      } finally {
        setLoading(false);
      }
    }

    loadProfiles();
  }, []);

  const handleProfileSelect = (profile: Profile) => { 
    // Store active profile in localStorage
    localStorage.setItem("active-profile", JSON.stringify(profile));
    
    // Redirect to browse page
    router.push("/browse");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
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

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center py-10">
        <div className="text-center">
          <h1 className="text-white text-3xl md:text-5xl mb-8">Who's watching?</h1>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className="text-center cursor-pointer group"
                onClick={() => handleProfileSelect(profile)}
              >
                <div className="w-28 h-28 md:w-40 md:h-40 rounded-md overflow-hidden border-2 border-transparent group-hover:border-white mx-auto">
                  <Image
                    src={profile.avatarUrl || "/avatars/default.png"}
                    alt={profile.name}
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to default avatar if image fails to load
                      e.currentTarget.src = "/avatars/default.png";
                    }}
                  />
                </div>
                <p className="text-gray-400 group-hover:text-white mt-2 text-xl">
                  {profile.name}
                </p>
                {profile.isKidsProfile && (
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded mt-1 inline-block">
                    Kids
                  </span>
                )}
              </div>
            ))}

            {profiles.length < 5 && (
              <div
                className="text-center cursor-pointer group"
                onClick={() => router.push("/browse/create-profile")}
              >
                <div className="w-28 h-28 md:w-40 md:h-40 rounded-md overflow-hidden border-2 border-transparent group-hover:border-white mx-auto flex items-center justify-center bg-gray-800">
                  <span className="text-gray-400 text-6xl group-hover:text-white">+</span>
                </div>
                <p className="text-gray-400 group-hover:text-white mt-2 text-xl">
                  Add Profile
                </p>
              </div>
              
            )}
          </div>

          <div className="mt-12">
            <button
              onClick={() => router.push("/browse/profiles/manage")}
              className="px-6 py-2 border border-gray-400 text-gray-400 hover:text-white hover:border-white"
            >
              Manage Profiles
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}