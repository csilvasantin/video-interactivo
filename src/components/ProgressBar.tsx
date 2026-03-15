import type { StoryGraph, HistoryEntry } from '../types';

interface ProgressBarProps {
  story: StoryGraph;
  history: HistoryEntry[];
  currentNodeId: string;
}

export function ProgressBar({ story, history, currentNodeId }: ProgressBarProps) {
  const visitedIds = [...history.map((h) => h.nodeId), currentNodeId];
  const totalNodes = Object.keys(story.nodes).length;
  const progress = (visitedIds.length / totalNodes) * 100;

  return (
    <div className="progress-bar-container">
      <div className="progress-nodes">
        {visitedIds.map((id, i) => (
          <div key={i} className="progress-node">
            <div className="progress-dot active" />
            <span className="progress-label">{story.nodes[id]?.title}</span>
            {i < visitedIds.length - 1 && <div className="progress-connector" />}
          </div>
        ))}
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
