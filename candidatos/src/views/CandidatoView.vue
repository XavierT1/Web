<template>
  <div class="vista-principal">
    <h1>Aprobación de Candidatos</h1>
    
    <div class="contenedor-componentes">
      <ComponenteFormulario :accionAgregar="procesarNuevoCandidato" />
      
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
      listaCandidatos: []
    }
  },
  methods: {
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
.contenedor-componentes {
  
}
</style>