import { useCallback } from 'react';
import type { StoryGraph } from '../types';
import { useStoryEngine } from '../hooks/useStoryEngine';
import { VideoPlayer } from './VideoPlayer';
import { DecisionOverlay } from './DecisionOverlay';
import { EndScreen } from './EndScreen';
import { ProgressBar } from './ProgressBar';
import { VideoWall } from './VideoWall';
import { FlightMap } from './FlightMap';
import { AirportGlobe } from './AirportGlobe';

interface StoryFlowProps {
  story: StoryGraph;
}

export function StoryFlow({ story }: StoryFlowProps) {
  const {
    currentNode,
    history,
    isFinished,
    showDecisions,
    setShowDecisions,
    makeDecision,
    restart,
    goBack,
    canGoBack,
  } = useStoryEngine(story);

  const handleTimeUpdate = useCallback(
    (time: number) => {
      if (!currentNode.decisions || showDecisions) return;
      const shouldShow = currentNode.decisions.some((d) => time >= d.timeAppear);
      if (shouldShow) setShowDecisions(true);
    },
    [currentNode, showDecisions, setShowDecisions]
  );

  const handleVideoEnded = useCallback(() => {
    if (currentNode.decisions && !showDecisions) {
      setShowDecisions(true);
    }
  }, [currentNode, showDecisions, setShowDecisions]);

  const handleDecision = useCallback(
    (index: number) => {
      makeDecision(index);
    },
    [makeDecision]
  );

  if (isFinished) {
    return (
      <EndScreen
        story={story}
        finalNodeId={currentNode.id}
        history={history}
        onRestart={restart}
      />
    );
  }

  const isAirport = currentNode.id === 'airport';

  return (
    <div className="story-flow">
      {isAirport ? (
        <>
          {/* Airport: Globe with flight selection overlaid */}
          <div className="airport-globe-wrapper">
            <AirportGlobe title={currentNode.title} />
            {currentNode.decisions && (
              <div className="globe-flight-choices">
                {currentNode.decisions.map((decision, index) => (
                  <button
                    key={decision.nextNodeId}
                    className="flight-choice-btn"
                    onClick={() => handleDecision(index)}
                  >
                    {decision.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <VideoWall currentNodeId={currentNode.id} />
        </>
      ) : (
        <>
          <div className="story-header">
            <h2 className="scene-title">{currentNode.title}</h2>
            {canGoBack && (
              <button className="back-btn" onClick={goBack}>
                ← Volver
              </button>
            )}
          </div>
          <div className="airport-globe-wrapper">
            <FlightMap currentNodeId={currentNode.id} />
          </div>
          <VideoWall currentNodeId={currentNode.id} />
          <div className="video-wrapper">
            <VideoPlayer
              nodeId={currentNode.id}
              title={currentNode.title}
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleVideoEnded}
              paused={showDecisions}
            />
            {currentNode.decisions && (
              <DecisionOverlay
                decisions={currentNode.decisions}
                onDecision={handleDecision}
                visible={showDecisions}
              />
            )}
          </div>
        </>
      )}

      <ProgressBar story={story} history={history} currentNodeId={currentNode.id} />
    </div>
  );
}
