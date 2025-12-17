<template>
  <PokemonGame />
</template>

<script>
import PokemonGame from './views/PokemonGame.vue'

export default {
  name: 'App',
  components: {
    PokemonGame
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
}
</style>