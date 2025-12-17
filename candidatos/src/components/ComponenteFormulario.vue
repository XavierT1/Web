<template>
  <div class="tarjeta-formulario">
    <div class="campo-foto">
      <label>Fotografía</label>
      <img v-if="fotografia" :src="fotografia" class="foto-perfil">
      <div v-else class="foto-placeholder"></div>
    </div>

    <div class="campo">
      <label>Título</label>
      <input v-model="titulo" type="text">
    </div>

    <div class="campo">
      <label>Nombre</label>
      <input v-model="nombre" type="text">
    </div>

    <div class="campo">
      <label>Apellido</label>
      <input v-model="apellido" type="text">
    </div>

    <div class="campo">
      <label>Email (Atributo 5)</label>
      <input v-model="email" type="text">
    </div>

    <div class="campo">
      <label>Género (Atributo 6)</label>
      <input v-model="genero" type="text">
    </div>

    <div class="botonera">
      <button @click="buscarCandidato" class="btn-buscar">Buscar</button>
      <button @click="agregarCandidato" class="btn-agregar">Agregar</button>
    </div>
  </div>
</template>

<script>
import { obtenerCandidatoFachada } from '@/clients/CandidatoClient.js';

export default {
  props: ['accionAgregar'], 
  
  data() {
    return {
      fotografia: '',
      titulo: '',
      nombre: '',
      apellido: '',
      email: '',
      genero: ''
    }
  },
  methods: {
    async buscarCandidato() {
      try {
        const data = await obtenerCandidatoFachada();
        
        this.fotografia = data.picture.large;
        this.titulo = data.name.title;
        this.nombre = data.name.first;
        this.apellido = data.name.last;
        this.email = data.email; 
        this.genero = data.gender;

      } catch (error) {
        console.error("Error al buscar candidato", error);
      }
    },
    agregarCandidato() {
      if (this.nombre === '') return;

      const nuevoCandidato = {
        titulo: this.titulo,
        nombre: this.nombre,
        apellido: this.apellido,
        email: this.email,
        genero: this.genero
      };

      if (this.accionAgregar) {
        this.accionAgregar(nuevoCandidato);
      }
 
      this.fotografia = '';
      this.titulo = '';
      this.nombre = '';
      this.apellido = '';
      this.email = '';
      this.genero = '';
    }
  }
}
</script>

<style scoped>
.tarjeta-formulario {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  margin: 0 auto;
  text-align: left;
}

.campo-foto {
  display: flex;
  justify-content: space-between;
  align-items: center;            
  margin-bottom: 15px;
}

.foto-perfil {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  border: 1px solid #ddd;
  object-fit: cover; 
  margin: 0;        
}

.foto-placeholder {
  width: 100px;
  height: 100px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 0; 
}

.campo {
  margin-bottom: 10px;
}

.campo label {
  display: block;
  font-weight: bold;
  color: blue; 
}

.campo input {
  width: 90%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.botonera {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.btn-buscar {
  background-color: #0056b3;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-agregar {
  background-color: #0056b3;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>