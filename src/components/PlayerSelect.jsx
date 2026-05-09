import { useState } from 'react';
import './PlayerSelect.css';

const PLAYER_EMOJIS = {
  'Ezra': '🦊',
  'Alexis': '🦁',
  'Célina': '🦋',
  'Mamie Vava': '🌸',
  'Marraine': '⭐',
};

export default function PlayerSelect({ allPlayers, onStart, onBack }) {
  const [selected, setSelected] = useState([]);

  function toggle(name) {
    setSelected(prev => {
      if (prev.includes(name)) return prev.filter(p => p !== name);
      if (prev.length >= 4) return prev;
      return [...prev, name];
    });
  }

  return (
    <div className="player-select-screen">
      <div className="ps-header">
        <button className="btn-back" onClick={onBack}>← Retour</button>
        <h2 className="ps-title">Qui joue ? 🎉</h2>
      </div>

      <div className="ps-players">
        {allPlayers.map(name => (
          <button
            key={name}
            className={`ps-player-btn ${selected.includes(name) ? 'selected' : ''} ${!selected.includes(name) && selected.length >= 4 ? 'disabled' : ''}`}
            onClick={() => toggle(name)}
          >
            <span className="ps-emoji">{PLAYER_EMOJIS[name]}</span>
            <span className="ps-name">{name}</span>
            <span className="ps-check">{selected.includes(name) ? '✓' : ''}</span>
          </button>
        ))}
      </div>

      {selected.length >= 2 && (
        <button className="btn-start" onClick={() => onStart(selected)}>
          🚀 Commencer !
        </button>
      )}

      {selected.length < 2 && (
        <p className="ps-hint">Choisis 2 à 4 joueurs</p>
      )}
      {selected.length >= 4 && (
        <p className="ps-hint">Maximum 4 joueurs</p>
      )}
    </div>
  );
}
