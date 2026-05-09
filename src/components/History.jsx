import './History.css';

export default function History({ history, onBack }) {
  return (
    <div className="history-screen">
      <div className="hist-header">
        <button className="btn-back-hist" onClick={onBack}>← Retour</button>
        <h2 className="hist-title">Dernières parties 📜</h2>
      </div>

      {history.length === 0 ? (
        <div className="hist-empty">
          <span style={{ fontSize: '4rem' }}>🎴</span>
          <p>Aucune partie terminée pour l'instant !</p>
        </div>
      ) : (
        <div className="hist-list">
          {history.map((game, i) => {
            const ranking = [...game.players].sort((a, b) => game.scores[a] - game.scores[b]);
            return (
              <div key={i} className="hist-game">
                <div className="hist-game-header">
                  <span className="hist-date">{new Date(game.date).toLocaleDateString('fr-FR', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}</span>
                  <span className="hist-rounds">{game.rounds} manches</span>
                </div>
                <div className="hist-ranking">
                  {ranking.map((p, j) => (
                    <div key={p} className={`hist-row ${j === 0 ? 'hist-winner' : ''}`}>
                      <span className="hist-pos">{j === 0 ? '🥇' : j === 1 ? '🥈' : j === 2 ? '🥉' : `${j + 1}.`}</span>
                      <span className="hist-pname">{p}</span>
                      <span className="hist-pscore">{game.scores[p]} pts</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
