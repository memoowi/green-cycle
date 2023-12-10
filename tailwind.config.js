import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            keyframes: {
                slideup: {
                    '0%,10%, 100%': {  transform: 'translateY(0)' },
                    '40%,50%': { transform: 'translateY(-8rem)' },
                    '70%, 80%': { transform: 'translateY(-16rem)' },
                },
            },
            animation: {
                slideup: 'slideup 8s ease-in-out infinite',
            },
        },
    },

    plugins: [forms],
};
