import type { Config } from "tailwindcss";

const withVar = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`;

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: withVar("--c-bg"),
        surface: withVar("--c-surface"),
        surface2: withVar("--c-surface2"),
        ink: withVar("--c-ink"),
        muted: withVar("--c-muted"),
        line: withVar("--c-line"),
        blue: "#0A84FF",
        sky: "#4FA9FF",
        indigo: "#2F5BFB",
        violet: "#6C2BFB",
        deep: "#4B18B8",
        dentista: withVar("--c-dentista"),
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "var(--font-arabic)",
          "system-ui",
          "sans-serif",
        ],
        display: [
          "var(--font-display)",
          "var(--font-arabic)",
          "var(--font-sans)",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        glow: "0 0 24px rgba(47,91,251,.25), 0 0 64px rgba(108,43,251,.15)",
        "glow-sm": "0 0 14px rgba(10,132,255,.35)",
        "glow-dentista":
          "0 0 14px rgb(var(--c-dentista) / .55), 0 0 36px rgb(var(--c-dentista) / .25)",
        card: "0 8px 32px rgba(2,6,18,.45)",
      },
      backgroundImage: {
        brand: "linear-gradient(90deg,#0A84FF 0%,#2F5BFB 45%,#6C2BFB 100%)",
        "brand-soft":
          "linear-gradient(135deg,rgba(10,132,255,.14),rgba(108,43,251,.14))",
        "dentista-brand":
          "linear-gradient(90deg, rgb(var(--c-dentista)), #2F5BFB)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseDot: {
          "0%": { transform: "scale(.85)", opacity: "0.65" },
          "50%": { transform: "scale(1.15)", opacity: "1" },
          "100%": { transform: "scale(.85)", opacity: "0.65" },
        },
        dash: {
          "0%": { strokeDashoffset: "240" },
          "100%": { strokeDashoffset: "0" },
        },
        travel: {
          "0%": { offsetDistance: "0%", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { offsetDistance: "100%", opacity: "0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseDot: "pulseDot 2.4s ease-in-out infinite",
        dash: "dash 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
