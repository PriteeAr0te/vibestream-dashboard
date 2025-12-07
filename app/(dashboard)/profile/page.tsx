"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { User, Camera } from "lucide-react";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const toastEnabled = useSelector((s: RootState) => s.uiPreferences.toastEnabled);

  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("avatar");
    if (saved) setPreview(saved);
  }, []);

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64 = await toBase64(file);
    setPreview(base64);
  };

  const saveAvatar = async () => {
    if (!preview) {
      if (toastEnabled) toast.error("Please select an image.");
      return;
    }

    try {
      setLoading(true);
      localStorage.setItem("avatar", preview);
      window.dispatchEvent(new CustomEvent("avatar-updated", { detail: preview }));

      if (typeof update === "function") {
        await update({ avatar: preview });
      }

      if (toastEnabled) toast.success("Profile updated!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground p-3 lg:p-6 sm:p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8">Profile</h1>

        <div className="flex flex-col sm:flex-row gap-10 sm:items-center">
          <div className="relative group w-40 h-40 rounded-full bg-light flex items-center justify-center overflow-hidden border border-br shadow-lg">
            {preview ? (
              <Image src={preview} width={160} height={160} alt="Avatar" className="object-cover w-full h-full" />
            ) : (
              <User size={64} className="text-icon" />
            )}

            <label
              htmlFor="avatar-input"
              className="absolute bottom-6 right-3 p-2 rounded-full bg-primary text-white shadow cursor-pointer opacity-0 group-hover:opacity-100 transition"
            >
              <Camera size={16} />
            </label>

            <input id="avatar-input" type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <p className="text-sm text-para">Name</p>
              <p className="text-lg font-medium">{session?.user?.name || "User"}</p>
            </div>

            <div>
              <p className="text-sm text-para">Email</p>
              <p className="text-lg font-medium">{session?.user?.email}</p>
            </div>

            <button
              onClick={saveAvatar}
              disabled={loading}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition disabled:opacity-50"
            >
              {loading ? "Saving…" : "Save Profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
