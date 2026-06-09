"use client";

import { MusicProvider } from "@/app/MusicContext";
import MusicPlayer from "./MusicPlayer";

export default function MusicPlayerWrapper() {
  return (
    <MusicProvider>
      <MusicPlayer />
    </MusicProvider>
  );
}
