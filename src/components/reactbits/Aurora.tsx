import { type CSSProperties } from 'react';

interface AuroraProps {
  colorStops?: string[];
  blend?: number;
  amplitude?: number;
  speed?: number;
  className?: string;
}

export default function Aurora({
  colorStops = ['#3A29FF', '#FF94B4', '#FF3232'],
  blend = 0.5,
  amplitude = 1.0,
  speed = 0.5,
  className = '',
}: AuroraProps) {
  const style: CSSProperties & Record<string, string> = {
    '--aurora-blend': `${blend}`,
    '--aurora-speed': `${speed}`,
    '--aurora-amplitude': `${amplitude}`,
    '--color-1': colorStops[0] ?? '#3A29FF',
    '--color-2': colorStops[1] ?? '#FF94B4',
    '--color-3': colorStops[2] ?? '#FF3232',
  };

  return (
    <div
      className={`aurora-bg ${className}`}
      style={style}
    >
      <div className="aurora-layer aurora-layer-1" />
      <div className="aurora-layer aurora-layer-2" />
      <div className="aurora-layer aurora-layer-3" />
      <style>{`
        .aurora-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          opacity: var(--aurora-blend);
        }
        .aurora-layer {
          position: absolute;
          inset: -50%;
          border-radius: 50%;
          filter: blur(80px);
          mix-blend-mode: screen;
        }
        .aurora-layer-1 {
          background: radial-gradient(circle, var(--color-1) 0%, transparent 70%);
          animation: aurora-move-1 calc(8s / var(--aurora-speed)) ease-in-out infinite alternate;
        }
        .aurora-layer-2 {
          background: radial-gradient(circle, var(--color-2) 0%, transparent 70%);
          animation: aurora-move-2 calc(10s / var(--aurora-speed)) ease-in-out infinite alternate;
        }
        .aurora-layer-3 {
          background: radial-gradient(circle, var(--color-3) 0%, transparent 70%);
          animation: aurora-move-3 calc(12s / var(--aurora-speed)) ease-in-out infinite alternate;
        }
        @keyframes aurora-move-1 {
          0% { transform: translate(-30%, -20%) scale(calc(0.8 * var(--aurora-amplitude))); }
          100% { transform: translate(30%, 20%) scale(calc(1.2 * var(--aurora-amplitude))); }
        }
        @keyframes aurora-move-2 {
          0% { transform: translate(20%, -30%) scale(calc(1.0 * var(--aurora-amplitude))); }
          100% { transform: translate(-20%, 30%) scale(calc(0.9 * var(--aurora-amplitude))); }
        }
        @keyframes aurora-move-3 {
          0% { transform: translate(-10%, 30%) scale(calc(0.9 * var(--aurora-amplitude))); }
          100% { transform: translate(10%, -30%) scale(calc(1.1 * var(--aurora-amplitude))); }
        }
      `}</style>
    </div>
  );
}
