
# Vue 02: Vuex

## Starter code

```HTML
<div id="app">
  <input v-model="newColor" type="text">
  <button v-on:click="addColor">add color</button>
  
  <ul>
    <color-item v-for="color in colors" v-bind:color="color"></color-item>
  </ul>
</div>
```

```JS

Vue.component('color-item', {
  props: {
    color: ''
  },
  template: '<li><span v-bind:style="{color: color }">{{ color }}</span></li>'
})

const app = new Vue({
  el: '#app',
  store,
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
```

## Store definition

## Getters

## Mutators

## Actions
