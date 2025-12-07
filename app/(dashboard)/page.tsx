"use client";

import Image from "next/image";
import { useTrendingSongs } from "@/hooks/useTrendingSongs";
import Spinner from "@/components/common/Spinner";
import { useDispatch } from "react-redux";
import { setQueue, setTrack } from "@/store/slices/playerSlice";

export default function HomePage() {
  const { data: forYouData, isLoading: isLoadingForYou } = useTrendingSongs("playlists", 10);
  const { data: trendingData, isLoading: isLoadingTrending } = useTrendingSongs("songs", 8);
  const { data: albumsData, isLoading: isLoadingAlbums } = useTrendingSongs("albums", 8);

  const dispatch = useDispatch();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  if (isLoadingForYou || isLoadingTrending || isLoadingAlbums)
    return <div className="p-4"><Spinner /></div>;

  return (
    <div className="w-full p-6 text-foreground mb-24">
      <h1 className="text-3xl font-bold mb-6">{getGreeting()}</h1>

      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-bold">For You</h2>

        <a href="/playlists" className="text-primary text-sm hover:underline">
          See All
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {forYouData?.slice(0, 4).map((item) => (
          <div
            key={item.id}
            onClick={() => {
              dispatch(setQueue(forYouData));
              dispatch(setTrack(item));
            }}
            className="bg-accent rounded-xl p-3 hover:bg-br transition shadow-sm cursor-pointer"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={300}
              height={300}
              className="rounded-md object-cover w-full h-[180px]"
            />

            <p className="mt-2 font-semibold truncate">{item.title}</p>
            <p className="text-sm text-para truncate">{item.artist}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-3 mt-10">
        <h2 className="text-2xl font-bold">Trending Songs</h2>

        <a href="/trending" className="text-primary text-sm hover:underline">
          See All
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {trendingData?.slice(0, 4).map((item) => (
          <div
            key={item.id}
            onClick={() => {
              dispatch(setQueue(trendingData));
              dispatch(setTrack(item));
            }}
            className="bg-accent rounded-xl p-3 hover:bg-br transition shadow-sm cursor-pointer"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={300}
              height={300}
              className="rounded-md object-cover w-full h-[180px]"
            />

            <p className="mt-2 font-semibold truncate">{item.title}</p>
            <p className="text-sm text-para truncate">{item.artist}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-3 mt-10">
        <h2 className="text-2xl font-bold">Top Albums</h2>

        <a href="/albums" className="text-primary text-sm hover:underline">
          See All
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {albumsData?.slice(0, 4).map((item) => (
          <div
            key={item.id}
            onClick={() => {
              dispatch(setQueue(albumsData));
              dispatch(setTrack(item));
            }}
            className="bg-accent rounded-xl p-3 hover:bg-br transition shadow-sm cursor-pointer"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={300}
              height={300}
              className="rounded-md object-cover w-full h-[180px]"
            />

            <p className="mt-2 font-semibold truncate">{item.title}</p>
            <p className="text-sm text-para truncate">{item.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
