import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#0A0F1C",
        surface: "#141B2D",
        border: "#1E293B",
        primary: "#3B82F6",
        textSecondary: "#94A3B8",
      },
    },
  },
  plugins: [],
};
export default config;
