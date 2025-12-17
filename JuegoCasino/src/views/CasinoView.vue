<template>
  <div class="contenedor-juego">
    
    <div v-if="!juegoTerminado" class="encabezado">
      <h2>Puntaje: {{ puntaje }}</h2>
      <h2>Intento: {{ intentos }}</h2>
    </div>

    <div v-if="!juegoTerminado" class="tablero">
      <Casino 
        v-for="(item, index) in casillas" 
        :key="index"
        :imagenSrc="item.imagen"
        :texto="item.texto"
      />
    </div>

    <div v-if="!juegoTerminado" class="botonera">
      <button @click="jugar" class="boton-jugar">JUGAR</button>
    </div>

    <div v-if="juegoTerminado && !gano" class="mensaje-derrota">
      <h2>Has utilizado tus 5 intentos</h2>
      <h2>El juego ha terminado, inténtalo nuevamente</h2>
      <button @click="reiniciar" class="boton-nuevo">Nuevo Juego</button>
    </div>

    <div v-if="juegoTerminado && gano" class="mensaje-victoria">
      <h2>Puntaje: {{ puntaje }}</h2>
      <h2>Felicitaciones has ganado un premio de $10.000,00</h2>
      <button @click="reiniciar" class="boton-nuevo">Nuevo Juego</button>
    </div>

  </div>
</template>

<script>
import Casino from '@/components/Casino.vue';
import { consumirAPIFachada } from '@/clients/CasinoClient.js';

export default {
  components: {
    Casino
  },
  data() {
    return {
      puntaje: 0,
      intentos: 0,
      juegoTerminado: false,
      gano: false,
      casillas: [
        { 
          imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg', 
          texto: 'XXXXXXXXX' 
        },
        { 
          imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg', 
          texto: 'XXXXXXXXX' 
        },
        { 
          imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg', 
          texto: 'XXXXXXXXX' 
        }
      ]
    }
  },
  methods: {
    async jugar() {
      this.intentos++;

      let contadorYes = 0;
      for (let i = 0; i < 3; i++) {
        try {
          
          const respuesta = await consumirAPIFachada();
          
          this.casillas[i].imagen = respuesta.image;
          this.casillas[i].texto = respuesta.answer;

          if (respuesta.answer === 'yes') {
            contadorYes++;
          }

        } catch (error) {
          console.error("Error al conectar con la API:", error);
        }
      }

      if (contadorYes === 3) {
        this.puntaje += 5;
      } else if (contadorYes === 2) {
        this.puntaje += 2;
      } else if (contadorYes === 1) {
        this.puntaje += 1;
      } else {
        this.puntaje += 0;
      }

      if (this.puntaje >= 10) {
        this.juegoTerminado = true;
        this.gano = true;
      } 

      else if (this.intentos >= 5) {
        this.juegoTerminado = true;
        this.gano = false;
      }
    },

    reiniciar() {
      this.puntaje = 0;
      this.intentos = 0;
      this.juegoTerminado = false;
      this.gano = false;
   
      this.casillas = [
        { imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg', texto: 'XXXXXXXXX' },
        { imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg', texto: 'XXXXXXXXX' },
        { imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg', texto: 'XXXXXXXXX' }
      ];
    }
  }
}
</script>

<style scoped>
.contenedor-juego {
  text-align: center;
  font-family: Arial, sans-serif;
  margin-top: 20px;
}

.encabezado {
  display: flex;
  justify-content: center;
  gap: 350px;
  margin-bottom: 20px;
}

.tablero {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.boton-jugar, .boton-nuevo {
  padding: 10px 40px;
  font-size: 1.2rem;
  border: 3px solid black;
  background-color: white;
  cursor: pointer;
  font-weight: bold;
}

.mensaje-derrota {
  color: red;
  border: 1px solid black;
  padding: 20px;
  display: inline-block;
}

.mensaje-victoria {
  color: blue;
  border: 1px solid black;
  padding: 20px;
  display: inline-block;
}
</style>