export function HeroNetworkStars() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -top-12 z-0 flex items-start justify-center overflow-hidden opacity-20 [mask-image:radial-gradient(ellipse_80%_65%_at_50%_35%,black_35%,transparent_85%)]"
    >
      {/* Smooth ambient gradient back-glow */}
      <div className="absolute top-0 h-[680px] w-full max-w-6xl rounded-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/40 via-cyan-400/25 to-indigo-500/10 blur-3xl" />

      {/* Network Constellation Stars SVG */}
      <svg
        className="relative h-[780px] w-full max-w-7xl"
        viewBox="0 0 1280 720"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Smooth line gradients */}
          <linearGradient id="netLineGrad1" x1="10%" y1="10%" x2="90%" y2="90%">
            <stop offset="0%" stopColor="#004ac6" />
            <stop offset="50%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>

          <linearGradient id="netLineGrad2" x1="90%" y1="20%" x2="10%" y2="80%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          <linearGradient id="netLineGradH" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2" />
            <stop offset="30%" stopColor="#004ac6" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#818cf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.2" />
          </linearGradient>

          {/* Star Radial Halo Glows */}
          <radialGradient id="starGlowCyan" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="1" />
            <stop offset="40%" stopColor="#0ea5e9" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="starGlowBlue" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="1" />
            <stop offset="45%" stopColor="#004ac6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="starGlowViolet" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="1" />
            <stop offset="45%" stopColor="#818cf8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#4338ca" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Constellation Network Mesh Lines (Left Cluster) */}
        <g stroke="url(#netLineGrad1)" strokeWidth="1" strokeDasharray="3 3">
          <line x1="120" y1="180" x2="220" y2="120" />
          <line x1="220" y1="120" x2="310" y2="190" />
          <line x1="310" y1="190" x2="240" y2="280" />
          <line x1="240" y1="280" x2="120" y2="180" />
          <line x1="220" y1="120" x2="240" y2="280" />
          <line x1="310" y1="190" x2="420" y2="140" />
          <line x1="240" y1="280" x2="350" y2="340" />
          <line x1="350" y1="340" x2="420" y2="140" />
        </g>

        {/* 2. Constellation Network Mesh Lines (Center-Left to Center-Right Bridge) */}
        <g stroke="url(#netLineGradH)" strokeWidth="1.2">
          <line x1="310" y1="190" x2="520" y2="110" />
          <line x1="420" y1="140" x2="640" y2="80" />
          <line x1="640" y1="80" x2="760" y2="130" />
          <line x1="760" y1="130" x2="880" y2="100" />
          <line x1="880" y1="100" x2="980" y2="170" />
        </g>

        {/* 3. Constellation Network Mesh Lines (Right Cluster) */}
        <g stroke="url(#netLineGrad2)" strokeWidth="1" strokeDasharray="3 3">
          <line x1="980" y1="170" x2="1080" y2="110" />
          <line x1="1080" y1="110" x2="1170" y2="190" />
          <line x1="1170" y1="190" x2="1060" y2="270" />
          <line x1="1060" y1="270" x2="980" y2="170" />
          <line x1="1080" y1="110" x2="1060" y2="270" />
          <line x1="980" y1="170" x2="910" y2="310" />
          <line x1="910" y1="310" x2="1060" y2="270" />
          <line x1="1170" y1="190" x2="1220" y2="290" />
          <line x1="1060" y1="270" x2="1220" y2="290" />
        </g>

        {/* 4. Secondary Subtle Connections */}
        <g stroke="url(#netLineGrad1)" strokeWidth="0.75" strokeOpacity="0.6">
          <line x1="160" y1="360" x2="240" y2="280" />
          <line x1="350" y1="340" x2="480" y2="390" />
          <line x1="760" y1="130" x2="820" y2="240" />
          <line x1="820" y1="240" x2="910" y2="310" />
          <line x1="820" y1="240" x2="980" y2="170" />
          <line x1="1060" y1="270" x2="1130" y2="370" />
        </g>

        {/* 5. Network Star Halos & Star Glows */}
        <g>
          {/* Key Major Star Nodes with Halos */}
          <circle cx="220" cy="120" r="14" fill="url(#starGlowCyan)" />
          <circle cx="310" cy="190" r="16" fill="url(#starGlowBlue)" />
          <circle cx="640" cy="80" r="18" fill="url(#starGlowCyan)" />
          <circle cx="760" cy="130" r="15" fill="url(#starGlowViolet)" />
          <circle cx="980" cy="170" r="16" fill="url(#starGlowBlue)" />
          <circle cx="1080" cy="110" r="15" fill="url(#starGlowCyan)" />
          <circle cx="1060" cy="270" r="14" fill="url(#starGlowViolet)" />
          <circle cx="240" cy="280" r="14" fill="url(#starGlowBlue)" />
        </g>

        {/* 6. Diamond Star Sparkles (Bintang Jaringan dengan 4-Point Flares) */}
        <g fill="#38bdf8" className="animate-star-twinkle-1">
          {/* Star at (640, 80) Top Center */}
          <path d="M 640 68 Q 640 80 628 80 Q 640 80 640 92 Q 640 80 652 80 Q 640 80 640 68 Z" fill="#38bdf8" />
          {/* Star at (220, 120) Left Anchor */}
          <path d="M 220 112 Q 220 120 212 120 Q 220 120 220 128 Q 220 120 228 120 Q 220 120 220 112 Z" fill="#60a5fa" />
          {/* Star at (1080, 110) Right Anchor */}
          <path d="M 1080 102 Q 1080 110 1072 110 Q 1080 110 1080 118 Q 1080 110 1088 110 Q 1080 110 1080 102 Z" fill="#60a5fa" />
        </g>

        <g fill="#818cf8" className="animate-star-twinkle-2">
          {/* Star at (760, 130) */}
          <path d="M 760 123 Q 760 130 753 130 Q 760 130 760 137 Q 760 130 767 130 Q 760 130 760 123 Z" fill="#c084fc" />
          {/* Star at (310, 190) */}
          <path d="M 310 183 Q 310 190 303 190 Q 310 190 310 197 Q 310 190 317 190 Q 310 190 310 183 Z" fill="#38bdf8" />
          {/* Star at (980, 170) */}
          <path d="M 980 163 Q 980 170 973 170 Q 980 170 980 177 Q 980 170 987 170 Q 980 170 980 163 Z" fill="#38bdf8" />
        </g>

        <g fill="#38bdf8" className="animate-star-twinkle-3">
          {/* Star at (240, 280) */}
          <path d="M 240 273 Q 240 280 233 280 Q 240 280 240 287 Q 240 280 247 280 Q 240 280 240 273 Z" fill="#60a5fa" />
          {/* Star at (1060, 270) */}
          <path d="M 1060 263 Q 1060 270 1053 270 Q 1060 270 1060 277 Q 1060 270 1067 270 Q 1060 270 1060 263 Z" fill="#c084fc" />
          {/* Star at (420, 140) */}
          <path d="M 420 134 Q 420 140 414 140 Q 420 140 420 146 Q 420 140 426 140 Q 420 140 420 134 Z" fill="#38bdf8" />
        </g>

        {/* 7. Star Network Nodes (Solid Circular Points) */}
        <g fill="#ffffff">
          {/* Primary Nodes with crisp white core and color ring */}
          <circle cx="220" cy="120" r="3" stroke="#0ea5e9" strokeWidth="1.5" />
          <circle cx="310" cy="190" r="3.5" stroke="#004ac6" strokeWidth="1.5" />
          <circle cx="240" cy="280" r="2.5" stroke="#0ea5e9" strokeWidth="1.5" />
          <circle cx="120" cy="180" r="2" stroke="#004ac6" strokeWidth="1" />
          <circle cx="420" cy="140" r="2.5" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="350" cy="340" r="2" stroke="#818cf8" strokeWidth="1" />
          <circle cx="520" cy="110" r="2.5" stroke="#0ea5e9" strokeWidth="1" />
          <circle cx="640" cy="80" r="4" stroke="#0ea5e9" strokeWidth="2" />
          <circle cx="760" cy="130" r="3.5" stroke="#818cf8" strokeWidth="1.5" />
          <circle cx="820" cy="240" r="2.5" stroke="#6366f1" strokeWidth="1" />
          <circle cx="880" cy="100" r="2.5" stroke="#38bdf8" strokeWidth="1" />
          <circle cx="980" cy="170" r="3.5" stroke="#004ac6" strokeWidth="1.5" />
          <circle cx="910" cy="310" r="2" stroke="#818cf8" strokeWidth="1" />
          <circle cx="1080" cy="110" r="3" stroke="#0ea5e9" strokeWidth="1.5" />
          <circle cx="1060" cy="270" r="3" stroke="#818cf8" strokeWidth="1.5" />
          <circle cx="1170" cy="190" r="2.5" stroke="#004ac6" strokeWidth="1" />
          <circle cx="1220" cy="290" r="2" stroke="#38bdf8" strokeWidth="1" />
          <circle cx="160" cy="360" r="2" stroke="#0ea5e9" strokeWidth="1" />
          <circle cx="480" cy="390" r="2" stroke="#818cf8" strokeWidth="1" />
          <circle cx="1130" cy="370" r="2" stroke="#6366f1" strokeWidth="1" />
        </g>

        {/* 8. Fine Distant Star Dust (Small subtle dots across the sky) */}
        <g fill="#0ea5e9" opacity="0.75">
          <circle cx="80" cy="90" r="1" />
          <circle cx="180" cy="60" r="1.2" />
          <circle cx="270" cy="70" r="1" />
          <circle cx="380" cy="80" r="1.2" />
          <circle cx="460" cy="180" r="1" />
          <circle cx="580" cy="140" r="1.2" />
          <circle cx="700" cy="60" r="1" />
          <circle cx="840" cy="70" r="1.2" />
          <circle cx="930" cy="50" r="1" />
          <circle cx="1030" cy="70" r="1.2" />
          <circle cx="1140" cy="120" r="1" />
          <circle cx="1240" cy="140" r="1.2" />
          <circle cx="150" cy="250" r="1" />
          <circle cx="380" cy="260" r="1.2" />
          <circle cx="870" cy="210" r="1" />
          <circle cx="1190" cy="240" r="1.2" />
        </g>

        <g fill="#818cf8" opacity="0.65">
          <circle cx="130" cy="130" r="1" />
          <circle cx="320" cy="100" r="1.2" />
          <circle cx="490" cy="60" r="1" />
          <circle cx="610" cy="190" r="1.2" />
          <circle cx="720" cy="170" r="1" />
          <circle cx="800" cy="100" r="1.2" />
          <circle cx="1010" cy="130" r="1" />
          <circle cx="1110" cy="170" r="1.2" />
          <circle cx="1210" cy="80" r="1" />
          <circle cx="280" cy="320" r="1.2" />
          <circle cx="950" cy="350" r="1" />
        </g>
      </svg>
    </div>
  );
}
