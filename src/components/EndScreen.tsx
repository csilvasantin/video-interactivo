import type { HistoryEntry, StoryGraph } from '../types';

interface EndScreenProps {
  story: StoryGraph;
  finalNodeId: string;
  history: HistoryEntry[];
  onRestart: () => void;
}

export function EndScreen({ story, finalNodeId, history, onRestart }: EndScreenProps) {
  const finalNode = story.nodes[finalNodeId];

  return (
    <div className="end-screen">
      <h1 className="end-title">Fin de la Historia</h1>
      <h2 className="end-subtitle">{finalNode.title}</h2>

      <div className="journey-recap">
        <h3>Tu recorrido:</h3>
        <div className="journey-steps">
          {history.map((entry, i) => (
            <div key={i} className="journey-step">
              <span className="step-node">{story.nodes[entry.nodeId].title}</span>
              <span className="step-arrow">→</span>
              <span className="step-decision">{entry.decisionLabel}</span>
            </div>
          ))}
          <div className="journey-step final">
            <span className="step-node">{finalNode.title}</span>
            <span className="step-badge">🏁 Final</span>
          </div>
        </div>
      </div>

      <button className="restart-btn" onClick={onRestart}>
        🔄 Volver a empezar
      </button>
    </div>
  );
}
