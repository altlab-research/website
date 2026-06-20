export default function Logo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="altlab-logo-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5EC8F3" />
          <stop offset="0.5" stopColor="#6D5EF3" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      <path d="M16 3L29 27H3L16 3Z" fill="url(#altlab-logo-gradient)" />
      <path d="M16 3L16 27H3L16 3Z" fill="white" fillOpacity="0.15" />
    </svg>
  );
}
