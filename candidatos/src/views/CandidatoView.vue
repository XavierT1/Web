<template>
  <div class="vista-principal">
    <h1>Aprobación de Candidatos</h1>
    
    <div class="contenedor-componentes">
      <ComponenteFormulario @agregar-data="procesarNuevoCandidato" />
      
      <ComponenteTabla :lista="listaCandidatos" />
    </div>
  </div>
</template>

<script>
import ComponenteFormulario from '@/components/ComponenteFormulario.vue';
import ComponenteTabla from '@/components/ComponenteTabla.vue';

export default {
  components: {
    ComponenteFormulario,
    ComponenteTabla
  },
  data() {
    return {
      // Esta lista almacena todos los candidatos agregados
      listaCandidatos: []
    }
  },
  methods: {
    // Método que recibe el objeto del hijo (Formulario) y lo guarda
    procesarNuevoCandidato(candidato) {
      this.listaCandidatos.push(candidato);
    }
  }
}
</script>

<style scoped>
.vista-principal {
  text-align: center;
  font-family: Arial, sans-serif;
}
h1 {
  margin-bottom: 20px;
}
</style>