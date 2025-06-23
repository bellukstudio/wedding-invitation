'use client';
import { useRef, useState } from "react";
import Landing from "./components/Landing";
import Invitation from "./components/Invitation";

export default function Home() {
  const [showInvitation, setShowInvitation] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleStart = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.warn("Autoplay diblokir oleh browser:", err);
      });
    }
    setShowInvitation(true);
  };

  return (
    <>
      <audio
        ref={audioRef}
        className="hidden"
        src="./pure-love.mp3"
        autoPlay
        loop
      />
      {!showInvitation && <Landing onFinish={handleStart} />}
      {showInvitation && <Invitation />}
    </>
  );
}
