import { NextResponse } from "next/server";

export async function GET() {
  try {
    const url =
      "https://rss.itunes.apple.com/api/v1/in/apple-music/top-songs/all/20/explicit.json";

    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch iTunes feed" },
        { status: res.status }
      );
    }

    const json = await res.json();
    return NextResponse.json(json.feed.results);
  } catch (error) {
    return NextResponse.json(
      { error: "Server error fetching data" },
      { status: 500 }
    );
  }
}
