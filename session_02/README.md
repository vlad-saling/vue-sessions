
# Vue 02: Vuex

## Starter code

```HTML

<!DOCTYPE html>
<html>

  <head>
    <title>Hello Vuex</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>

  <body>
    <div id="app">

        <input v-model="newColor" type="text">
        <button v-on:click="addColor">add color</button>
        
        <ul>
            <color-item v-for="color in colors" v-bind:color="color" v-bind:key="color.id"></color-item>
        </ul>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"></script>
    <script src="https://unpkg.com/vuex@2.0.0"></script>
    <script src="vue.js"></script>

  </body>

</html>

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

Non-reactive way with getters

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
      this.colors = this.$store.getters.colors
    }
  },
  created: function() {
    this.loadColorsFromStore()
  }
})
```

see import state

Reactive way with getters

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

## Module

```const moduleState = {
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
}

const store = new Vuex.Store({
  modules: {
    moduleState: moduleState,
  }
})

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
})```

