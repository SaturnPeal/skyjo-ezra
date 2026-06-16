import { useState } from 'react';
import './PlayerSelect.css';

const PLAYER_EMOJIS = {
  'Ezra': '🦊',
  'Alexis': '🦁',
  'Célina': '🦋',
  'Mamie Vava': '🌸',
  'Marraine': '⭐',
};

const TIME_OPTIONS = [
  { label: 'Sans chrono', value: null },
  { label: '15 min', value: 15 },
  { label: '30 min', value: 30 },
  { label: '45 min', value: 45 },
];

export default function PlayerSelect({ allPlayers, onStart, onBack }) {
  const [selected, setSelected] = useState([]);
  const [limit, setLimit] = useState(100);
  const [timeLimit, setTimeLimit] = useState(null);

  function toggle(name) {
    setSelected(prev => {
      if (prev.includes(name)) return prev.filter(p => p !== name);
      if (prev.length >= 4) return prev;
      return [...prev, name];
    });
  }

  const canStart = selected.length >= 2;

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

      {selected.length < 2 && <p className="ps-hint">Choisis 2 à 4 joueurs</p>}
      {selected.length >= 4 && <p className="ps-hint">Maximum 4 joueurs</p>}

      {/* Sélection du mode */}
      <div className="ps-mode">
        <p className="ps-mode-label">🏁 Fin de partie à :</p>
        <div className="ps-mode-btns">
          <button
            className={`ps-mode-btn ${limit === 50 ? 'active' : ''}`}
            onClick={() => setLimit(50)}
          >
            50 pts
          </button>
          <button
            className={`ps-mode-btn ${limit === 100 ? 'active' : ''}`}
            onClick={() => setLimit(100)}
          >
            100 pts
          </button>
        </div>
      </div>

      {/* Sélection du chrono */}
      <div className="ps-mode">
        <p className="ps-mode-label">⏱️ Chrono :</p>
        <div className="ps-mode-btns">
          {TIME_OPTIONS.map(opt => (
            <button
              key={opt.label}
              className={`ps-mode-btn ${timeLimit === opt.value ? 'active' : ''}`}
              onClick={() => setTimeLimit(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {canStart && (
        <button className="btn-start" onClick={() => onStart(selected, limit, timeLimit)}>
          🚀 Commencer !
        </button>
      )}
    </div>
  );
}
