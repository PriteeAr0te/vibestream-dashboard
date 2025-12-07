"use client";

import AvatarDropdown from "../ui/AvatarDropdown";
import SearchBar from "../ui/SearchBar";
import ThemeToggle from "../ui/ThemeToggle";


export default function TopBar() {
  return (
    <div className="bg-background h-[64px] border-b border-br px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 flex items-center justify-between">
      <SearchBar />
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <AvatarDropdown />
      </div>
    </div>
  );
}
