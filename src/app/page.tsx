'use client';

import { useRef, useState,Suspense } from "react";
import Invitation from "./components/Invitation";
import LandingWrapper from "./components/LandingWrapper";

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
      {!showInvitation && (
        <Suspense fallback={<div>Loading...</div>}>
          <LandingWrapper onFinish={handleStart} />
        </Suspense>
      )}
      {showInvitation && <Invitation />}
    </>
  );
}
