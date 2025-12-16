<template>
  <div class="form-card">
    
    <div class="form-content">
      
      <div class="photo-section">
        <label class="label-photo">Fotografía</label>
        <div class="photo-box">
          <img :src="photoUrl" alt="Fotografía del Candidato" class="candidate-photo">
        </div>
      </div>

      <div class="input-group">
        <label>Título</label>
        <input type="text" v-model="candidateData.title" disabled>
      </div>

      <div class="input-group">
        <label>Nombre</label>
        <input type="text" v-model="candidateData.firstName" disabled>
      </div>

      <div class="input-group">
        <label>Apellido</label>
        <input type="text" v-model="candidateData.lastName" disabled>
      </div>

      <div class="input-group">
        <label>Atributo 5 (País)</label>
        <input type="text" v-model="candidateData.attr5" disabled>
      </div>

      <div class="input-group">
        <label>Atributo 6 (Email)</label>
        <input type="text" v-model="candidateData.attr6" disabled>
      </div>

    </div>

    <div class="button-group">
      <button @click="fetchCandidate" class="btn buscar-btn">Buscar</button>
      
      <button 
        @click="emitCandidate" 
        :disabled="!isReadyToSave" 
        class="btn agregar-btn"
      >
        Agregar
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CandidateForm',
  emits: ['add-candidate'], 
  
  data() {
    return {
      photoUrl: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      candidateData: {
        title: '',
        firstName: '',
        lastName: '',
        attr5: '', // País
        attr6: ''  // Email
      }
    }
  },
  
  computed: {
    // Habilitar "Agregar" solo si se ha cargado al menos el nombre
    isReadyToSave() {
        return this.candidateData.firstName !== '';
    }
  },

  methods: {
    // P1: Lógica Asíncrona para buscar y llenar el formulario
    async fetchCandidate() {
      const API_URL = 'https://randomuser.me/api/';
      
      this.resetForm(false); // Limpiar campos

      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const user = data.results[0];

        // Llenar campos
        this.photoUrl = user.picture.large; 
        this.candidateData.title = user.name.title; 
        this.candidateData.firstName = user.name.first; 
        this.candidateData.lastName = user.name.last; 
        this.candidateData.attr5 = user.location.country; // Atributo 5
        this.candidateData.attr6 = user.email; // Atributo 6
        
      } catch (error) {
        console.error("Error al obtener el candidato:", error);
        alert("Ocurrió un error al buscar el candidato. Verifique la conexión a la API.");
      }
    },
    
    // P2: Emite los datos al Padre para ser agregados a la lista
    emitCandidate() {
      const dataToSend = { ...this.candidateData };
      this.$emit('add-candidate', dataToSend);
      this.resetForm(true); // Limpiar formulario
    },

    // Función auxiliar para limpiar el formulario
    resetForm(clearPhoto = true) {
      if (clearPhoto) {
          this.photoUrl = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
      }
      this.candidateData = {
        title: '',
        firstName: '',
        lastName: '',
        attr5: '',
        attr6: ''
      };
    }
  }
}
</script>

<style scoped>
/* ESTILOS REPLICANDO EL DISEÑO DE LA IMAGEN ADJUNTA */
.form-card {
  width: 280px;
  padding: 25px;
  border-radius: 20px; /* Bordes muy redondeados */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* Sombra suave */
  margin: 30px auto;
  background-color: #ffffff;
}

.form-content {
  margin-bottom: 25px;
}

/* Sección Fotografía */
.photo-section {
  display: flex;
  justify-content: space-between;
  align-items: center; 
  margin-bottom: 10px;
}

.label-photo {
  color: #0056b3; /* Color azul para las etiquetas */
  font-weight: bold;
  font-size: 1em;
  padding-top: 5px; 
}

.photo-box {
  width: 100px;
  height: 100px;
  border: 1px solid #ccc; /* Borde de la caja de la foto */
  border-radius: 5px;
  background-color: #f0f0f0; /* Fondo claro */
  overflow: hidden;
}

.candidate-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Estilo de los campos de entrada */
.input-group {
  margin-bottom: 15px;
}

.input-group label {
  display: block;
  font-size: 1em;
  margin-bottom: 5px;
  color: #0056b3; /* Color azul para las etiquetas */
  font-weight: bold;
}

.input-group input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 8px; /* Bordes redondeados en los inputs */
  background-color: #f9f9f9;
}

/* Grupo de Botones */
.button-group {
  display: flex;
  justify-content: space-around; 
  margin-top: 30px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 10px; /* Bordes redondeados para los botones */
  cursor: pointer;
  color: white;
  font-weight: bold;
  min-width: 120px;
  font-size: 1em;
}

.buscar-btn {
  background-color: #007bff; /* Azul intenso, activo */
  box-shadow: 0 4px #0056b3; /* Sombra sutil */
}
.buscar-btn:active {
  box-shadow: none;
  transform: translateY(2px);
}

.agregar-btn {
  background-color: #a0a0a0; /* Gris por defecto (deshabilitado) */
}

/* Estilo para cuando el botón Agregar está habilitado (opcionalmente verde o azul) */
.btn.agregar-btn:not(:disabled) {
    background-color: #007bff; /* Usamos azul para ser consistente con Buscar, como en la imagen */
    box-shadow: 0 4px #0056b3;
}

.agregar-btn:disabled {
  background-color: #a0a0a0;
  cursor: not-allowed;
  box-shadow: none;
}
</style>