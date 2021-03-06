# Vue 03: First Vue app

## Vue-CLI

- installation
- creating vue project (automatic vs manual)
- running project, making sure everything works
- code example from Session 02
- splitting code into file
- project demo
- scoped styles

## Starting code

```HTML
<input v-model="newColor" type="text">
<button v-on:click="addColor">add color</button>

<ul>
    <color-item v-for="color in colors" v-bind:color="color" v-bind:key="color.id"></color-item>
</ul>
```

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
    addColor: function (state, payload) {
      state.colors.push(payload.color)
    }
  },
  actions: {
    addColor: function (context, color) {
      context.commit(color)
    }
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
    colors: function () {
      return this.$store.getters.colors
    }
  },
  methods: {
    addColor: function () {
      if (this.newColor !== '') {
        store.dispatch({
          type: 'addColor',
          color: this.newColor
        })
      }
    }
  }
})
```

## Final structure

ColorItem.vue

```VUE
<template>
  <li class="color-item">
    <span v-bind:style="{color: color }">{{ color }}</span>
  </li>
</template>

<script>
export default {
  name: 'ColorItem',
  props: {
    color: String
  }
}
</script>
```

Home.vue

```VUE
<template>
  <div class="home">
    <input v-model="newColor" type="text">
    <button v-on:click="addColor">add color</button>
    <ul>
        <color-item v-for="color in colors" v-bind:color="color" v-bind:key="color.id"></color-item>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import ColorItem from '@/components/ColorItem.vue'
import store from '../store'

export default {
  name: 'home',
  store,
  data: function () {
    return {
      newColor: ''
    }
  },
  computed: {
    colors: function () {
      return this.$store.getters.colors
    }
  },
  methods: {
    addColor: function () {
      if (this.newColor !== '') {
        store.dispatch({
          type: 'addColor',
          color: this.newColor
        })
      }
    }
  },
  components: {
    ColorItem
  }
}
</script>
```

store.js

```JS
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    colors: ['blue', 'green', 'red']
  },
  getters: {
    colors: state => {
      return state.colors
    }
  },
  mutations: {
    addColor: function (state, payload) {
      state.colors.push(payload.color)
    }
  },
  actions: {
    addColor: function (context, color) {
      context.commit(color)
    }
  }
})

```

separate getters.js

```JS
export const colors = function (state) {
  return state.colors
}
```

single file modules

https://github.com/vuejs/vuex/blob/dev/examples/shopping-cart/store/modules/products.js

## Scoped styles

```VUE
<style scoped lang="scss">
.color-item {
  & span {
    text-decoration: underline;
  }
}
</style>
```
