/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Roboto", "system-ui", "-apple-system", "sans-serif"],
			},
			colors: {
				"forest-green": "#059669",
				"deep-green": "#047857",
				"lime-fresh": "#65a30d",
				emerald: "#10b981",
				"green-bg": "#f0fdf4",
			},
			borderRadius: {
				"2xl": "1rem",
				"3xl": "1.5rem",
			},
			boxShadow: {
				soft: "0 4px 6px -1px rgba(5, 150, 105, 0.1), 0 2px 4px -1px rgba(5, 150, 105, 0.06)",
				forest: "0 10px 25px -5px rgba(5, 150, 105, 0.2), 0 8px 10px -6px rgba(5, 150, 105, 0.1)",
				"forest-lg": "0 20px 40px -10px rgba(5, 150, 105, 0.3), 0 10px 15px -5px rgba(5, 150, 105, 0.15)",
			},
			animation: {
				float: "float 3s ease-in-out infinite",
				"pulse-glow": "pulse-glow 2s ease-in-out infinite",
			},
		},
	},
	plugins: [],
};
