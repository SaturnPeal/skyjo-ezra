import { useState } from 'react';

const STORAGE_KEY = 'skyjo_history';
const MAX_HISTORY = 3;

export function useHistory() {
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  function saveGame(game) {
    setHistory(prev => {
      const updated = [game, ...prev].slice(0, MAX_HISTORY);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }

  return { history, saveGame };
}
