import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        input: {
          light: colors.zinc[100],
          dark: colors.zinc[900],
        },
        main: {
          light: colors.zinc[400],
          dark: colors.zinc[950],
        },
        container: {
          light: colors.zinc[300],
          dark: colors.zinc[800],
        },
        display: {
          light: colors.zinc[700],
          dark: colors.zinc[900],
        },
        primary: {
          light: colors.blue[500],
          dark: colors.blue[500],
          text: {
            light: colors.zinc[50],
            dark: colors.zinc[50],
          },
          hover: {
            light: colors.blue[400],
            dark: colors.blue[400],
            text: {
              light: colors.zinc[50],
              dark: colors.zinc[50],
            },
          },
          active: {
            light: colors.blue[600],
            dark: colors.blue[600],
            text: {
              light: colors.zinc[50],
              dark: colors.zinc[50],
            },
          },
        },
        secondary: {
          light: colors.zinc[50],
          dark: colors.zinc[600],
          text: {
            light: colors.zinc[900],
            dark: colors.zinc[50],
          },
          hover: {
            light: colors.zinc[500],
            dark: colors.zinc[500],
            text: {
              light: colors.zinc[50],
              dark: colors.zinc[50],
            },
          },
          active: {
            light: colors.zinc[400],
            dark: colors.zinc[700],
            text: {
              light: colors.zinc[50],
              dark: colors.zinc[50],
            },
          },
        },
        info: {
          primary: colors.red[500],
          button: {
            primary: colors.red[600],
            hover: colors.red[400],
          },
        },
        warning: colors.red[500],
        light: colors.zinc[900],
        dark: colors.zinc[50],
      },
    },
  },
  plugins: [],
};
export default config;
