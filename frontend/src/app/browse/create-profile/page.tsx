"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProfile } from "../../api/profiles";
import Image from "next/image";
import Link from "next/link";

const AVATAR_OPTIONS = [
  "/avatars/avatar1.png.png",
  "/avatars/avatar2.png.png",
  "/avatars/avatar4.png.png",
  "/avatars/avatar5.png.png",
  "/avatars/default.png",
  "/avatars/avatar6.png.png",
  "/avatars/avatar7.png.png",
  "/avatars/avatar8.png.png",
];

export default function CreateProfilePage() {
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(AVATAR_OPTIONS[0]);
  const [isKidsProfile, setIsKidsProfile] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (name.trim().length === 0) {
      setError("Please enter a name for this profile");
      setLoading(false);
      return;
    }

    try {
      const newProfile = await createProfile({
        name,
        avatarUrl,
        isKidsProfile,
      });
      
      // Store new profile data in localStorage to ensure it's available immediately
      const existingProfiles = JSON.parse(localStorage.getItem("profiles") || "[]");
      existingProfiles.push(newProfile);
      localStorage.setItem("profiles", JSON.stringify(existingProfiles));
      
      router.push("/browse/profiles");
    } catch (err) {
      console.error("Profile creation error:", err);
      setError("Failed to create profile. Please try again.");
      setLoading(false);
      // Don't redirect on failure
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="p-6 border-b border-gray-800">
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
      <main className="max-w-screen-xl mx-auto py-12 px-4">
        <h1 className="text-3xl md:text-5xl mb-8">Add Profile</h1>
        <p className="text-gray-400 mb-6">
          Add a profile for another person watching Netflix.
        </p>

        {error && (
          <div className="bg-red-600/80 text-white p-4 rounded mb-6">
            {error}
          </div>
        )}

        <div className="border-t border-b border-gray-800 py-8 my-6">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0">
                <div className="w-40 h-40 rounded overflow-hidden relative">
                  <Image
                    src={avatarUrl}
                    alt="Profile Avatar"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex-grow">
                <div className="mb-6">
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="w-full p-2 bg-gray-700 border-b-2 border-gray-400 focus:border-white outline-none"
                  />
                </div>

                <div className="mb-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isKidsProfile}
                      onChange={(e) => setIsKidsProfile(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span>Kids Profile</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl mb-4">Choose an avatar</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {AVATAR_OPTIONS.map((avatar, index) => (
                  <div
                    key={index}
                    onClick={() => setAvatarUrl(avatar)}
                    className={`w-20 h-20 rounded overflow-hidden cursor-pointer ${
                      avatarUrl === avatar
                        ? "border-2 border-white"
                        : "border border-transparent"
                    }`}
                  >
                    <Image
                      src={avatar}
                      alt={`Avatar option ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-white text-black font-medium hover:bg-gray-200 disabled:bg-gray-500"
              >
                {loading ? "Creating..." : "Save"}
              </button>
              <button
                type="button"
                onClick={() => router.push("/browse/profiles")}
                className="px-6 py-2 border border-gray-400 text-gray-400 hover:text-white hover:border-white"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}