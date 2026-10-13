import React, { useEffect, useState } from 'react';

interface NetworkBackgroundProps {
  className?: string;
}

export const NetworkBackground: React.FC<NetworkBackgroundProps> = ({ className = '' }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Gentle normalized offset between -10 and 10px
      const x = (e.clientX / window.innerWidth - 0.5) * 16;
      const y = (e.clientY / window.innerHeight - 0.5) * 16;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
      {/* Mathematical ambient symbols */}
      <div
        className="absolute top-12 right-12 text-[110px] font-sans font-light text-[#152742]/40 select-none transition-transform duration-700 ease-out"
        style={{ transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)` }}
        aria-hidden="true"
      >
        Σ
      </div>

      <div
        className="absolute top-[42%] left-[28%] text-[90px] font-serif italic text-[#152742]/35 select-none transition-transform duration-700 ease-out"
        style={{ transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)` }}
        aria-hidden="true"
      >
        ∫
      </div>

      <div
        className="absolute bottom-16 right-[35%] text-[70px] font-mono text-[#152742]/25 select-none transition-transform duration-700 ease-out"
        style={{ transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)` }}
        aria-hidden="true"
      >
        π
      </div>

      {/* SVG Network Constellation */}
      <svg
        className="w-full h-full object-cover transition-transform duration-500 ease-out"
        style={{
          transform: `translate(${mousePos.x * 0.6}px, ${mousePos.y * 0.6}px)`,
        }}
        viewBox="0 0 1000 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Subtle cyan glow for active nodes */}
          <radialGradient id="cyanHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#14b8a6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0f766e" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="blueGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.2" />
          </radialGradient>

          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Faint dashed orbital arc */}
        <path
          d="M 680 780 C 820 650, 930 450, 890 240 C 850 60, 680 -50, 520 -20"
          stroke="#162b47"
          strokeWidth="1.2"
          strokeDasharray="6 6"
          opacity="0.65"
        />

        <path
          d="M 400 920 C 580 840, 780 720, 880 500"
          stroke="#13243c"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.4"
        />

        {/* Network connection lines */}
        {/* Node 1 (cyan glow top-left) to Node 2 (blue top) */}
        <line x1="220" y1="280" x2="580" y2="150" stroke="#163255" strokeWidth="1.5" />
        {/* Node 2 to Node 3 (top right) */}
        <line x1="580" y1="150" x2="840" y2="215" stroke="#163255" strokeWidth="1.5" />
        {/* Node 3 to Node 5 (middle-right cyan glow) */}
        <line x1="840" y1="215" x2="775" y2="535" stroke="#163255" strokeWidth="1.5" />
        {/* Node 1 to Node 4 (center blue) */}
        <line x1="220" y1="280" x2="440" y2="450" stroke="#163255" strokeWidth="1.5" />
        {/* Node 4 to Node 5 (middle-right cyan glow) */}
        <line x1="440" y1="450" x2="775" y2="535" stroke="#163255" strokeWidth="1.5" />
        {/* Node 4 to Node 6 (lower blue) */}
        <line x1="440" y1="450" x2="630" y2="785" stroke="#163255" strokeWidth="1.5" />
        {/* Node 5 to Node 7 (bottom-right cyan glow) */}
        <line x1="775" y1="535" x2="910" y2="870" stroke="#163255" strokeWidth="1.5" />
        {/* Node 6 to Node 7 */}
        <line x1="630" y1="785" x2="910" y2="870" stroke="#163255" strokeWidth="1.5" />
        {/* Node 6 to Node 8 (bottom blue) */}
        <line x1="630" y1="785" x2="370" y2="950" stroke="#163255" strokeWidth="1.5" />

        {/* Secondary faint branches to give depth */}
        <line x1="580" y1="150" x2="680" y2="-20" stroke="#132640" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="840" y1="215" x2="990" y2="180" stroke="#132640" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="775" y1="535" x2="990" y2="510" stroke="#132640" strokeWidth="1" strokeDasharray="3 3" />

        {/* Nodes */}

        {/* Node 1: Prominent Cyan Halo Node (top-left of constellation: 220, 280) */}
        <g className="animate-pulse" style={{ animationDuration: '4s' }}>
          <circle cx="220" cy="280" r="28" fill="url(#cyanHalo)" />
          <circle cx="220" cy="280" r="14" stroke="#2dd4bf" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
          <circle cx="220" cy="280" r="8" fill="#2dd4bf" filter="url(#softGlow)" />
          <circle cx="220" cy="280" r="3" fill="#ffffff" />
        </g>

        {/* Node 2: Top Blue Node (580, 150) */}
        <g>
          <circle cx="580" cy="150" r="6" fill="#38bdf8" />
          <circle cx="580" cy="150" r="12" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.25" fill="none" />
        </g>

        {/* Node 3: Top-Right Small Teal/Blue Node (840, 215) */}
        <g>
          <circle cx="840" cy="215" r="5" fill="#22d3ee" />
        </g>

        {/* Node 4: Center Blue Node (440, 450) */}
        <g>
          <circle cx="440" cy="450" r="7" fill="#38bdf8" />
          <circle cx="440" cy="450" r="14" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.2" fill="none" />
        </g>

        {/* Node 5: Prominent Middle-Right Cyan Halo Node (775, 535) */}
        <g className="animate-pulse" style={{ animationDuration: '5s' }}>
          <circle cx="775" cy="535" r="32" fill="url(#cyanHalo)" />
          <circle cx="775" cy="535" r="16" stroke="#2dd4bf" strokeWidth="1.5" strokeOpacity="0.45" fill="none" />
          <circle cx="775" cy="535" r="8.5" fill="#2dd4bf" filter="url(#softGlow)" />
          <circle cx="775" cy="535" r="3.5" fill="#ffffff" />
        </g>

        {/* Node 6: Lower Blue Node (630, 785) */}
        <g>
          <circle cx="630" cy="785" r="6" fill="#38bdf8" />
          <circle cx="630" cy="785" r="12" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.25" fill="none" />
        </g>

        {/* Node 7: Prominent Lower-Right Cyan Halo Node (910, 870) */}
        <g className="animate-pulse" style={{ animationDuration: '4.5s' }}>
          <circle cx="910" cy="870" r="30" fill="url(#cyanHalo)" />
          <circle cx="910" cy="870" r="15" stroke="#2dd4bf" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
          <circle cx="910" cy="870" r="8" fill="#2dd4bf" filter="url(#softGlow)" />
          <circle cx="910" cy="870" r="3" fill="#ffffff" />
        </g>

        {/* Node 8: Bottom Blue Node (370, 950) */}
        <g>
          <circle cx="370" cy="950" r="6" fill="#38bdf8" />
        </g>
      </svg>
    </div>
  );
};
