import { useState, useCallback } from 'react';
import type { StoryGraph, StoryNode, HistoryEntry } from '../types';

interface StoryEngineState {
  currentNode: StoryNode;
  history: HistoryEntry[];
  isFinished: boolean;
  showDecisions: boolean;
}

export function useStoryEngine(story: StoryGraph) {
  const [state, setState] = useState<StoryEngineState>({
    currentNode: story.nodes[story.startNodeId],
    history: [],
    isFinished: false,
    showDecisions: false,
  });

  const makeDecision = useCallback(
    (decisionIndex: number) => {
      const decision = state.currentNode.decisions?.[decisionIndex];
      if (!decision) return;

      const nextNode = story.nodes[decision.nextNodeId];
      if (!nextNode) return;

      setState((prev) => ({
        currentNode: nextNode,
        history: [
          ...prev.history,
          { nodeId: prev.currentNode.id, decisionLabel: decision.label },
        ],
        isFinished: !nextNode.decisions || nextNode.decisions.length === 0,
        showDecisions: false,
      }));
    },
    [state.currentNode, story.nodes]
  );

  const setShowDecisions = useCallback((show: boolean) => {
    setState((prev) => ({ ...prev, showDecisions: show }));
  }, []);

  const restart = useCallback(() => {
    setState({
      currentNode: story.nodes[story.startNodeId],
      history: [],
      isFinished: false,
      showDecisions: false,
    });
  }, [story]);

  const goBack = useCallback(() => {
    if (state.history.length === 0) return;

    const newHistory = [...state.history];
    const lastEntry = newHistory.pop()!;
    const previousNode = story.nodes[lastEntry.nodeId];

    setState({
      currentNode: previousNode,
      history: newHistory,
      isFinished: false,
      showDecisions: false,
    });
  }, [state.history, story.nodes]);

  return {
    currentNode: state.currentNode,
    history: state.history,
    isFinished: state.isFinished,
    showDecisions: state.showDecisions,
    setShowDecisions,
    makeDecision,
    restart,
    goBack,
    canGoBack: state.history.length > 0,
  };
}
