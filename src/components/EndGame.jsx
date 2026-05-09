import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import './EndGame.css';

export default function EndGame({ players, scores, onNewGame }) {
  const ranking = [...players].sort((a, b) => scores[a] - scores[b]);
  const winner = ranking[0];
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;

    const burst = (x, angle) =>
      confetti({
        particleCount: 120,
        spread: 70,
        angle,
        origin: { x, y: 0.7 },
        colors: ['#facc15', '#f97316', '#a855f7', '#22c55e', '#3b82f6', '#ec4899'],
      });

    burst(0.25, 120);
    setTimeout(() => burst(0.75, 60), 250);
    setTimeout(() => burst(0.5, 90), 600);
  }, []);

  const MEDALS = ['🥇', '🥈', '🥉'];

  return (
    <div className="endgame-screen">
      <div className="eg-winner-box">
        <div className="eg-trophy">🏆</div>
        <h1 className="eg-winner-name">{winner}</h1>
        <p className="eg-winner-sub">a gagné !</p>
        <p className="eg-winner-score">{scores[winner]} points</p>
      </div>

      <div className="eg-ranking">
        {ranking.map((p, i) => (
          <div key={p} className={`eg-row eg-row-${i}`}>
            <span className="eg-medal">{MEDALS[i] || `${i + 1}.`}</span>
            <span className="eg-name">{p}</span>
            <span className="eg-score">{scores[p]} pts</span>
          </div>
        ))}
      </div>

      <button className="btn-new-game-end" onClick={onNewGame}>
        🎮 Nouvelle partie
      </button>
    </div>
  );
}
