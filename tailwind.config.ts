import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0A0A",
          50: "#141414",
          100: "#181818",
          200: "#1f1f1f",
        },
        accent: {
          violet: "#7C5CFF",
          indigo: "#5B8CFF",
          cyan: "#3DE0E0",
          magenta: "#FF5CAA",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.06em",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        "gradient-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        "hero-rise": {
          from: { opacity: "0", transform: "scale(0.5) translateY(30px)" },
          to: { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        "hero-fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "hero-title-in": {
          from: {
            opacity: "0",
            transform: "translateY(28px)",
            filter: "blur(12px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
            filter: "blur(0)",
          },
        },
        "hero-pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.5" },
          "50%": { transform: "scale(1.15)", opacity: "0.85" },
        },
        "hero-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "gradient-pan": "gradient-pan 12s ease infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s infinite",
        "spin-slow": "spin-slow 24s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
