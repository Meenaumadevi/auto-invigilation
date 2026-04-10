/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#6366f1", // Indigo 500
                secondary: "#8b5cf6", // Violet 500
                dark: "#0f172a", // Slate 900
                darkcard: "#1e293b", // Slate 800
                success: "#22c55e",
                warning: "#eab308",
                danger: "#ef4444",
            }
        },
    },
    plugins: [],
}
