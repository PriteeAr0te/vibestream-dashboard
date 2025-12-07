import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") || "50";
  const type = searchParams.get("type") || "songs"; 

  const APPLE_URL = `https://rss.applemarketingtools.com/api/v2/in/music/most-played/${limit}/${type}.json`;

  try {
    const res = await fetch(APPLE_URL, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch Apple RSS");

    const json = await res.json();
    const items = json?.feed?.results ?? [];

    const results = items.map((item: any) => ({
      id: item.id,
      title: item.name,
      artist: item.artistName,
      image: item.artworkUrl100?.replace("100x100bb.jpg", "500x500bb.jpg"),
      preview: null, 
    }));

    return NextResponse.json({ results });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
