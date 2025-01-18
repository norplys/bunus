import { useState, useEffect } from "react";

type Audio = {
  audio: string | null;
  playAudio: (url: string) => void;
};

export function useAudio(): Audio {
  const [audio, setAudio] = useState<string | null>(null);

  const playAudio = (url: string) => {
    setAudio(url);
  };

  useEffect(() => {
    if (!audio) return;

    const sound = new Audio(audio);

    sound.play();
  }, [audio]);

  return {
    audio,
    playAudio,
  };
}
