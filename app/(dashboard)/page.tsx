'use client'

import Image from "next/image";
import { useTrendingSongs } from "../../hooks/useTrendingSongs";

export default function DashboardHome() {

  const { data, isLoading, isError, error } = useTrendingSongs();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  console.log("Trending songs", data);


  return (
    <div className="w-full h-full p-4 bg-background flex-1 overflow-y-auto scrollable-container">
      <h1 className="text-2xl font-semibold">
        Welcome back!
      </h1>

      <section className="mt-6">
        <h2 className="text-xl font-bold mb-2">Trending Songs</h2>
        {data?.map(song => (
          <div key={song.id}>
            <Image
              src={song.artworkUrl100}
              alt={song.name}
              width={100}
              height={100}
            />
            <p>{song.name} - {song.artistName}</p>
          </div>
        ))}
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-bold mb-2">Top Albums</h2>
      </section>
    </div>
  );
}
