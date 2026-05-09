import { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import PlayerSelect from './components/PlayerSelect';
import RoundEntry from './components/RoundEntry';
import Scoreboard from './components/Scoreboard';
import EndGame from './components/EndGame';
import History from './components/History';
import { useGameState } from './hooks/useGameState';
import { useHistory } from './hooks/useHistory';

// Couleur du bas du dégradé de chaque écran — couvre le menton iOS
const CHIN_COLORS = {
  home:       '#42a5f5',
  select:     '#42a5f5',
  round:      '#1e293b',
  scoreboard: '#42a5f5',
  endgame:    '#0f3460',
  history:    '#42a5f5',
};

export default function App() {
  const [screen, setScreen] = useState('home');
  const { allPlayers, players, scores, roundHistory, startGame, applyRound, isGameOver, getRanking } = useGameState();
  const { history, saveGame } = useHistory();

  function handleStartGame(selected) {
    startGame(selected);
    setScreen('round');
  }

  function handleRoundComplete(roundScores) {
    applyRound(roundScores);
    setScreen('scoreboard');
  }

  function handleNextRound() {
    setScreen('round');
  }

  function handleEndGame() {
    saveGame({
      date: new Date().toISOString(),
      players,
      scores,
      rounds: roundHistory.length,
    });
    setScreen('endgame');
  }

  function handleNewGame() {
    setScreen('home');
  }

  return (
    <>
      {screen === 'home' && (
        <HomeScreen
          onNewGame={() => setScreen('select')}
          onHistory={() => setScreen('history')}
        />
      )}
      {screen === 'select' && (
        <PlayerSelect
          allPlayers={allPlayers}
          onStart={handleStartGame}
          onBack={() => setScreen('home')}
        />
      )}
      {screen === 'round' && (
        <RoundEntry
          players={players}
          scores={scores}
          onRoundComplete={handleRoundComplete}
        />
      )}
      {screen === 'scoreboard' && (
        <Scoreboard
          players={players}
          scores={scores}
          roundHistory={roundHistory}
          onNextRound={handleNextRound}
          onEndGame={handleEndGame}
        />
      )}
      {screen === 'endgame' && (
        <EndGame
          players={players}
          scores={scores}
          onNewGame={handleNewGame}
        />
      )}
      {screen === 'history' && (
        <History
          history={history}
          onBack={() => setScreen('home')}
        />
      )}

      {/* Couvre le menton iOS (home indicator) avec la bonne couleur */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 'env(safe-area-inset-bottom, 0px)',
        background: CHIN_COLORS[screen] ?? '#1a237e',
        pointerEvents: 'none',
        zIndex: 9999,
      }} />
    </>
  );
}
