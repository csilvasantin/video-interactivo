import type { Decision } from '../types';

// Pixel art flags as 7x5 grids (each number = color index)
const pixelFlags: Record<string, { grid: number[][]; colors: Record<number, string> }> = {
  japan: {
    grid: [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ],
    colors: { 0: '#ffffff', 1: '#bc002d' },
  },
  dubai: {
    grid: [
      [1, 2, 2, 2, 2, 2, 2],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 3, 3, 3, 3, 3, 3],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 4, 4, 4, 4, 4, 4],
    ],
    colors: { 0: '#ffffff', 1: '#ff0000', 2: '#00732f', 3: '#000000', 4: '#000000' },
  },
  london: {
    grid: [
      [0, 0, 1, 2, 1, 0, 0],
      [0, 0, 1, 2, 1, 0, 0],
      [1, 1, 1, 2, 1, 1, 1],
      [2, 2, 2, 2, 2, 2, 2],
      [1, 1, 1, 2, 1, 1, 1],
    ],
    colors: { 0: '#012169', 1: '#c8102e', 2: '#ffffff' },
  },
};

function getCountryFromNodeId(nodeId: string): string | null {
  if (nodeId === 'japan') return 'japan';
  if (nodeId === 'dubai') return 'dubai';
  if (nodeId === 'london') return 'london';
  return null;
}

function PixelFlag({ country }: { country: string }) {
  const flag = pixelFlags[country];
  if (!flag) return null;

  return (
    <div
      className="pixel-flag"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(7, 6px)`,
        gridTemplateRows: `repeat(5, 6px)`,
        gap: '0px',
        margin: '0.5rem auto 0',
        border: '2px solid var(--pixel-shadow)',
        width: 'fit-content',
        imageRendering: 'pixelated',
      }}
    >
      {flag.grid.flat().map((colorIdx, i) => (
        <div
          key={i}
          style={{
            width: '6px',
            height: '6px',
            background: flag.colors[colorIdx],
          }}
        />
      ))}
    </div>
  );
}

interface DecisionOverlayProps {
  decisions: Decision[];
  onDecision: (index: number) => void;
  visible: boolean;
}

export function DecisionOverlay({ decisions, onDecision, visible }: DecisionOverlayProps) {
  if (!visible) return null;

  return (
    <div className={`decision-overlay ${visible ? 'visible' : ''}`}>
      <p className="decision-prompt">¿Qué quieres hacer?</p>
      <div className="decision-buttons">
        {decisions.map((decision, index) => {
          const country = getCountryFromNodeId(decision.nextNodeId);
          return (
            <button
              key={decision.nextNodeId}
              className="decision-btn"
              onClick={() => onDecision(index)}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {decision.label}
              {country && <PixelFlag country={country} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
