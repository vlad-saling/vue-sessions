# Vue 01: Basic building blocks

## Data rendering and binding

### Rendering static data

```HTML
<div id="app">
  {{ introductionText }}
</div>
```

```JS
const app = new Vue({
  el: '#app',
  data: {
    introductionText: 'Hello everybody!'
  }
})
```

### Dynamic binding (and lazy)

on change update:
```HTML
<div id="app">
  <input v-model="introductionText" type=text>
  {{ introductionText }}
</div>
```

on input update - lazy:
```HTML
<div id="app">
  <input v-model.lazy="introductionText" type=text>
  {{ introductionText }}
</div>
```

```JS
const app = new Vue({
  el: '#app',
  data: {
    introductionText: 'Hello everybody!'
  }
})
```

## Methods (and scope)

```HTML
<div id="app">
  <button v-on:click="myMethod">Change text</button>
  {{ introductionText }} 
</div>
```

```JS
const app = new Vue({
  el: '#app',
  data: {
    introductionText: 'Hello everybody!'
  },
  methods: {
    myMethod: function() {
      this.introductionText = 'Hello there!'
    }
  }
})
```

### Scope

manual scope:
```JS
const app = new Vue({
  el: '#app',
  data: {
    introductionText: 'Hello everybody!'
  },
  methods: {
    myMethod: function() {
      let vm = this
      setTimeout(function() {
        vm.introductionText = 'Hi there!'
      }, 2000)
    }
  }
})
```

scope trough arrow:
```JS
const app = new Vue({
  el: '#app',
  data: {
    introductionText: 'Hello everybody!'
  },
  methods: {
    myMethod: function() {
      setTimeout(() => {
        this.introductionText = 'Hi there!'
      }, 2000)
    }
  }
})
```

## Computed properties

For properties that doesn't have to store in data model. Much like Excel operations on top of table.

```HTML
<div id="app">
  Bitcoin: <input type="number" v-model="bitcoin"><br />
  USD: {{ btcUSD }}<br />
  EUR: {{ btcEUR }} 
</div>
```

```JS
const app = new Vue({
  el: '#app',
  data: {
    bitcoin: 0
  },
  computed: {
    btcUSD: function() {
      return this.bitcoin * 8812.67
    },
    btcEUR: function() {
      return this.bitcoin * 7382.67
    },
  },
})
```

## Filters

Usefull in combination with number or string adjustments.

```HTML
<div id="app">
  Bitcoin: <input type="number" v-model="bitcoin"><br />
  USD: {{ btcUSD | round }}<br />
  EUR: {{ btcEUR | round }} 
</div>
```

```JS
const app = new Vue({
  el: '#app',
  data: {
    bitcoin: 0
  },
  computed: {
    btcUSD: function(color) {
      return this.bitcoin * 8812.67
    },
    btcEUR: function(color) {
      return this.bitcoin * 7382.67
    },
  },
  filters: {
    round: function(value) {
      return Number(value).toFixed(1)
    }
  }
})
```


## Template directives

### Lists

```HTML
<div id="app">
  <input v-model="newColor" type="text">
  <button v-on:click="addColor">Add color</button>
  
  <ul>
    <li v-for="color in colors">{{ color }}</li>
  </ul>
</div>
```

```JS
const app = new Vue({
  el: '#app',
  data: {
    newColor: '',
    colors: ['blue', 'green', 'red']
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

Array caveats: https://vuejs.org/v2/guide/list.html#Caveats

### Conditional rendering

Be aware of too complex logic in tempaltes. It gets messy. 

```HTML
<div id="app">
  <input v-model="newColor" type="text">
  <button v-on:click="addColor">Add color</button>
  
  <ul >
    <li v-for="color in colors" v-if="color == 'blue'" style="color:blue">{{ color }}</li>
    <li v-else>{{ color }}</li>
  </ul>
</div>
```

```JS
const app = new Vue({
  el: '#app',
  data: {
    newColor: '',
    colors: ['blue', 'green', 'red']
  },
  methods: {
    addColor: function() {
      this.colors.push(this.newColor)
    }
  }
})
```

Custom directives: https://vuejs.org/v2/guide/custom-directive.html

### Somewhat cleaner conditonal rendering

```HTML
<div id="app">
  <input v-model="newColor" type="text">
  <button v-on:click="addColor">Add color</button>
  
  <ul>
    <li v-for="color in colors" v-html="renderColor(color)"></li>
  </ul>
</div>
```

```JS
const app = new Vue({
  el: '#app',
  data: {
    newColor: '',
    colors: ['blue', 'green', 'red']
  },
  methods: {
    addColor: function() {
      this.colors.push(this.newColor)
    },
    renderColor: function(color) {
      return '<span style="color: ' + color + '">' + color + '</span>'
    }
  }
})
```

### The component way

```HTML
<div id="app">
  <input v-model="newColor" type="text">
  <button v-on:click="addColor">Add color</button>
  
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
    newColor: '',
    colors: ['blue', 'green', 'red']
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


Proper render function: https://vuejs.org/v2/guide/render-function.html


## Mixins

DRY helpers.

```HTML
<div id="app">
  <input v-model="newColor" type="text">
  <button v-on:click="addColor">Add color</button>
  
  <ul>
    <color-item v-for="color in colors" v-bind:color="color"></color-item>
  </ul>
</div>
```

```JS
const greeting = {
  data: {
    location: 'mixin'
  },
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('Hello from ' + this.location + '.')
    }
  }
}

Vue.component('color-item', {
  mixins: [greeting],
  data: function () {
    return { 
      location: 'component'
    }
  },
  props: {
    color: ''
  },
  
  template: '<li><span v-bind:style="{color: color }">{{ color }}</span></li>'
})

const app = new Vue({
  el: '#app',
  mixins: [greeting],
  data: {
    newColor: '',
    colors: ['blue', 'green', 'red'],
    location: 'main'
  },
  methods: {
    addColor: function() {
      this.colors.push(this.newColor)
    },
  }
})
```
