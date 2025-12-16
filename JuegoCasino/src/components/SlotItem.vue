<template>
  <div class="slot-item">
    <img :src="imageUrl" alt="Slot Image" class="slot-image">
    <p class="slot-text">{{ answer }}</p>
  </div>
</template>

<script>
// Usando Options API simple para mantenerlo básico
export default {
  name: 'SlotItem',
  // Definición de las propiedades que recibirá del componente padre
  props: {
    imageUrl: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.slot-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  width: 150px; /* Ajusta según sea necesario */
}

.slot-image {
  width: 150px;
  height: 150px;
  border: 2px solid black;
}

.slot-text {
  margin-top: 5px;
  font-weight: bold;
  /* Estilo básico para que se vea como el texto debajo de la imagen */
}
</style>