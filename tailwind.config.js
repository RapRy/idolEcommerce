module.exports = {
  purge: {
    enabled: true,
    content: [
      './src/**/*.js',
      './src/**/*.jsx'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'ubuntu': ['Ubuntu', 'sans-serif']
    },
    extend: {
      gridTemplateColumns: {
        'customGrid': '1fr auto auto',
        'customGrid2': '1fr auto'
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['hover'],
      borderRadius: ['hover'],
      scale: ['hover'],
      translate: ['hover']
    },
  },
  plugins: [],
}
