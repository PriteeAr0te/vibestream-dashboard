"use client";

import { LogOut, Moon, Sun, User, Settings, Search } from "lucide-react";
import Link from "next/link";
import { useTheme } from "../provider/ThemeProvider";
import { useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function TopBar() {
  const { theme, toggleTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const { data: session, status, update } = useSession();
  const avatar = session?.user?.avatar ?? (typeof window !== "undefined" ? localStorage.getItem("avatar") : null);

  useEffect(() => {
    if (!session?.user?.avatar) {
      const savedAvatar = typeof window !== "undefined" ? localStorage.getItem("avatar") : null;
      if (savedAvatar) {
        update({ avatar: savedAvatar });
      }
    }
  }, [session?.user?.avatar, update]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const closeDropdown = () => setOpen(false);

  const menuItem = "flex items-center gap-2 px-4 py-2 text-sm hover:bg-primary/80 cursor-pointer transition";

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
            {status === "loading" ? (
              <User size={24} className="animate-pulse opacity-50" />
            ) : avatar ? (
              <Image
                key={avatar}
                width={32}
                height={32}
                src={avatar}
                alt="Profile Image"
                className="w-8 h-8 rounded-full object-cover border border-br"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/default-avatar.png";
                }}
              />
            ) : (
              <User size={24} />
            )}
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-52 bg-light text-foreground border border-br rounded-md shadow-xl py-1 z-50">
              <Link href="/profile" onClick={closeDropdown} className={menuItem}>
                <User size={16} />
                Profile
              </Link>

              <Link href="/settings" onClick={closeDropdown} className={menuItem}>
                <Settings size={16} />
                Settings
              </Link>

              <hr className="border-br-primary my-1" />

              <button
                onClick={() => {
                  closeDropdown();
                  signOut();
                }}
                className={menuItem + " w-full text-left"}
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
