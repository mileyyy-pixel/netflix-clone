// app/browse/profiles/edit/[id]/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getProfile, updateProfile, deleteProfile } from "../../../../api/profiles";
import Image from "next/image";
import Link from "next/link";
import { Profile } from "../../../../types";

const AVATAR_OPTIONS = [
  "/avatars/avatar1.png.png",
  "/avatars/avatar2.png.png",
  "/avatars/default.png",
  "/avatars/avatar4.png.png",
  "/avatars/avatar5.png.png",
  "/avatars/avatar6.png.png",
  "/avatars/avatar7.png.png",
  "/avatars/avatar8.png.png",
];

export default function EditProfilePage() {
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isKidsProfile, setIsKidsProfile] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const router = useRouter();
  const params = useParams();
  const profileId = params?.id as string;

  useEffect(() => {
    async function loadProfile() {
      if (!profileId) {
        setError("No profile ID provided");
        setLoading(false);
        return;
      }
      
      try {
        const profile = await getProfile(profileId);
        setName(profile.name);
        setAvatarUrl(profile.avatarUrl || AVATAR_OPTIONS[0]);
        setIsKidsProfile(profile.isKidsProfile);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile");
        
        // For development, set mock data
        setName("User 1");
        setAvatarUrl(AVATAR_OPTIONS[0]);
        setIsKidsProfile(false);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [profileId]);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    if (name.trim().length === 0) {
      setError("Please enter a name for this profile");
      setSaving(false);
      return;
    }

    try {
      await updateProfile(profileId, {
        name,
        avatarUrl,
        isKidsProfile,
      });
      router.push("/browse/profiles/manage");
    } catch (err) {
      console.error(err);
      setError("Failed to update profile");
      
      // For development, redirect anyway after a short delay
      setTimeout(() => {
        router.push("/browse/profiles/manage");
      }, 1000);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setSaving(true);
    try {
      await deleteProfile(profileId);
      router.push("/browse/profiles/manage");
    } catch (err) {
      console.error(err);
      setError("Failed to delete profile");
      
      // For development, redirect anyway after a short delay
      setTimeout(() => {
        router.push("/browse/profiles/manage");
      }, 1000);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-2xl text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="p-4 flex items-center">
        <Link href="/browse/profiles/manage" className="text-gray-400 hover:text-white">
          ← Back to Profiles
        </Link>
        <h1 className="text-xl md:text-2xl font-bold mx-auto">Edit Profile</h1>
      </header>

      {/* Main content */}
      <main className="max-w-md mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-800 text-white rounded">
              {error}
            </div>
          )}

          <div className="flex flex-col items-center">
            <div className="mb-4 relative h-24 w-24 rounded-md overflow-hidden">
              {avatarUrl && (
                <Image
                  src={avatarUrl}
                  alt="Profile avatar"
                  fill
                  className="object-cover"
                />
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {AVATAR_OPTIONS.map((avatar) => (
              <button
                type="button"
                key={avatar}
                onClick={() => setAvatarUrl(avatar)}
                className={`relative h-16 w-16 rounded-md overflow-hidden border-2 ${
                  avatarUrl === avatar ? "border-blue-500" : "border-transparent"
                }`}
              >
                <Image
                  src={avatar}
                  alt="Avatar option"
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter profile name"
              maxLength={30}
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="kidsProfile"
              checked={isKidsProfile}
              onChange={(e) => setIsKidsProfile(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded"
            />
            <label htmlFor="kidsProfile" className="ml-2 block text-sm">
              This is a kids profile
            </label>
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md"
              disabled={saving}
            >
              Delete Profile
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </main>

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Delete Profile</h2>
            <p className="mb-6">
              Are you sure you want to delete this profile? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-400 hover:text-white"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md"
                disabled={saving}
              >
                {saving ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}