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
  // Recibimos imagen y texto desde el padre
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
    display: flex; /* Para centrar la imagen dentro si es más pequeña */
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
  text-transform: uppercase; /* El nombre suele salir en minúscula de la API */
}
</style>