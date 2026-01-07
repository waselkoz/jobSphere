export default {
    darkMode: 'selector',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Custom colors for the "stylish" look
                primary: '#4f46e5', // Indigo-600
                secondary: '#9333ea', // Purple-600
                dark: '#0f172a', // Slate-900
                light: '#f8fafc', // Slate-50
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
