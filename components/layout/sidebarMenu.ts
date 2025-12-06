import { Home, Search, Library, Music, Heart } from "lucide-react";

export const sidebarMenu = [
  {
    label: "Home",
    icon: Home,
    path: "/",
  },
  {
    label: "Search",
    icon: Search,
    path: "/search",
  },
  {
    label: "Library",
    icon: Library,
    path: "/library",
  },
  {
    label: "Playlists",
    icon: Music,
    path: "/playlists",
  },
  {
    label: "Liked Songs",
    icon: Heart,
    path: "/liked",
  },
];
