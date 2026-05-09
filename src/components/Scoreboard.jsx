import './Scoreboard.css';

export default function Scoreboard({ players, scores, roundHistory, onNextRound, onEndGame }) {
  const ranking = [...players].sort((a, b) => scores[a] - scores[b]);
  const leader = ranking[0];
  const lastRound = roundHistory[roundHistory.length - 1] || {};
  const roundNum = roundHistory.length;
  const hasGameOver = players.some(p => scores[p] >= 100);

  return (
    <div className="scoreboard-screen">
      <h2 className="sb-title">Manche {roundNum} terminée !</h2>

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
