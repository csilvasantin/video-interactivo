import { useRef, useEffect } from 'react';
import { animateScene } from '../data/createDemoVideo';

interface VideoPlayerProps {
  nodeId: string;
  title: string;
  onTimeUpdate: (currentTime: number) => void;
  onEnded: () => void;
  paused: boolean;
}

export function VideoPlayer({ nodeId, title, onTimeUpdate, onEnded, paused }: VideoPlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const callbacksRef = useRef({ onTimeUpdate, onEnded });
  callbacksRef.current = { onTimeUpdate, onEnded };

  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 960;
    canvas.height = 540;

    cleanupRef.current?.();

    const stop = animateScene(
      canvas,
      nodeId,
      title,
      5,
      (time) => {
        if (!pausedRef.current) {
          callbacksRef.current.onTimeUpdate(time);
        }
      },
      () => {
        if (!pausedRef.current) {
          callbacksRef.current.onEnded();
        }
      }
    );

    cleanupRef.current = stop;

    return () => {
      stop();
    };
  }, [nodeId, title]);

  return (
    <div className="video-container">
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
