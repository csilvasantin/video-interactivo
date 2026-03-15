import { useRef, useEffect, useState, useCallback } from 'react';
import { AenaSplash } from './AenaSplash';

interface IntroVideoProps {
  onFinished: () => void;
}

export function IntroVideo({ onFinished }: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5;
      audio.play().catch(() => {});
    }
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  const handleSplashFinished = useCallback(() => {
    setShowSplash(false);
    // Start video immediately after splash
    setTimeout(() => {
      videoRef.current?.play().catch(() => {});
    }, 100);
  }, []);

  const handleSkip = () => {
    audioRef.current?.pause();
    onFinished();
  };

  const handleEnded = () => {
    audioRef.current?.pause();
    onFinished();
  };

  return (
    <div className="intro-video">
      <audio ref={audioRef} src="/videos/intro-music.mp3" loop />
      {showSplash ? (
        <div style={{ aspectRatio: '16/9', background: '#000', width: '100%' }}>
          <AenaSplash onFinished={handleSplashFinished} />
        </div>
      ) : (
        <video
          ref={videoRef}
          src="/videos/intro.mp4"
          playsInline
          onEnded={handleEnded}
          onClick={() => {
            const v = videoRef.current;
            const a = audioRef.current;
            if (v) {
              if (v.paused) {
                v.play();
                a?.play();
              } else {
                v.pause();
                a?.pause();
              }
            }
          }}
        />
      )}
      <button className="skip-btn" onClick={handleSkip}>
        Saltar intro →
      </button>
    </div>
  );
}
