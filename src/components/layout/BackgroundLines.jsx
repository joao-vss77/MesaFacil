/** Grafismo decorativo de fundo. */
export default function BackgroundLines() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-50" aria-hidden="true">
      <svg viewBox="0 0 1400 800" fill="none" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <path
          d="M1080 -60 L1400 320 M900 820 L1400 200 M-40 700 L420 520 L560 640"
          stroke="#c3c5ae"
          strokeWidth="1"
        />
        <circle cx="180" cy="700" r="160" stroke="#c3c5ae" strokeWidth="1" />
      </svg>
    </div>
  );
}
