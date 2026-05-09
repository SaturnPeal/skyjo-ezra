import { useState } from 'react';

const VALUES = [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function getCardColor(value) {
  if (value < 0)   return '#7B2D8B';
  if (value === 0) return '#42A5F5';
  if (value <= 4)  return '#2E7D32';
  if (value <= 8)  return '#F9A825';
  return '#C62828';
}

export default function SkyjoCard({ value, onChange }) {
  const [pressed, setPressed] = useState(false);

  function handleTap() {
    const idx = VALUES.indexOf(value);
    const next = VALUES[(idx + 1) % VALUES.length];
    onChange(next);
    setPressed(true);
    setTimeout(() => setPressed(false), 120);
  }

  return (
    <button
      onClick={handleTap}
      style={{
        width: '70px',
        height: '100px',
        borderRadius: '12px',
        background: getCardColor(value),
        border: '3px solid rgba(255,255,255,0.3)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        color: '#fff',
        fontSize: '28px',
        fontWeight: '900',
        fontFamily: 'Fredoka One, cursive',
        cursor: 'pointer',
        transform: pressed ? 'scale(0.88)' : 'scale(1)',
        transition: 'transform 0.12s ease, background 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {value}
    </button>
  );
}
