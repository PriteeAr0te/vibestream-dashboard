'use client'

import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import MusicPlayer from "@/components/ui/MusicPlayer";
import { useLoadPlaylists } from "@/hooks/useLoadPlaylist";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
useLoadPlaylists();

  return (
    <div className="flex h-full items-start">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full">
        <TopBar />
        <main className="h-full overflow-y-auto flex-1 scrollable-container">{children}</main>
        <MusicPlayer />
      </div>
    </div>
  );
}
