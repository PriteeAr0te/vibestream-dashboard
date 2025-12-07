"use client";

import { useState, useEffect, useRef } from "react";
import { User, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

interface Props {
  className?: string;
}

export default function AvatarDropdown({ className }: Props) {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState("/img/favicon.png");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = typeof window !== "undefined" && localStorage.getItem("avatar");
    if (stored) setAvatarSrc(stored);
    else if (session?.user?.avatar) setAvatarSrc(session.user.avatar);
  }, [session]);

  useEffect(() => {
    const handler = (e: any) => setAvatarSrc(e.detail);
    window.addEventListener("avatar-updated", handler);
    return () => window.removeEventListener("avatar-updated", handler);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const menuItem = "flex items-center gap-2 px-4 py-2 text-sm hover:bg-primary/80 cursor-pointer transition";

  return (
    <div className={className} ref={dropdownRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(prev => !prev);
        }}
        className="p-2 rounded-lg hover:bg-light transition flex items-center justify-center"
      >
        {status === "loading" || !avatarSrc ? (
          <User size={24} className="opacity-50" />
        ) : (
          <Image
            src={avatarSrc}
            width={32}
            height={32}
            alt="User avatar"
            className="w-8 h-8 rounded-full object-cover border border-br"
          />
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-light border border-br text-foreground rounded-md shadow-xl py-1 z-50">
          {status === "authenticated" ? (
            <>
              <Link href="/profile" onClick={() => setOpen(false)} className={menuItem}>
                <User size={16} /> Profile
              </Link>
              <Link href="/settings" onClick={() => setOpen(false)} className={menuItem}>
                <Settings size={16} /> Settings
              </Link>
              <hr className="border-br-primary my-1" />
              <button
                onClick={() => {
                  setOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
                className={menuItem + " w-full text-left"}
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <Link href="/login" onClick={() => setOpen(false)} className={menuItem}>
              <User size={16} /> Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
