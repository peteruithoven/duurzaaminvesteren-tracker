import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          100: "rgb(245 252 249)",
          300: "rgb(80 205 180)",
          700: "rgb(0 75 70)",
        },
      },
      boxShadow: {
        "3xl": "0 0 40px rgba(0, 75, 70, .1)",
      },
    },
  },
  plugins: [],
};
export default config;
