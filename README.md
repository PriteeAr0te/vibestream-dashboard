# 🎧 VibeStream — Music Streaming Dashboard 
### 🔗 Live Demo  
https://vibestream-dashboard.vercel.app/

A modern and fully-featured music streaming dashboard built with **Next.js 14 (App Router), TypeScript, TanStack Query, Redux Toolkit, Tailwind CSS, shadcn/ui, and NextAuth.js**.

Users can explore trending music, play preview clips, manage playlists, like tracks, and enjoy persistent playback — all wrapped in a visually engaging UI with light/dark mode support.

---

## 🚀 Features

### 🏠 Home Screen
- Fetches Trending **Songs, Albums, Playlists** via API
- Responsive adaptive card layout
- Lazy loading + Skeleton placeholders
- “See all” & dynamic sections
- Light/Dark theme toggle

### ▶️ Persistent Music Player
- Appears across all screens
- Play / Pause / Next / Previous
- Progress seekbar + Volume slider
- Shows track art, title & artist
- Global state sync with localStorage

### 🎵 Playlist Management
- Create new playlists
- Add & Remove songs from playlists
- Dedicated playlist pages
- Protected routes when logged in

### ❤️ Liked Songs
- Add/remove liked songs
- Persistent favorite collection

### 🔐 Authentication (Credentials Provider)
Mock login supported:

| Email | Password |
|-------|----------|
| `user@vibe.com` | `password` |

- Session persistence using JWT
- Profile & Playlist routes protected
- Avatar dropdown menu

### 🔍 Smart Search
- Debounced multi-source search
- Searches across **songs + playlists**
- Click to play song instantly or open playlist
- Auto-updating real-time results

### 📱 Fully Responsive UI
- Desktop → Sidebar + large grid
- Mobile → Bottom nav + compact player
- Adaptive images, spacing & stacking

---

## 🛠️ Tech Stack

| Category | Tools |
|---------|------|
| Framework | Next.js 14 – App Router |
| Language | TypeScript |
| State Management | Redux Toolkit |
| API Caching | TanStack Query |
| UI | shadcn/ui + Tailwind CSS |
| Auth | NextAuth.js (Credentials) |
| Deployment Ready | SEO Metadata + Optimized Images |

---

## 🧩 State Management Structure

| Feature | Managed By |
|--------|------------|
| Music Player | Redux Slice: `playerSlice` |
| Playlists CRUD | Redux Slice: `playlistSlice` |
| Liked Songs | Redux Slice: `likedSongsSlice` |
| API Fetching | TanStack Query |

State persisting using `localStorage` ensures music keeps playing even after refresh 🎶

---

## 🌍 API Integration

### 🔹 Trending Songs/Albums
Fetching via custom Next.js route:

/api/trending?type=songs&limit=50

Data mapped to internal **SongItem** schema:
- id
- title
- artist
- image (high res)
- preview audio fallback configured

---

## 📦 Installation & Setup

Clone repository:

```bash
git clone https://github.com/your-username/vibestream.git
cd vibestream
```

Install packages:
```bash
npm install
```

Setup environment:

Create .env.local file:

```bash
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
```

Run development server:

```bash
npm run dev
```


App will start at:

http://localhost:3000


🔐 Login Details (Required for Playlist & Profile)

| Email           | Password   |
| --------------- | ---------- |
| `user@vibe.com` | `password` |


✨ Future Enhancements

Playlist sharing

Equalizer animation on now playing

User-uploaded playlist thumbnails

Continuous scroll on Explore Pages

Real streaming support with paid API


🧑‍💻 Author

Built by Pritee
React & MERN Stack Developer
LinkedIn / Portfolio (add links)


⭐ Feedback

If you like this project, please ⭐ the repo!
Contributions and suggestions are always welcome.