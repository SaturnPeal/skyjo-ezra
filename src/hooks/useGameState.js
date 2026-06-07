import { useState, useEffect } from 'react';

const ALL_PLAYERS = ['Ezra', 'Alexis', 'Célina', 'Mamie Vava', 'Marraine'];
const SAVE_KEY = 'skyjo_game_in_progress';

function loadSaved() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function useGameState() {
  const saved = loadSaved();

  const [players, setPlayers]           = useState(saved?.players       ?? []);
  const [scores, setScores]             = useState(saved?.scores         ?? {});
  const [roundHistory, setRoundHistory] = useState(saved?.roundHistory   ?? []);
  const [scoreLimit, setScoreLimit]     = useState(saved?.scoreLimit     ?? 100);

  // Sauvegarde automatique à chaque changement
  useEffect(() => {
    if (players.length > 0) {
      localStorage.setItem(SAVE_KEY, JSON.stringify({ players, scores, roundHistory, scoreLimit }));
    }
  }, [players, scores, roundHistory, scoreLimit]);

  function startGame(selectedPlayers, limit = 100) {
    setPlayers(selectedPlayers);
    setScoreLimit(limit);
    const initial = {};
    selectedPlayers.forEach(p => (initial[p] = 0));
    setScores(initial);
    setRoundHistory([]);
    localStorage.setItem(SAVE_KEY, JSON.stringify({
      players: selectedPlayers,
      scores: initial,
      roundHistory: [],
      scoreLimit: limit,
    }));
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

  function clearGame() {
    localStorage.removeItem(SAVE_KEY);
    setPlayers([]);
    setScores({});
    setRoundHistory([]);
    setScoreLimit(100);
  }

  function isGameOver() {
    return Object.values(scores).some(s => s >= scoreLimit);
  }

  function getRanking() {
    return [...players].sort((a, b) => scores[a] - scores[b]);
  }

  return {
    allPlayers: ALL_PLAYERS,
    players,
    scores,
    scoreLimit,
    roundHistory,
    startGame,
    applyRound,
    clearGame,
    isGameOver,
    getRanking,
  };
}
