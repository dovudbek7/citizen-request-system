import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#f4f7fb",
        foreground: "#162033",
        card: "#ffffff",
        primary: {
          DEFAULT: "#0b4ea2",
          foreground: "#f8fbff",
        },
        secondary: {
          DEFAULT: "#0d7e8f",
          foreground: "#f3feff",
        },
        accent: {
          DEFAULT: "#d7ebff",
          foreground: "#0a2e62",
        },
        muted: {
          DEFAULT: "#e9eef5",
          foreground: "#58667f",
        },
        border: "#d7dfeb",
        input: "#d7dfeb",
        ring: "#48c8e8",
        online: "#10b981",
        offline: "#94a3b8",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Public Sans", "sans-serif"],
      },
      boxShadow: {
        // Shadows removed - using clean flat design
      },
      backgroundImage: {
        mesh: "radial-gradient(circle at 0% 0%, rgba(11,78,162,0.16), transparent 28%), radial-gradient(circle at 100% 0%, rgba(72,200,232,0.18), transparent 30%), radial-gradient(circle at 50% 100%, rgba(18,44,94,0.12), transparent 32%)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      keyframes: {
        "pulse-soft": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(16,185,129,0.25)" },
          "50%": { boxShadow: "0 0 0 12px rgba(16,185,129,0)" },
        },
      },
      animation: {
        "pulse-soft": "pulse-soft 2.4s ease-out infinite",
      },
    },
  },
  plugins: [],
}

export default config
