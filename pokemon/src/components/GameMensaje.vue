<template>
  <div class="contenedor-mensajes">
    
    <div v-if="mensajeDerrota" class="texto-rojo">
        <h2>Has utilizado tus 5 intentos</h2>
        <h2>El juego ha terminado, inténtalo otra vez</h2>
    </div>

    <div v-if="mensajeVictoria" class="texto-azul">
        <h2>Puntaje: {{ puntaje }}</h2>
        <h2>Felicitaciones has ganado un premio de $10.000,00</h2>
    </div>

  </div>
</template>

<script>
export default {
  props: ['mensajeDerrota', 'mensajeVictoria', 'puntaje']
}
</script>

<style scoped>
.contenedor-mensajes {
    margin-top: 20px;
    text-align: center;
    border: 1px solid black; /* Recuadro opcional para agrupar mensaje */
    padding: 10px;
    display: inline-block;
}

.texto-rojo {
    color: red;
    font-weight: bold;
}

.texto-azul {
    color: blue;
    font-weight: bold;
}
</style>