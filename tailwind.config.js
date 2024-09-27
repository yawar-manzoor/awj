/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            spacing: {
                24: '85px',
            },
            backgroundImage: {
                'custom-gradient-bottom-right':
                    'linear-gradient(155deg, rgba(255, 237, 189, 0) 38%, rgba(255, 237, 189, 0.24) 70.96%)',
            },
            colors: {
                primary: {
                    Main: 'var(--primary-color)',
                    input: 'var(--primary-input)',
                    50: 'var(--primary50)',
                    100: 'var(--primary100)',
                    200: 'var(--primary200)',
                    300: 'var(--primary300)',
                    400: 'var(--primary400)',
                    500: 'var(--primary500)',
                    600: 'var(--primary600)',
                    700: 'var(--primary700)',
                    800: 'var(--primary800)',
                },
                neutral: {
                    50: 'var(--neutral50)',
                    400: 'var(--neutral400)',
                    500: 'var(--neutral500)',
                    600: 'var(--neutral600)',
                    700: 'var(--neutral700)',
                    800: 'var(--neutral800)',
                },
                primaryYellow: {
                    100: 'var(--primary-yellow200)',
                    500: 'var(--primary-yellow)',
                },
                primaryGreen: {
                    200: 'var(--primary-green200)',
                    300: 'var(--primary-green300)',
                },
                secondary: 'var(--secondary)',
                secondary500: 'var(--secondary500)',
                success: 'var(--success)',
                warning: 'var(--warning)',
            },
            screens: {
                xl: '1200px',
                '2xl': '1400px',
                '3xl': '1500px',
                '4xl': '2200px', // Adjust the pixel value to your desired breakpoint
            },
            content: {
                link: 'url("assets/Arrow.svg")',
            },
        },
    },
    plugins: [],
}
