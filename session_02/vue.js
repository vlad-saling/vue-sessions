Vue.component('color-item', {
  props: {
    color: ''
  },
  template: '<li><span v-bind:style="{color: color }">{{ color }}</span></li>'
})

const app = new Vue({
  el: '#app',
  data: {
    colors: ['blue', 'green', 'red'],
    newColor: ''
  },
  methods: {
     addColor: function() {
      if (this.newColor != "") {
         this.colors.push(this.newColor)
      }
    }
  }
})
  
  
  
  