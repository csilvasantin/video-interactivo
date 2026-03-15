import { nodeColors, nodeDescriptions } from './story';

function shiftColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, ((num >> 16) & 0xff) + amount);
  const g = Math.min(255, ((num >> 8) & 0xff) + amount);
  const b = Math.min(255, (num & 0xff) + amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

export function animateScene(
  canvas: HTMLCanvasElement,
  nodeId: string,
  title: string,
  durationSeconds: number,
  onTimeUpdate: (currentTime: number) => void,
  onEnded: () => void
): () => void {
  const ctx = canvas.getContext('2d')!;
  const colors = nodeColors[nodeId] || { bg: '#1a1a2e', accent: '#e94560' };
  const description = nodeDescriptions[nodeId] || '';

  const startTime = Date.now();
  const durationMs = durationSeconds * 1000;
  let intervalId: ReturnType<typeof setInterval>;
  let ended = false;

  function render() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / durationMs, 1);
    const currentTime = progress * durationSeconds;
    const frame = Math.floor(elapsed / 16);

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, colors.bg);
    gradient.addColorStop(1, shiftColor(colors.bg, 30));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Animated particles
    for (let i = 0; i < 20; i++) {
      const x = (i * 137 + frame * 2) % canvas.width;
      const y = (i * 97 + frame * 1.5) % canvas.height;
      const size = 2 + Math.sin(frame * 0.05 + i) * 2;
      ctx.fillStyle = colors.accent + '40';
      ctx.beginPath();
      ctx.arc(x, y, Math.max(0.5, size), 0, Math.PI * 2);
      ctx.fill();
    }

    // Pulsing ring
    const ringRadius = 60 + Math.sin(progress * Math.PI * 4) * 20;
    ctx.strokeStyle = colors.accent + '60';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2 - 40, ringRadius, 0, Math.PI * 2);
    ctx.stroke();

    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(title, canvas.width / 2, canvas.height / 2 - 30);

    // Description
    ctx.fillStyle = colors.accent;
    ctx.font = '20px system-ui, sans-serif';
    ctx.fillText(description, canvas.width / 2, canvas.height / 2 + 20);

    // Progress bar at bottom
    ctx.fillStyle = colors.accent + '80';
    ctx.fillRect(0, canvas.height - 4, canvas.width * progress, 4);

    onTimeUpdate(currentTime);

    if (progress >= 1 && !ended) {
      ended = true;
      clearInterval(intervalId);
      onEnded();
    }
  }

  // Use setInterval instead of requestAnimationFrame so it works in background tabs
  intervalId = setInterval(render, 33); // ~30fps
  render(); // first frame immediately

  return () => {
    clearInterval(intervalId);
  };
}
