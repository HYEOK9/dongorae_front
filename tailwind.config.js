/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: { labelUp: "labelUp 0.2s ease forwards" },
            keyframes: {
                labelUp: {
                    "0%": { transform: "translateY(0)" },
                    "100%": { transform: "translateY(-150%)" },
                },
            },
        },
    },
    plugins: [],
};
