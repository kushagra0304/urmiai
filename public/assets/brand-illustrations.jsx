// Brand illustrations for URMI.AI
// These SVG components can be imported and used throughout the landing page
import React from 'react';

export const BrainWaveIllustration = () => (
  <svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g className="brain-container">
      <path className="brain-path" d="M250 100C290 100 320 130 320 180C320 230 350 250 380 250C410 250 430 220 430 180C430 140 390 90 340 70C290 50 220 60 180 100C140 140 120 200 160 250C200 300 190 350 160 380C130 410 90 400 70 360C50 320 70 270 100 250C130 230 130 210 100 180C70 150 70 110 100 80C130 50 190 50 220 70C250 90 250 120 230 150C210 180 210 210 250 230C290 250 310 210 290 180C270 150 260 140 260 120C260 100 280 100 300 120C320 140 350 130 350 100C350 70 310 50 270 60C230 70 200 100 210 140C220 180 200 210 170 210C140 210 130 180 150 150C170 120 210 110 240 130C270 150 270 190 240 210C210 230 180 210 170 180C160 150 180 120 210 110C240 100 270 120 270 150C270 180 250 200 220 190C190 180 190 150 210 130C230 110 260 120 260 150C260 180 230 190 220 170C210 150 230 140 240 150C250 160 240 170 230 160" stroke="url(#brain-gradient)" strokeWidth="4" strokeLinecap="round"/>
    </g>
    <defs>
      <linearGradient id="brain-gradient" x1="70" y1="70" x2="430" y2="430" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF407C" />
        <stop offset="1" stopColor="#00D1FF" />
      </linearGradient>
    </defs>
  </svg>
);

export const VoiceWaveIllustration = () => (
  <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g className="voice-wave-container">
      <path className="voice-line-1" d="M50 150 Q 100 50, 150 150 Q 200 250, 250 150 Q 300 50, 350 150" stroke="#FF407C" strokeWidth="3" strokeLinecap="round" />
      <path className="voice-line-2" d="M50 150 Q 100 100, 150 150 Q 200 200, 250 150 Q 300 100, 350 150" stroke="#FF407C" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.7" />
      <path className="voice-line-3" d="M50 150 Q 100 120, 150 150 Q 200 180, 250 150 Q 300 120, 350 150" stroke="#FF407C" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.5" />
      <path className="voice-line-4" d="M50 150 Q 100 140, 150 150 Q 200 160, 250 150 Q 300 140, 350 150" stroke="#FF407C" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.3" />
      <circle className="voice-center" cx="200" cy="150" r="20" fill="url(#voice-center-gradient)" />
    </g>
    <defs>
      <radialGradient id="voice-center-gradient" cx="200" cy="150" r="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF407C" />
        <stop offset="1" stopColor="#00D1FF" />
      </radialGradient>
    </defs>
  </svg>
);

export const AbstractShapeIllustration = () => (
  <svg width="600" height="400" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g className="abstract-shape-container">
      <path className="abstract-path-1" d="M100 100 C 150 50, 200 150, 250 100 S 350 50, 400 100 S 500 150, 550 100" stroke="url(#abstract-gradient-1)" strokeWidth="3" strokeLinecap="round" />
      <path className="abstract-path-2" d="M50 150 C 100 100, 150 200, 200 150 S 300 100, 350 150 S 450 200, 500 150" stroke="url(#abstract-gradient-2)" strokeWidth="3" strokeLinecap="round" />
      <path className="abstract-path-3" d="M100 200 C 150 150, 200 250, 250 200 S 350 150, 400 200 S 500 250, 550 200" stroke="url(#abstract-gradient-3)" strokeWidth="3" strokeLinecap="round" />
      <path className="abstract-path-4" d="M50 250 C 100 200, 150 300, 200 250 S 300 200, 350 250 S 450 300, 500 250" stroke="url(#abstract-gradient-4)" strokeWidth="3" strokeLinecap="round" />
      <path className="abstract-path-5" d="M100 300 C 150 250, 200 350, 250 300 S 350 250, 400 300 S 500 350, 550 300" stroke="url(#abstract-gradient-5)" strokeWidth="3" strokeLinecap="round" />
    </g>
    <defs>
      <linearGradient id="abstract-gradient-1" x1="100" y1="100" x2="550" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF407C" />
        <stop offset="1" stopColor="#00D1FF" />
      </linearGradient>
      <linearGradient id="abstract-gradient-2" x1="50" y1="150" x2="500" y2="150" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00D1FF" />
        <stop offset="1" stopColor="#FF407C" />
      </linearGradient>
      <linearGradient id="abstract-gradient-3" x1="100" y1="200" x2="550" y2="200" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF407C" />
        <stop offset="1" stopColor="#00D1FF" />
      </linearGradient>
      <linearGradient id="abstract-gradient-4" x1="50" y1="250" x2="500" y2="250" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00D1FF" />
        <stop offset="1" stopColor="#FF407C" />
      </linearGradient>
      <linearGradient id="abstract-gradient-5" x1="100" y1="300" x2="550" y2="300" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF407C" />
        <stop offset="1" stopColor="#00D1FF" />
      </linearGradient>
    </defs>
  </svg>
);

export const FloatingParticlesIllustration = () => (
  <svg width="800" height="600" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g className="particles-container">
      {Array(30).fill(0).map((_, i) => (
        <circle 
          key={i} 
          className={`particle particle-${i}`} 
          cx={100 + (i * 20) % 600} 
          cy={100 + Math.floor(i / 30) * 100} 
          r={5 + (i % 10)} 
          fill={`rgba(255, 64, 124, ${0.1 + (i % 10) / 10})`} 
        />
      ))}
    </g>
  </svg>
);

export const GlowingOrbIllustration = () => (
  <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g className="orb-container">
      <circle className="orb-glow-outer" cx="150" cy="150" r="140" fill="url(#orb-gradient-outer)" fillOpacity="0.2" />
      <circle className="orb-glow-middle" cx="150" cy="150" r="100" fill="url(#orb-gradient-middle)" fillOpacity="0.4" />
      <circle className="orb-core" cx="150" cy="150" r="60" fill="url(#orb-gradient-core)" />
      <path className="orb-ring" d="M150 50 A 100 100 0 1 1 149 50" stroke="url(#orb-ring-gradient)" strokeWidth="2" strokeLinecap="round" fill="none" />
    </g>
    <defs>
      <radialGradient id="orb-gradient-outer" cx="150" cy="150" r="140" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF407C" />
        <stop offset="1" stopColor="#00D1FF" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="orb-gradient-middle" cx="150" cy="150" r="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF407C" />
        <stop offset="1" stopColor="#00D1FF" stopOpacity="0.3" />
      </radialGradient>
      <radialGradient id="orb-gradient-core" cx="150" cy="150" r="60" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFFFFF" />
        <stop offset="1" stopColor="#FF407C" />
      </radialGradient>
      <linearGradient id="orb-ring-gradient" x1="50" y1="150" x2="250" y2="150" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF407C" />
        <stop offset="1" stopColor="#00D1FF" />
      </linearGradient>
    </defs>
  </svg>
);

export const FuturisticGridIllustration = () => (
  <svg width="600" height="400" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g className="grid-container">
      {/* Horizontal lines */}
      {Array(10).fill(0).map((_, i) => (
        <line 
          key={`h-${i}`} 
          className={`grid-line grid-line-h-${i}`} 
          x1="0" 
          y1={i * 40 + 20} 
          x2="600" 
          y2={i * 40 + 20} 
          stroke="rgba(255, 64, 124, 0.2)" 
          strokeWidth="1" 
        />
      ))}
      
      {/* Vertical lines */}
      {Array(15).fill(0).map((_, i) => (
        <line 
          key={`v-${i}`} 
          className={`grid-line grid-line-v-${i}`} 
          x1={i * 40 + 20} 
          y1="0" 
          x2={i * 40 + 20} 
          y2="400" 
          stroke="rgba(255, 64, 124, 0.2)" 
          strokeWidth="1" 
        />
      ))}
      
      {/* Highlight points */}
      {Array(10).fill(0).map((_, i) => (
        Array(15).fill(0).map((_, j) => (
          <circle 
            key={`p-${i}-${j}`} 
            className={`grid-point grid-point-${i}-${j}`} 
            cx={j * 40 + 20} 
            cy={i * 40 + 20} 
            r={1 + Math.random() * 2} 
            fill={Math.random() > 0.7 ? "#FF407C" : "rgba(255, 64, 124, 0.3)"} 
          />
        ))
      ))}
      
      {/* Highlighted node */}
      <circle className="grid-node grid-node-main" cx="300" cy="200" r="10" fill="#FF407C" />
      <circle className="grid-node-glow" cx="300" cy="200" r="20" fill="rgba(255, 64, 124, 0.3)" />
    </g>
  </svg>
);

export const AIProfileIllustration = () => (
  <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g className="ai-profile-container">
      <circle className="ai-profile-bg" cx="200" cy="200" r="150" fill="url(#ai-profile-gradient)" />
      <circle className="ai-profile-ring" cx="200" cy="200" r="170" stroke="#FF407C" strokeWidth="2" strokeDasharray="10 5" fill="none" />
      
      {/* AI Face Abstract */}
      <circle className="ai-face" cx="200" cy="160" r="60" fill="rgba(255, 255, 255, 0.9)" />
      <circle className="ai-eye-left" cx="175" cy="150" r="10" fill="#161616" />
      <circle className="ai-eye-right" cx="225" cy="150" r="10" fill="#161616" />
      <path className="ai-smile" d="M170 180 Q 200 210, 230 180" stroke="#161616" strokeWidth="3" strokeLinecap="round" fill="none" />
      
      {/* Data Flow Lines */}
      <path className="ai-data-flow-1" d="M80 150 C 100 100, 150 100, 170 150" stroke="#FF407C" strokeWidth="2" strokeDasharray="4 2" />
      <path className="ai-data-flow-2" d="M320 150 C 300 100, 250 100, 230 150" stroke="#FF407C" strokeWidth="2" strokeDasharray="4 2" />
      <path className="ai-data-flow-3" d="M200 250 L 200 350" stroke="#FF407C" strokeWidth="2" strokeDasharray="4 2" />
      
      {/* Circuit Board Patterns */}
      <path className="ai-circuit-1" d="M120 250 H 280 V 300 H 200 V 320" stroke="#00D1FF" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path className="ai-circuit-2" d="M100 200 H 150 V 270 H 180" stroke="#00D1FF" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path className="ai-circuit-3" d="M300 200 H 250 V 270 H 220" stroke="#00D1FF" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      
      {/* Small Nodes */}
      <circle className="ai-node-1" cx="150" cy="270" r="5" fill="#00D1FF" />
      <circle className="ai-node-2" cx="250" cy="270" r="5" fill="#00D1FF" />
      <circle className="ai-node-3" cx="200" cy="320" r="5" fill="#00D1FF" />
    </g>
    <defs>
      <radialGradient id="ai-profile-gradient" cx="200" cy="200" r="150" gradientUnits="userSpaceOnUse">
        <stop stopColor="#161616" />
        <stop offset="0.8" stopColor="#161616" />
        <stop offset="1" stopColor="#FF407C" stopOpacity="0.5" />
      </radialGradient>
    </defs>
  </svg>
); 