// app/browse/profiles/manage/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProfiles } from "../../../api/profiles";
import Image from "next/image";
import Link from "next/link";
import { Profile } from "../../../types";

export default function ManageProfilesPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function loadProfiles() {
      try {
        const profileData = await getProfiles();
        setProfiles(profileData);
      } catch (err) {
        console.error(err);
        setError("Failed to load profiles");
        // For development, set mock profiles
        setProfiles([
          {
            id: 'profile-1',
            name: 'User 1',
            avatarUrl: '/avatars/avatar1.png.png',
            isKidsProfile: false
          },
          {
            id: 'profile-2',
            name: 'Kids',
            avatarUrl: '/avatars/avatar3.png.png',
            isKidsProfile: true
          }
        ]);
      } finally {
        setLoading(false);
      }
    }

    loadProfiles();
  }, []);

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
          <h1 className="text-white text-3xl md:text-5xl mb-8">Manage Profiles</h1>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className="text-center cursor-pointer group"
                onClick={() => router.push(`/browse/profiles/edit/${profile.id}`)}
              >
                <div className="w-28 h-28 md:w-40 md:h-40 rounded-md overflow-hidden border-2 border-transparent group-hover:border-white mx-auto relative">
                  <Image
                    src={profile.avatarUrl || "/avatars/default.png"}
                    alt={profile.name}
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
                    <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
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
                onClick={() => router.push("/browse/profiles/create")}
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
              onClick={() => router.push("/browse/profiles")}
              className="px-6 py-2 bg-white text-black font-medium hover:bg-gray-200"
            >
              Done
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}