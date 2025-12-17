<template>
  <div class="tarjeta">
    <div class="imagen-contenedor">
        <img :src="imagenSrc" class="imagen-pokemon">
    </div>
    <p class="nombre-pokemon">{{ nombre }}</p>
  </div>
</template>

<script>
export default {
  props: ['imagenSrc', 'nombre']
}
</script>

<style scoped>
.tarjeta {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px;
}

.imagen-contenedor {
    width: 200px;
    height: 200px;
    display: flex; 
    justify-content: center;
    align-items: center;
}

.imagen-pokemon {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.nombre-pokemon {
  font-weight: bold;
  margin-top: 10px;
  text-transform: uppercase;
}
</style>