import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        alert: {
          info: "hsl(var(--alert-info))",
          error: "hsl(var(--alert-error))",
          warning: "hsl(var(--alert-warning))",
          success: "hsl(var(--alert-success))",
        },
      },
      boxShadow: {
        sm: "0 1px 3px 0 hsla(var(--box-shadow) / 10%), 0 1px 2px -1px hsla(var(--box-shadow) / 10%)",
        md: "0 4px 6px -1px hsla(var(--box-shadow) / 10%), 0 2px 4px -2px hsla(var(--box-shadow) / 10%)",
        lg: "0 10px 15px -3px hsla(var(--box-shadow) / 10%), 0 4px 6px -4px hsla(var(--box-shadow) / 10%)",
      },
      borderRadius: {
        sm: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
      },
    },
  },
  plugins: [],
};

export default config;
