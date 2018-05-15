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
  <button v-on:click=myMethod>Change text</button>
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
  <button v-on:click=myMethod>Change text</button>
  {{ introductionText }} 
  
  <ul v-for="color in colors">
    <li>{{ color }}</li>
  </ul>
</div>
```
```JS
const app = new Vue({
  el: '#app',
  data: {
    introductionText: 'Hello everybody!',
    colors: ['blue', 'green', 'yellow']
  },
  methods: {
    myMethod: function() {
      this.introductionText = 'Hi there!'
    }
  }
})
```


## Reactivity limits

## Computed properties

## Filters

## Mixins

## Components
