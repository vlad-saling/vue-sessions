
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

```JS
const store = new Vuex.Store({
  state: {
    colors: ['blue', 'green', 'red']
  }
})
```

Referencing the store

```JS
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
    },
    returnStore: function() {
      console.log(this.$store.state.colors)
    }
  },
  created: function() {
    this.returnStore()
  }
})
```

Loading data from the store

```JS
const app = new Vue({
  el: '#app',
  store,
  data: {
    colors: [],
    newColor: ''
  },
  methods: {
     addColor: function() {
      if (this.newColor != "") {
         this.colors.push(this.newColor)
      }
    },
    loadColorsFromStore: function() {
      this.colors = this.$store.state.colors
    }
  },
  created: function() {
    this.loadColorsFromStore()
  }
})
```

## Getters

```JS
const store = new Vuex.Store({
  state: {
    colors: ['blue', 'green', 'red']
  },
  getters: {
    colors: state => {
      return state.colors
    }
  }
})
```

```JS
const app = new Vue({
  el: '#app',
  store,
  data: {
    newColor: ''
  },
  computed: {
    colors: function() {
      return this.$store.getters.colors
    }
  },
  methods: {
     addColor: function() {
      if (this.newColor != "") {
         this.colors.push(this.newColor)
      }
    },
  }
})
```

## Mutators

```JS
const store = new Vuex.Store({
  state: {
    colors: ['blue', 'green', 'red']
  },
  getters: {
    colors: state => {
      return state.colors
    }
  },
  mutations: {
    addColor: function(state, payload) {
      state.colors.push(payload.color)
    }
  }
})
```

```JS
const app = new Vue({
  el: '#app',
  store,
  data: {
    newColor: ''
  },
  computed: {
    colors: function() {
      return this.$store.getters.colors
    }
  },
  methods: {
     addColor: function() {
      if (this.newColor != "") {
         store.commit({
           type: 'addColor',
           color: this.newColor
         })
      }
    },
  }
})
```

Devtools and async mutations

```JS
addColor: function(state, payload) {
  setTimeout(() => {
    state.colors.push(payload.color)
  }, 1000)
}
```

## Actions

```JS
const store = new Vuex.Store({
  state: {
    colors: ['blue', 'green', 'red']
  },
  getters: {
    colors: state => {
      return state.colors
    }
  },
  mutations: {
    addColor: function(state, payload) {
      state.colors.push(payload.color)
    }
  },
  actions: {
    addColor: function(context, color) {
      context.commit(color)
    }
  }
})
```

```JS
const app = new Vue({
  el: '#app',
  store,
  data: {
    newColor: ''
  },
  computed: {
    colors: function() {
      return this.$store.getters.colors
    }
  },
  methods: {
     addColor: function() {
      if (this.newColor != "") {
         store.dispatch({
           type: 'addColor',
           color: this.newColor
         })
      }
    },
  }
})
```

