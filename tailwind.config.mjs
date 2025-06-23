/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}", // app router
        "./pages/**/*.{js,ts,jsx,tsx}", // optional
        "./components/**/*.{js,ts,jsx,tsx}", // optional
    ],
    theme: {
        extend: {
        keyframes: {
            scroll: {
            "0%, 100%": { transform: "translateY(0)", opacity: "1" },
            "50%": { transform: "translateY(8px)", opacity: "0.5" },
            },
        },
        fontFamily: {
            dancing: ["var(--font-dancing-script)", "cursive"],
            geist: ["var(--font-geist-mono)", "monospace"],
        },
        },
    },
    plugins: [],
};
