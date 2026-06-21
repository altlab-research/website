import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#5EC8F3" />
              <stop offset="0.5" stopColor="#6D5EF3" />
              <stop offset="1" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
          <path d="M16 3L29 27H3L16 3Z" fill="url(#g)" />
          <path d="M16 3L16 27H3L16 3Z" fill="white" fillOpacity="0.15" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
