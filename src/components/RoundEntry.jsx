import { useState } from 'react';
import './RoundEntry.css';

const ALL_VALUES = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1, -2];

function getCardColor(value) {
  if (value < 0)   return '#7B2D8B';
  if (value === 0) return '#42A5F5';
  if (value <= 4)  return '#2E7D32';
  if (value <= 8)  return '#F9A825';
  return '#C62828';
}

export default function RoundEntry({ players, scores, onRoundComplete, onMenu }) {
  const [playerIdx, setPlayerIdx] = useState(0);
  const [roundScores, setRoundScores] = useState(
    () => Object.fromEntries(players.map(p => [p, 0]))
  );
  const [tapped, setTapped] = useState([]);

  const currentPlayer = players[playerIdx];
  const currentTotal = tapped.reduce((s, v) => s + v, 0);
  const isLast = playerIdx === players.length - 1;

  function handleCardTap(value) {
    setTapped(prev => [...prev, value]);
  }

  function handleUndo() {
    setTapped(prev => prev.slice(0, -1));
  }

  function handleNext() {
    const updatedScores = { ...roundScores, [currentPlayer]: currentTotal };
    setRoundScores(updatedScores);
    if (isLast) {
      onRoundComplete(updatedScores);
    } else {
      setPlayerIdx(i => i + 1);
      setTapped([]);
    }
  }

  return (
    <div className="re-screen">
      {/* Header */}
      <div className="re-header">
        <button className="btn-menu" onClick={onMenu}>☰</button>
        <div className="re-progress">
          {players.map((p, i) => (
            <div key={p} className={`re-dot ${i < playerIdx ? 'done' : i === playerIdx ? 'active' : ''}`} />
          ))}
        </div>
        <h2 className="re-player-name">{currentPlayer}</h2>
      </div>

      {/* Total */}
      <div className="re-total-display">
        <span className="re-total-num" style={{
          color: currentTotal < 0 ? '#4ade80' : currentTotal > 15 ? '#f87171' : 'white'
        }}>
          {currentTotal > 0 ? '+' : ''}{currentTotal}
        </span>
        <span className="re-card-count">{tapped.length} carte{tapped.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Grille — taille fixe, ne change jamais */}
      <div className="re-values-grid">
        {ALL_VALUES.map(value => (
          <button
            key={value}
            className="re-value-btn"
            style={{ background: getCardColor(value) }}
            onClick={() => handleCardTap(value)}
          >
            {value}
          </button>
        ))}
      </div>

      {/* Zone basse à hauteur fixe — ne déplace pas la grille */}
      <div className="re-bottom">
        <div className="re-tapped-list">
          {tapped.slice(-7).map((v, i) => (
            <span key={i} className="re-tapped-chip" style={{ background: getCardColor(v) }}>
              {v}
            </span>
          ))}
          {tapped.length > 7 && <span className="re-tapped-more">+{tapped.length - 7}</span>}
        </div>
        <div className="re-actions">
          {tapped.length > 0 && (
            <button className="btn-undo" onClick={handleUndo}>↩ Annuler</button>
          )}
          <button className="btn-next-player" onClick={handleNext}>
            {isLast ? 'Voir les scores 📊' : 'Joueur suivant →'}
          </button>
        </div>
      </div>
    </div>
  );
}
