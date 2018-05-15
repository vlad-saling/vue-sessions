# Vue 01: Basic building blocks

## Hello world

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


## Computed properties

## Filters

## Mixins

## Components
