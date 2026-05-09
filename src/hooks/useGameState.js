import { useState } from 'react';

const ALL_PLAYERS = ['Ezra', 'Alexis', 'Célina', 'Mamie Vava', 'Marraine'];

export function useGameState() {
  const [players, setPlayers] = useState([]);
  const [scores, setScores] = useState({});
  const [roundHistory, setRoundHistory] = useState([]);

  function startGame(selectedPlayers) {
    setPlayers(selectedPlayers);
    const initial = {};
    selectedPlayers.forEach(p => (initial[p] = 0));
    setScores(initial);
    setRoundHistory([]);
  }

  function applyRound(roundScores) {
    setScores(prev => {
      const updated = { ...prev };
      players.forEach(p => {
        updated[p] = (prev[p] || 0) + (roundScores[p] || 0);
      });
      return updated;
    });
    setRoundHistory(prev => [...prev, roundScores]);
  }

  function isGameOver() {
    return Object.values(scores).some(s => s >= 100);
  }

  function getRanking() {
    return [...players].sort((a, b) => scores[a] - scores[b]);
  }

  return {
    allPlayers: ALL_PLAYERS,
    players,
    scores,
    roundHistory,
    startGame,
    applyRound,
    isGameOver,
    getRanking,
  };
}
