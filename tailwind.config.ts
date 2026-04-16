import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Here are the colors from your logo!
        lokayanDeepBlue: "#0a1c43", // The main deep blue
        lokayanRed: "#ed1c24", // The bright red
      },
    },
  },
  plugins: [],
};
export default config;