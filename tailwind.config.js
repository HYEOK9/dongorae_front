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
        screens: {
            "2xl": { max: "1535px" },
            // => @media (max-width: 1535px) { ... }

            xl: { max: "1279px" },
            // => @media (max-width: 1279px) { ... }

            lg: { max: "1023px" },
            // => @media (max-width: 1023px) { ... }

            md: { max: "767px" },
            // => @media (max-width: 767px) { ... }

            sm: { max: "639px" },
            // => @media (max-width: 639px) { ... }

            xs: { max: "639px" },
            // => @media (max-width: 480px) { ... }
        },
        plugins: [],
    },
};
