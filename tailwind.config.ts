import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0f",
        surface: {
          DEFAULT: "#12121a",
          tier2: "#1a1a24",
          tier3: "#222230",
          hover: "#191b24",
        },
        border: {
          subtle: "#262638",
          hover: "#4d9fff66",
        },
        accent: {
          primary: "#4d9fff",
          "primary-hover": "#6bb0ff",
          secondary: "#00ff9d",
          warn: "#ffb454",
        },
        text: {
          primary: "#e6e6ef",
          secondary: "#8b8d9a",
          muted: "#5a5a70",
        },
      },
      fontFamily: {
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 24px rgba(77, 159, 255, 0.12)",
        "glow-green": "0 0 12px rgba(0, 255, 157, 0.25)",
        "glow-blue": "0 0 12px rgba(77, 159, 255, 0.35)",
        card: "0 4px 20px -4px rgba(0, 0, 0, 0.7)",
      },
      animation: {
        blink: "blink 1s step-end infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
