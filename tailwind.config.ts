import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      content: {
        "[]": "''",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundSize: {
        "800%": "800%",
      },
      backgroundPosition: {
        "50%": "0% 50%",
        "100%": "100% 50%",
      },
      animation: {
        "spin-slow": "spin 60s linear infinite",
        gradient: "gradient 15s ease infinite",
      },
      keyframes: {
        gradient: {
          "0%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
          "100%": {
            backgroundPosition: "0% 50%",
          },
        },
      },
      colors: {
        primary: {
          cyan: "#41ABC2",
          blue: "#EBF7FF",
          red: "#FF715B",
          orange: "#FFA400",
          brown: "#333333",
        },
      },
    },
  },
  plugins: [],
};
export default config;
