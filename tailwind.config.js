
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
            },
            colors: {
                bg: {
                    primary: '#0a0a0c',
                    secondary: '#141417',
                    tertiary: '#1c1c21',
                },
            }
        },
    },
    plugins: [],
}
