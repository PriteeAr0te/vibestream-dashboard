"use client";

import { Song } from "@/hooks/useTrendingSongs";
import Image from "next/image";

export function SongCard({ item }: { item: Song }) {
  return (
    <div className="p-3 rounded-md bg-accent hover:bg-br transition shadow-sm hover:shadow-md">
      <Image
        src={item.image}
        alt={item.title}
        width={300}
        height={300}
        className="rounded-md w-full h-auto object-cover"
      />

      <p className="mt-2 font-semibold text-foreground truncate">
        {item.title}
      </p>

      <p className="text-sm text-para truncate">{item.artist}</p>
    </div>
  );
}
