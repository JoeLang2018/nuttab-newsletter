import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#CBAA5C',
        secondary: '#083759',
      },
    },
  },
  breakpoint: {
    mobileBreakpoint: 'sm' // 这个值等于960
  },
})
