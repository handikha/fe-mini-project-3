/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        poppins: "Poppins",
        raleway: "Raleway",
        inter: "Inter",
        belanosima: "Belanosima",
        nunito: "Nunito",
      },
      colors: {
        primary: "#16a34a", //cyan-500
        danger: "#ef4444",
        light: "#cbd5e1", //slate-300
        title: "#334155", //slate-700
        "title-dark": "#cbd5e1", //slate-300
        "light-gray": "#94a3b8", //slate-400
        gray: "#64748b", //slate-500
        "dark-gray": "#475569", //slate-600
      },
    },
  },
  plugins: [],
};
