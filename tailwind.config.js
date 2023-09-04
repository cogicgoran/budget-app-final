/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          "success-primary": "#60a917",
          "success-secondary": "#2d7600",
          "info-primary": "#1a4e5b",
          "info-secondary": "#314354",
          "fail-primary": "#fad9d5",
          "fail-secondary": "#ae4132",
          "create-primary": "#b1ddf0",
          "create-secondary": "#10739e",
        },
        fontSize: {
          xss: "11px",
        },
      },
    },
    plugins: [],
  };
  