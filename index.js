tailwind.config = {
    theme: {
        extend: {
            colors: {
                'hn-dark': '#111111',
                'hn-blue': '#1F57A5',
                'hn-bg': '#F0F0EE',
            },
            fontFamily: {
                'fabrikat': ['Fabrikat', 'sans-serif'],
                'freight': ['Freight Medium', 'serif'],
            }
        }
    },
    corePlugins: {
        preflight: false,
    }
}