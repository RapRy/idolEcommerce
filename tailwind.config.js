module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'ubuntu': ['Ubuntu', 'sans-serif']
    },
    extend: {
      gridTemplateColumns: {
        'customGrid': '1fr auto auto'
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