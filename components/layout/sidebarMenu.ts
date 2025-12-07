import { Home, Search, Library, Music, Heart, TrendingUp, Album } from "lucide-react";

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
    label: "Albums",
    icon: Album,
    path: "/albums",
  },
  {
    label: "Trending",
    icon: TrendingUp,
    path: "/trending",
  },
  {
    label: "Playlists",
    icon: Music,
    path: "/playlists",
  },
  {
    label: "Liked Songs",
    icon: Heart,
    path: "/liked-songs",
  },
];
