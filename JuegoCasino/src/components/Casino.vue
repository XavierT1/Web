<template>
  <div class="casilla">
    <img :src="imagenSrc" alt="Imagen del juego" class="imagen-casilla">
    <p class="texto-casilla">{{ texto }}</p>
  </div>
</template>

<script>
export default {
  props: ['imagenSrc', 'texto']
}
</script>

<style scoped>
.casilla {
  border: 1px solid black;
  padding: 10px;
  text-align: center;
  margin: 10px;
  display: inline-block; 
  width: 200px;
}

.imagen-casilla {
  width: 150px;
  height: 150px;
  object-fit: cover;
}

.texto-casilla {
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 10px;
  text-transform: uppercase;
}
</style>