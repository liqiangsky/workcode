<template>
  <div id="app">
      <graphicsChart id="high" class="high" :option="option"></graphicsChart>
      <abc></abc>
  </div>
</template>

<script>
import graphicsChart from './components/graphicsChart'
import abc from './components/abc'
import options from './components/options'
export default {
  components: {
    graphicsChart,
    abc
  },
  data() {
    return {
      option:options.line
    }
  },
}
</script>

<style lang="scss">

</style>
