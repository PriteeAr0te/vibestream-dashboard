"use client";

import { useState, useEffect } from "react";
import { User, Camera } from "lucide-react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
    const { data: session, update } = useSession();

    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (session?.user?.avatar) {
            setPreview(session.user.avatar);
        } else {
            const savedAvatar = localStorage.getItem("avatar");
            if (savedAvatar) {
                setPreview(savedAvatar);
                update({ avatar: savedAvatar });
            }
        }
    }, [session, update]);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        setPreview(url);
    };

    const saveAvatar = async () => {
        if (!preview) {
            toast.error("Please select an image.");
            return;
        }

        try {
            setLoading(true);

            localStorage.setItem("avatar", preview);
            await update({ avatar: preview });

            toast.success("Profile image updated!");
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-background text-foreground p-6 sm:p-10">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-semibold mb-8">Profile</h1>

                <div className="flex flex-col sm:flex-row gap-10 sm:items-center">
                  
                    <div className="relative group w-40 h-40 rounded-full bg-light flex items-center justify-center overflow-hidden border border-br shadow-lg">
                        {preview ? (
                            <Image
                                src={preview}
                                alt="Profile Avatar"
                                width={160}
                                height={160}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <User size={64} className="text-icon" />
                        )}

                        <label
                            htmlFor="avatar-input"
                            className="absolute bottom-6 right-3.5 p-2 rounded-full bg-primary text-white shadow-md cursor-pointer opacity-0 group-hover:opacity-100 transition"
                        >
                            <Camera size={16} />
                        </label>

                        <input
                            id="avatar-input"
                            type="file"
                            accept="image/png, image/jpeg"
                            className="hidden"
                            onChange={handleImageSelect}
                        />
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
                            className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/80 transition disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Save Profile"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
