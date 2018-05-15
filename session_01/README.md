# Vue 01: Basic building blocks

## Data binding

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


## Template directives (if-else, for)

### Lists

```HTML
<div id="app">
  <input v-model="newColor" type="text">
  <button v-on:click="addColor">Add color</button>
  
  <ul v-for="color in colors">
    <li>{{ color }}</li>
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

Array caveats: https://vuejs.org/v2/guide/list.html#Caveats

### Conditional rendering

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
      this.colors.push(this.newColor)
    },
  }
})
```


Proper render function: https://vuejs.org/v2/guide/render-function.html


## Mixins

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
var greeting = {
  data: {
    location: 'mixin'
  },
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('Hello from ' + this.location + .'')
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
