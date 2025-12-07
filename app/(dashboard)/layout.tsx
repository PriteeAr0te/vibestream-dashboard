import Sidebar from "@/components/layout/Sidebar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import TopBar from "@/components/layout/TopBar";
import MusicPlayer from "@/components/ui/MusicPlayer";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // const session = await getServerSession(authOptions);

  // if (!session) redirect("/login");

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
