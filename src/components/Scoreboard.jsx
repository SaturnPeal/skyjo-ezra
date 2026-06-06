import './Scoreboard.css';

export default function Scoreboard({ players, scores, scoreLimit, roundHistory, onNextRound, onEndGame, onMenu }) {
  const ranking = [...players].sort((a, b) => scores[a] - scores[b]);
  const lastRound = roundHistory[roundHistory.length - 1] || {};
  const roundNum = roundHistory.length;
  const hasGameOver = players.some(p => scores[p] >= scoreLimit);

  return (
    <div className="scoreboard-screen">
      <div className="sb-top-bar">
        <button className="btn-menu" onClick={onMenu}>☰</button>
      </div>
      <h2 className="sb-title">Manche {roundNum} terminée !</h2>
      <p className="sb-limit">🏁 Fin à {scoreLimit} pts</p>

      <div className="sb-table">
        {ranking.map((p, i) => (
          <div key={p} className={`sb-row ${i === 0 ? 'sb-leader' : ''}`}>
            <span className="sb-rank">{i === 0 ? '👑' : `${i + 1}.`}</span>
            <span className="sb-name">{p}</span>
            <span className="sb-round-score">
              {lastRound[p] !== undefined
                ? (lastRound[p] > 0 ? '+' : '') + lastRound[p]
                : '—'}
            </span>
            <span className="sb-total">{scores[p]}</span>
          </div>
        ))}
      </div>

      <div className="sb-legend">
        <span>Manche</span>
        <span>Total</span>
      </div>

      {hasGameOver ? (
        <button className="btn-endgame" onClick={onEndGame}>
          🏆 Voir le gagnant !
        </button>
      ) : (
        <button className="btn-next-round" onClick={onNextRound}>
          Manche suivante →
        </button>
      )}
    </div>
  );
}
