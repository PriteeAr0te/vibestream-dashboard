"use client";

import { useState, useEffect, useRef } from "react";
import { LogOut, Moon, Sun, User, Settings, Search } from "lucide-react";
import Link from "next/link";
import { useTheme } from "../provider/ThemeProvider";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function TopBar() {
  const { theme, toggleTheme } = useTheme();
  const { data: session, status } = useSession();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("avatar");

    if (stored) {
      setAvatarSrc(stored);
      return;
    }

    if (session?.user?.avatar) {
      setAvatarSrc(session.user.avatar);
      return;
    }

    setAvatarSrc("/img/favicon.png");
  }, [session]);

  useEffect(() => {
    const handler = (e: any) => setAvatarSrc(e.detail);
    window.addEventListener("avatar-updated", handler);
    return () => window.removeEventListener("avatar-updated", handler);
  }, []);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const menuItem =
    "flex items-center gap-2 px-4 py-2 text-sm hover:bg-primary/80 cursor-pointer transition";

  return (
    <div className="bg-background h-[64px] border-b border-br px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 flex items-center justify-between">

      <div className="py-2.5 px-3 min-w-[250px] bg-light rounded-xl flex gap-2 items-center">
        <Search size={20} className="text-icon" />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-transparent outline-none text-foreground placeholder:text-para"
        />
      </div>

      <div className="flex items-center gap-3">

        <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-light transition">
          {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen((prev) => !prev);
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
      </div>
    </div>
  );
}
