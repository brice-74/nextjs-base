module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      body: ["Poppins", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        'gradient-radial-to-tr': 'radial-gradient(circle at top right, var(--tw-gradient-stops))',
        'gradient-radial-to-tl': 'radial-gradient(circle at top left, var(--tw-gradient-stops))',
        'gradient-radial-to-br': 'radial-gradient(circle at bottom right, var(--tw-gradient-stops))',
        'gradient-radial-to-bl': 'radial-gradient(circle at bottom left, var(--tw-gradient-stops))',
      },

      colors: {
        'th-primary-dark': 'var(--primary-dark)',
        'th-primary': 'var(--primary)',
        'th-secondary': 'var(--secondary)',
        'th-tertiary': 'var(--tertiary)',

        'th-success': 'var(--success)',
        'th-success-light': 'var(--success-light)',
        'th-warning': 'var(--warning)',
        'th-warning-light': 'var(--warning-light)',
        'th-danger': 'var(--danger)',
        'th-danger-light': 'var(--danger-light)',

        'th-light-1-op': 'var(--light-1-op)',
        'th-light-1': 'var(--light-1)',
        'th-medium-1': 'var(--medium-1)',
        'th-dark-1': 'var(--dark-1)',
      },

    }
  },
  variants: {
  },
  plugins: [],
};