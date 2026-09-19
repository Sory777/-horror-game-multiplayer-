import { useEffect, useState } from 'react';
import type { MonsterKind } from '../lib/horrorGame/types';

interface JumpscareOverlayProps {
  active: boolean;
  intensity: 'small' | 'big';
  kind: MonsterKind;
  onDone: () => void;
}

function LloronaFace({ big }: { big: boolean }) {
  return (
    <>
      <ellipse cx="100" cy="105" rx="62" ry="88" fill="#e7e9ef" />
      <path
        d="M 40 60 Q 35 20 100 12 Q 165 20 160 60 Q 172 110 150 150 Q 140 100 130 70 Q 115 90 100 70 Q 85 90 70 70 Q 60 100 50 150 Q 28 110 40 60 Z"
        fill="#0a0a12"
      />
      <ellipse cx="70" cy="100" rx="13" ry={big ? 20 : 11} fill="#eafcff">
        <animate attributeName="ry" values={big ? '20;25;20' : '11;13;11'} dur="0.35s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="130" cy="100" rx="13" ry={big ? 20 : 11} fill="#eafcff">
        <animate attributeName="ry" values={big ? '20;25;20' : '11;13;11'} dur="0.35s" repeatCount="indefinite" />
      </ellipse>
      <circle cx="70" cy="100" r="4" fill="#0a0a12" />
      <circle cx="130" cy="100" r="4" fill="#0a0a12" />
      <path
        d="M 62 150 Q 100 200 138 150 Q 100 190 62 150 Z"
        fill="#1a0a10"
      />
    </>
  );
}

function JineteFace({ big }: { big: boolean }) {
  return (
    <>
      <ellipse cx="100" cy="105" rx="72" ry="80" fill="#d9660b" stroke="#3a1a00" strokeWidth="4" />
      <path d="M 55 60 L 90 95 L 55 100 Z" fill="#3a1a00">
        <animate attributeName="opacity" values={big ? '1;0.7;1' : '1;0.9;1'} dur="0.3s" repeatCount="indefinite" />
      </path>
      <path d="M 145 60 L 110 95 L 145 100 Z" fill="#3a1a00">
        <animate attributeName="opacity" values={big ? '1;0.7;1' : '1;0.9;1'} dur="0.3s" repeatCount="indefinite" />
      </path>
      <path
        d="M 55 145 L 75 130 L 90 145 L 100 128 L 110 145 L 125 130 L 145 145 L 135 165 L 115 152 L 100 168 L 85 152 L 65 165 Z"
        fill="#3a1a00"
      />
      <path d="M 90 8 Q 100 -4 110 8 L 106 20 L 94 20 Z" fill="#2f6b1f" />
    </>
  );
}

export function JumpscareOverlay({ active, intensity, kind, onDone }: JumpscareOverlayProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) return;
    setVisible(true);
    const duration = intensity === 'big' ? 550 : 260;
    const timer = window.setTimeout(() => {
      setVisible(false);
      onDone();
    }, duration);
    return () => window.clearTimeout(timer);
  }, [active, intensity, onDone]);

  if (!visible) return null;

  const big = intensity === 'big';
  const glow = kind === 'llorona' ? 'rgba(150,220,255,0.5)' : 'rgba(255,140,0,0.5)';

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-black"
      style={{ animation: big ? 'jumpscare-shake 0.5s ease-in-out' : 'jumpscare-flicker 0.25s ease-in-out' }}
    >
      <svg
        viewBox="0 0 200 200"
        className={big ? 'h-[70vh] w-[70vh] max-w-full' : 'h-[35vh] w-[35vh] max-w-full opacity-70'}
        style={{ filter: `drop-shadow(0 0 40px ${glow})` }}
      >
        {kind === 'llorona' ? <LloronaFace big={big} /> : <JineteFace big={big} />}
      </svg>
      <style>{`
        @keyframes jumpscare-shake {
          0% { transform: translate(0,0) scale(1); filter: brightness(1); }
          10% { transform: translate(-12px,8px) scale(1.05); filter: brightness(2.2); }
          25% { transform: translate(10px,-10px) scale(1.1); }
          40% { transform: translate(-8px,6px) scale(1.02); }
          60% { transform: translate(6px,-4px) scale(1.05); }
          100% { transform: translate(0,0) scale(1); filter: brightness(1); }
        }
        @keyframes jumpscare-flicker {
          0% { opacity: 0; }
          30% { opacity: 1; filter: brightness(2); }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
