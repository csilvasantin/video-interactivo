import { useRef, useEffect } from 'react';

interface AirportGlobeProps {
  title: string;
}

// Simplified continent shapes for pixel globe (longitude, latitude pairs)
// longitude: -180 to 180, latitude: -90 to 90
const CONTINENTS = [
  // Europe
  [
    [-10, 36], [0, 36], [5, 38], [3, 43], [-5, 43], [-9, 40],
    [0, 44], [5, 46], [10, 45], [15, 42], [20, 40], [25, 38],
    [28, 42], [30, 45], [25, 48], [20, 50], [15, 52], [10, 54],
    [5, 52], [0, 50], [-5, 48], [-8, 44],
  ],
  // Africa
  [
    [-15, 30], [-5, 32], [5, 30], [10, 32], [15, 30], [20, 28],
    [30, 25], [35, 20], [40, 12], [42, 5], [40, -2], [35, -10],
    [30, -20], [25, -30], [20, -35], [15, -34], [10, -30],
    [8, -20], [5, -10], [10, 0], [8, 5], [5, 10], [0, 15],
    [-5, 15], [-10, 18], [-15, 20], [-18, 25],
  ],
  // Asia
  [
    [40, 42], [50, 45], [60, 50], [70, 55], [80, 55], [90, 50],
    [100, 50], [110, 45], [120, 40], [130, 35], [120, 30],
    [110, 25], [105, 20], [100, 15], [95, 10], [90, 15],
    [80, 20], [70, 25], [60, 30], [50, 35], [45, 38],
  ],
  // North America
  [
    [-130, 50], [-120, 55], [-110, 60], [-100, 60], [-90, 55],
    [-80, 50], [-75, 45], [-70, 42], [-80, 35], [-85, 30],
    [-90, 28], [-95, 25], [-100, 20], [-105, 22], [-110, 28],
    [-115, 32], [-120, 38], [-125, 45],
  ],
  // South America
  [
    [-80, 10], [-75, 5], [-70, 0], [-65, -5], [-60, -10],
    [-55, -15], [-50, -20], [-48, -25], [-50, -30], [-55, -35],
    [-60, -40], [-65, -45], [-70, -50], [-75, -45], [-75, -40],
    [-70, -35], [-70, -25], [-75, -15], [-80, -5], [-80, 5],
  ],
  // Australia
  [
    [115, -15], [125, -15], [135, -18], [145, -20], [150, -25],
    [148, -30], [145, -35], [138, -35], [130, -32], [120, -28],
    [115, -22],
  ],
];

export function AirportGlobe({ title }: AirportGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const w = 400;
    const h = 200;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d')!;
    const startTime = Date.now();
    const cx = w / 2;
    const cy = h / 2;
    const radius = 80;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rotation = (elapsed * 0.015) % 360; // degrees per frame

      // Clear
      ctx.fillStyle = '#1a1030';
      ctx.fillRect(0, 0, w, h);

      // Stars background
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < 40; i++) {
        const sx = ((i * 97 + 13) % w);
        const sy = ((i * 53 + 7) % h);
        const size = (i % 3 === 0) ? 2 : 1;
        const twinkle = Math.sin(elapsed * 0.003 + i) > 0.3;
        if (twinkle) {
          ctx.fillRect(sx, sy, size, size);
        }
      }

      // Globe ocean (circle)
      ctx.fillStyle = '#4455aa';
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // Ocean grid lines on globe
      ctx.strokeStyle = '#5566bb';
      ctx.lineWidth = 1;
      // Latitude lines
      for (let lat = -60; lat <= 60; lat += 30) {
        const latRad = (lat * Math.PI) / 180;
        const yPos = cy - Math.sin(latRad) * radius;
        const xRadius = Math.cos(latRad) * radius;
        if (xRadius > 0) {
          ctx.beginPath();
          ctx.ellipse(cx, yPos, xRadius, xRadius * 0.1, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      // Longitude lines
      for (let lon = 0; lon < 180; lon += 30) {
        const lonRad = ((lon + rotation) * Math.PI) / 180;
        const xOffset = Math.sin(lonRad) * radius;
        const visWidth = Math.abs(Math.cos(lonRad)) * radius;
        if (visWidth > 2) {
          ctx.beginPath();
          ctx.ellipse(cx + xOffset, cy, visWidth * 0.05, radius, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Draw continents
      ctx.fillStyle = '#44aa44';
      ctx.strokeStyle = '#66cc66';
      ctx.lineWidth = 1;

      for (const continent of CONTINENTS) {
        ctx.beginPath();
        let started = false;
        const points: [number, number][] = [];

        for (const [lon, lat] of continent) {
          const adjustedLon = lon + rotation;
          const lonRad = (adjustedLon * Math.PI) / 180;
          const latRad = (lat * Math.PI) / 180;

          // Check if point is on visible side
          const cosLon = Math.cos(lonRad);
          if (cosLon < -0.1) continue;

          const px = cx + Math.sin(lonRad) * Math.cos(latRad) * radius;
          const py = cy - Math.sin(latRad) * radius;
          points.push([px, py]);

          if (!started) {
            ctx.moveTo(px, py);
            started = true;
          } else {
            ctx.lineTo(px, py);
          }
        }

        if (points.length >= 3) {
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
      }

      // Globe edge glow
      ctx.strokeStyle = '#66ccff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Highlight
      ctx.strokeStyle = '#88ddff44';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, radius - 2, -0.8, 0.4);
      ctx.stroke();

      // Pixel scanline effect on globe
      ctx.fillStyle = '#00000015';
      for (let y = cy - radius; y < cy + radius; y += 4) {
        ctx.fillRect(cx - radius, y, radius * 2, 1);
      }

      // Orbiting airplanes
      const plane1Angle = (elapsed * 0.001) % (Math.PI * 2);
      const plane2Angle = (elapsed * 0.001 + Math.PI) % (Math.PI * 2);

      ctx.font = '16px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Plane 1 - only show on front half
      const p1x = cx + Math.cos(plane1Angle) * (radius + 15);
      const p1y = cy + Math.sin(plane1Angle) * 20;
      if (Math.cos(plane1Angle) > -0.5) {
        ctx.save();
        ctx.translate(p1x, p1y);
        ctx.rotate(plane1Angle + Math.PI / 2);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('✈', 0, 0);
        ctx.restore();
      }

      // Plane 2
      const p2x = cx + Math.cos(plane2Angle) * (radius + 20);
      const p2y = cy + Math.sin(plane2Angle) * 30;
      if (Math.cos(plane2Angle) > -0.5) {
        ctx.save();
        ctx.translate(p2x, p2y);
        ctx.rotate(plane2Angle + Math.PI / 2);
        ctx.fillStyle = '#ffcc00';
        ctx.fillText('✈', 0, 0);
        ctx.restore();
      }

    }, 33);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="airport-globe">
      <canvas
        ref={canvasRef}
        className="globe-canvas"
        style={{
          width: '100%',
          display: 'block',
          imageRendering: 'pixelated',
        }}
      />
      <div className="globe-overlay">
        <h2 className="globe-title">🌍 {title}</h2>
        <p className="globe-subtitle">PALMA DE MALLORCA</p>
      </div>
    </div>
  );
}
