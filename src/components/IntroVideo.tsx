import { useRef, useState, useCallback } from 'react';
import { AenaSplash } from './AenaSplash';

type Phase = 'waiting' | 'splash' | 'video';

interface IntroVideoProps {
  onFinished: () => void;
  onStartMusic: () => void;
  onToggleMute: () => void;
  muted: boolean;
}

export function IntroVideo({ onFinished, onStartMusic, onToggleMute, muted }: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<Phase>('waiting');

  const handleStart = () => {
    onStartMusic();
    setPhase('splash');
  };

  const handleSplashFinished = useCallback(() => {
    setPhase('video');
    setTimeout(() => {
      videoRef.current?.play().catch(() => {});
    }, 100);
  }, []);

  const handleSkip = () => {
    onFinished();
  };

  const handleEnded = () => {
    onFinished();
  };

  return (
    <div className="intro-video">
      {phase === 'waiting' && (
        <div
          style={{
            aspectRatio: '16/9',
            background: '#000',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            gap: '1rem',
          }}
          onClick={handleStart}
        >
          <div style={{
            fontSize: '3rem',
            color: '#ff8906',
            textShadow: '3px 3px 0 #5a2d00',
          }}>
            ▶
          </div>
          <p style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '0.6rem',
            color: '#a7a9be',
            textTransform: 'uppercase',
          }}>
            Click para empezar
          </p>
          {/* AENA logo + aeropuertos para ti */}
          <div style={{
            position: 'absolute',
            top: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
          }}>
            {/* Pixel art AENA green arrow/triangle logo */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(11, 3px)',
              gridTemplateRows: 'repeat(11, 3px)',
              gap: '0px',
            }}>
              {[
                0,0,0,0,0,1,0,0,0,0,0,
                0,0,0,0,1,1,0,0,0,0,0,
                0,0,0,1,1,1,0,0,0,0,0,
                0,0,1,1,1,1,0,0,0,0,0,
                0,1,1,1,1,1,1,0,0,0,0,
                1,1,1,1,1,1,1,1,1,1,1,
                0,1,1,1,1,1,1,0,0,0,0,
                0,0,1,1,1,1,0,0,0,0,0,
                0,0,0,1,1,1,0,0,0,0,0,
                0,0,0,0,1,1,0,0,0,0,0,
                0,0,0,0,0,1,0,0,0,0,0,
              ].map((v, i) => (
                <div key={i} style={{
                  width: 3,
                  height: 3,
                  background: v ? '#a4c520' : 'transparent',
                }} />
              ))}
            </div>
            <span style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '0.7rem',
              color: '#ffffff',
              fontWeight: 'bold',
              letterSpacing: '2px',
            }}>
              aena
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1px' }}>
              <span style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '0.3rem',
                color: '#a4c520',
                letterSpacing: '1px',
              }}>
                aeropuertos
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '0.3rem',
                  color: '#a4c520',
                  letterSpacing: '1px',
                }}>
                  para ti
                </span>
                <span style={{ fontSize: '0.4rem', color: '#a4c520' }}>✈</span>
              </div>
            </div>
          </div>
          <div style={{
            position: 'absolute',
            bottom: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <span style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '0.4rem',
              color: '#666',
              textTransform: 'uppercase',
            }}>
              powered by
            </span>
            {/* Pixel art green cloud (Admira logo) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(9, 3px)',
              gridTemplateRows: 'repeat(6, 3px)',
              gap: '0px',
            }}>
              {[
                0,0,0,1,1,1,0,0,0,
                0,0,1,1,1,1,1,0,0,
                0,1,1,1,1,1,1,1,0,
                1,1,1,1,1,1,1,1,1,
                0,1,1,1,1,1,1,1,0,
                0,0,1,1,1,1,1,0,0,
              ].map((v, i) => (
                <div key={i} style={{
                  width: 3,
                  height: 3,
                  background: v ? '#2cb67d' : 'transparent',
                  boxShadow: v ? '0 0 2px #2cb67d55' : 'none',
                }} />
              ))}
            </div>
            <span style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '0.45rem',
              color: '#2cb67d',
              textShadow: '1px 1px 0 #0d3d26',
              textTransform: 'uppercase',
            }}>
              Admira
            </span>
          </div>
        </div>
      )}
      {phase === 'splash' && (
        <div style={{ aspectRatio: '16/9', background: '#000', width: '100%' }}>
          <AenaSplash onFinished={handleSplashFinished} />
        </div>
      )}
      {phase === 'video' && (
        <video
          ref={videoRef}
          src={`${import.meta.env.BASE_URL}videos/intro.mp4`}
          playsInline
          onEnded={handleEnded}
          style={{ aspectRatio: '16/9', width: '100%', objectFit: 'cover' }}
          onClick={() => {
            const v = videoRef.current;
            if (v) {
              if (v.paused) {
                v.play();
              } else {
                v.pause();
              }
            }
          }}
        />
      )}
      {phase !== 'waiting' && (
        <button className="mute-btn intro-mute" onClick={onToggleMute}>
          {muted ? '🔇' : '🔊'}
        </button>
      )}
      <button className="skip-btn" onClick={handleSkip}>
        Saltar intro →
      </button>
    </div>
  );
}
