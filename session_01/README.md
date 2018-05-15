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

## Methods

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


## Reactivity (and limits)

## Computed properties

## Template directives (if-else, for)

## Filters

## Mixins

## Components
