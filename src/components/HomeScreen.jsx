import { useState, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import './HomeScreen.css';

const FLOATING_CARDS = [
  { color: '#7B2D8B', value: '-2', style: { top: '5%', left: '4%', animationDelay: '0s', animationDuration: '6s' } },
  { color: '#1565C0', value: '0',  style: { top: '12%', right: '6%', animationDelay: '1s', animationDuration: '7s' } },
  { color: '#2E7D32', value: '3',  style: { top: '55%', left: '2%', animationDelay: '2s', animationDuration: '5.5s' } },
  { color: '#F9A825', value: '7',  style: { top: '65%', right: '3%', animationDelay: '0.5s', animationDuration: '8s' } },
  { color: '#E65100', value: '10', style: { top: '35%', left: '7%', animationDelay: '1.5s', animationDuration: '6.5s' } },
  { color: '#C62828', value: '12', style: { top: '30%', right: '2%', animationDelay: '3s', animationDuration: '7.5s' } },
  { color: '#F9A825', value: '5',  style: { top: '80%', left: '12%', animationDelay: '2.5s', animationDuration: '6s' } },
  { color: '#2E7D32', value: '1',  style: { top: '75%', right: '10%', animationDelay: '4s', animationDuration: '9s' } },
];

const SPARKLES = ['⭐', '✨', '💫', '🌟', '🎉', '🎊', '🪄', '🌈'];

function FloatingCard({ color, value, style }) {
  const [popping, setPopping] = useState(false);
  const [sparkle, setSparkle] = useState(null);
  const ref = useRef(null);

  const handleTap = useCallback(() => {
    if (popping) return;

    // Position pour les confettis
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 40,
        spread: 80,
        origin: { x, y },
        colors: [color, '#facc15', '#ffffff', '#a855f7', '#22c55e'],
        scalar: 0.9,
        startVelocity: 22,
        gravity: 1.2,
      });
    }

    // Sparkle aléatoire
    setSparkle(SPARKLES[Math.floor(Math.random() * SPARKLES.length)]);
    setPopping(true);
    setTimeout(() => { setPopping(false); setSparkle(null); }, 600);
  }, [popping, color]);

  return (
    <div
      ref={ref}
      className={`floating-card ${popping ? 'popping' : ''}`}
      style={style}
      onClick={handleTap}
    >
      <svg width="52" height="72" viewBox="0 0 52 72">
        <rect x="2" y="2" width="48" height="68" rx="8" fill={color} stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
        <rect x="6" y="6" width="40" height="60" rx="5" fill="rgba(255,255,255,0.08)"/>
        <text x="26" y="44" textAnchor="middle" dominantBaseline="middle" fill="white"
          fontSize="22" fontWeight="bold" fontFamily="Fredoka One, cursive">{value}</text>
        <text x="10" y="16" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.7)"
          fontSize="11" fontFamily="Fredoka One, cursive">{value}</text>
        <text x="42" y="57" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.7)"
          fontSize="11" fontFamily="Fredoka One, cursive" transform="rotate(180 42 57)">{value}</text>
      </svg>
      {sparkle && <div className="card-sparkle">{sparkle}</div>}
    </div>
  );
}

/* ── Créature 1 : Blobby le monstre violet ── */
function MonsterBlobby() {
  return (
    <svg className="monster monster-blobby" width="90" height="90" viewBox="0 0 90 90">
      {/* corps */}
      <ellipse cx="45" cy="52" rx="32" ry="28" fill="#A855F7"/>
      {/* oreilles */}
      <ellipse cx="18" cy="32" rx="10" ry="14" fill="#C084FC"/>
      <ellipse cx="72" cy="32" rx="10" ry="14" fill="#C084FC"/>
      {/* yeux blancs */}
      <circle cx="34" cy="46" r="12" fill="white"/>
      <circle cx="56" cy="46" r="12" fill="white"/>
      {/* pupilles */}
      <circle cx="36" cy="47" r="6" fill="#1a1a2e"/>
      <circle cx="58" cy="47" r="6" fill="#1a1a2e"/>
      {/* reflets */}
      <circle cx="38" cy="44" r="2" fill="white"/>
      <circle cx="60" cy="44" r="2" fill="white"/>
      {/* sourire */}
      <path d="M35 62 Q45 70 55 62" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
      {/* dents */}
      <rect x="40" y="62" width="6" height="5" rx="2" fill="white"/>
      {/* bras */}
      <ellipse cx="14" cy="58" rx="8" ry="5" fill="#A855F7" transform="rotate(-20 14 58)"/>
      <ellipse cx="76" cy="58" rx="8" ry="5" fill="#A855F7" transform="rotate(20 76 58)"/>
      {/* taches */}
      <circle cx="35" cy="70" r="4" fill="#C084FC"/>
      <circle cx="55" cy="72" r="3" fill="#C084FC"/>
    </svg>
  );
}

/* ── Créature 2 : Zappy le monstre vert ── */
function MonsterZappy() {
  return (
    <svg className="monster monster-zappy" width="80" height="95" viewBox="0 0 80 95">
      {/* antennes */}
      <line x1="28" y1="12" x2="20" y2="2" stroke="#4ADE80" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="20" cy="2" r="4" fill="#FACC15"/>
      <line x1="52" y1="12" x2="60" y2="2" stroke="#4ADE80" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="60" cy="2" r="4" fill="#FACC15"/>
      {/* corps carré arrondi */}
      <rect x="8" y="14" width="64" height="62" rx="20" fill="#22C55E"/>
      {/* ventre */}
      <ellipse cx="40" cy="50" rx="22" ry="20" fill="#4ADE80"/>
      {/* yeux */}
      <rect x="20" y="28" width="14" height="14" rx="5" fill="white"/>
      <rect x="46" y="28" width="14" height="14" rx="5" fill="white"/>
      <rect x="24" y="32" width="6" height="6" rx="2" fill="#1a1a2e"/>
      <rect x="50" y="32" width="6" height="6" rx="2" fill="#1a1a2e"/>
      <circle cx="25" cy="33" r="1.5" fill="white"/>
      <circle cx="51" cy="33" r="1.5" fill="white"/>
      {/* bouche zigzag */}
      <path d="M28 56 L33 52 L38 56 L43 52 L48 56 L53 52" stroke="white" strokeWidth="2.5"
        fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {/* pieds */}
      <ellipse cx="25" cy="76" rx="10" ry="8" fill="#16A34A"/>
      <ellipse cx="55" cy="76" rx="10" ry="8" fill="#16A34A"/>
      {/* orteils */}
      <circle cx="20" cy="81" r="3.5" fill="#15803D"/>
      <circle cx="27" cy="83" r="3.5" fill="#15803D"/>
      <circle cx="50" cy="83" r="3.5" fill="#15803D"/>
      <circle cx="57" cy="81" r="3.5" fill="#15803D"/>
    </svg>
  );
}

/* ── Créature 3 : Rounchy le monstre orange ── */
function MonsterRounchy() {
  return (
    <svg className="monster monster-rounchy" width="75" height="75" viewBox="0 0 75 75">
      {/* corps rond */}
      <circle cx="37" cy="40" r="30" fill="#FB923C"/>
      {/* cheveux */}
      <path d="M18 22 Q22 8 30 18" fill="#EA580C"/>
      <path d="M30 15 Q37 2 44 15" fill="#EA580C"/>
      <path d="M44 18 Q53 8 57 22" fill="#EA580C"/>
      {/* yeux grands */}
      <circle cx="28" cy="36" r="10" fill="white"/>
      <circle cx="47" cy="36" r="10" fill="white"/>
      {/* étoiles dans les yeux */}
      <text x="28" y="40" textAnchor="middle" fontSize="10">⭐</text>
      <text x="47" y="40" textAnchor="middle" fontSize="10">⭐</text>
      {/* joues */}
      <circle cx="20" cy="46" r="6" fill="#FCA5A5" opacity="0.6"/>
      <circle cx="55" cy="46" r="6" fill="#FCA5A5" opacity="0.6"/>
      {/* bouche contente */}
      <path d="M25 52 Q37 63 50 52" stroke="#92400E" strokeWidth="3" fill="#FDE68A" strokeLinecap="round"/>
      {/* petites mains */}
      <circle cx="8" cy="42" r="7" fill="#FB923C"/>
      <circle cx="67" cy="42" r="7" fill="#FB923C"/>
      <circle cx="5" cy="37" r="4" fill="#FDBA74"/>
      <circle cx="70" cy="37" r="4" fill="#FDBA74"/>
    </svg>
  );
}

/* ── Étoiles de fond ── */
function Stars() {
  const stars = [
    { cx: 15, cy: 8, r: 3 }, { cx: 85, cy: 15, r: 2 }, { cx: 50, cy: 5, r: 2.5 },
    { cx: 92, cy: 45, r: 2 }, { cx: 8, cy: 60, r: 3 }, { cx: 75, cy: 80, r: 2 },
    { cx: 30, cy: 90, r: 2.5 }, { cx: 60, cy: 92, r: 2 }, { cx: 95, cy: 70, r: 3 },
  ];
  return (
    <svg className="stars-bg" viewBox="0 0 100 100" preserveAspectRatio="none">
      {stars.map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="rgba(255,255,255,0.6)"
          className={`star star-${i % 3}`}/>
      ))}
    </svg>
  );
}

export default function HomeScreen({ onNewGame, onHistory, onResume, hasSavedGame }) {
  return (
    <div className="home-screen">
      <Stars />

      {FLOATING_CARDS.map((c, i) => (
        <FloatingCard key={i} {...c} />
      ))}

      {/* Créatures décoratives */}
      <div className="creature creature-left">
        <MonsterBlobby />
      </div>
      <div className="creature creature-right">
        <MonsterZappy />
      </div>
      <div className="creature creature-bottom">
        <MonsterRounchy />
      </div>

      {/* Contenu principal */}
      <div className="home-content">
        <h1 className="home-title">
          <svg width="44" height="60" viewBox="0 0 44 60" style={{verticalAlign:'middle', marginRight:'10px', filter:'drop-shadow(0 2px 6px rgba(0,0,0,0.4))'}}>
            <rect x="1" y="1" width="42" height="58" rx="8" fill="#C62828" stroke="rgba(255,255,255,0.35)" strokeWidth="2"/>
            <rect x="5" y="5" width="34" height="50" rx="5" fill="rgba(255,255,255,0.1)"/>
            <text x="22" y="36" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="22" fontWeight="900" fontFamily="Fredoka One, cursive">12</text>
            <text x="9" y="14" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10" fontFamily="Fredoka One, cursive">12</text>
            <text x="35" y="47" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10" fontFamily="Fredoka One, cursive" transform="rotate(180 35 47)">12</text>
          </svg>
          Skyjo d'Ezra
        </h1>
        <p className="home-subtitle">Le jeu des familles !</p>

        <div className="home-buttons">
          {hasSavedGame && (
            <button className="btn-home btn-resume" onClick={onResume}>
              <span className="btn-icon">▶️</span>
              <span>Reprendre la partie</span>
            </button>
          )}
          <button className="btn-home btn-new-game" onClick={onNewGame}>
            <span className="btn-icon">🎮</span>
            <span>Nouvelle partie</span>
          </button>
          <button className="btn-home btn-history" onClick={onHistory}>
            <span className="btn-icon">📜</span>
            <span>Dernières parties</span>
          </button>
        </div>
      </div>
    </div>
  );
}
