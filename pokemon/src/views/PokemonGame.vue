<template>
  <div class="juego-container">
    
    <div class="encabezado">
        <h2>Puntaje: {{ puntaje }}</h2>
        <h2>Intento: {{ intentos }}</h2>
    </div>

    <div class="fila-cartas">
        <PokemonCard 
            v-for="(card, index) in casillas" 
            :key="index"
            :imagenSrc="card.imagen"
            :nombre="card.texto"
        />
    </div>

    <div class="botonera">
        <button @click="jugar" :disabled="juegoTerminado" class="btn-jugar">JUGAR</button>
        <button v-if="juegoTerminado" @click="reiniciar" class="btn-reiniciar">Reiniciar</button>
    </div>

    <div v-if="juegoTerminado" class="area-mensajes">
        <GameMensaje 
            :mensajeDerrota="perdio"
            :mensajeVictoria="gano"
            :puntaje="puntaje"
        />
    </div>

  </div>
</template>

<script>
import PokemonCard from '@/components/PokemonCard.vue';
import GameMensaje from '@/components/GameMensaje.vue';
import { obtenerPokemonFachada } from '@/clients/PokemonClient.js';

export default {
    components: {
        PokemonCard,
        GameMensaje
    },
    data() {
        return {
            puntaje: 0,
            intentos: 0,
            juegoTerminado: false,
            gano: false,
            perdio: false,
            // Estado inicial: cuadros negros y XXXXX [cite: 155]
            // Imagen por defecto [cite: 157]
            imagenDefecto: 'https://placehold.co/200x200/000000/000000.png',
            casillas: [
                { imagen: 'https://placehold.co/200x200/000000/000000.png', texto: 'XXXXXXXXXXX' },
                { imagen: 'https://placehold.co/200x200/000000/000000.png', texto: 'XXXXXXXXXXX' },
                { imagen: 'https://placehold.co/200x200/000000/000000.png', texto: 'XXXXXXXXXXX' }
            ],
            // Conjunto fijo de 4 IDs para asegurar coincidencia [cite: 165]
            // 1:Bulbasaur, 4:Charmander, 7:Squirtle, 25:Pikachu
            pokemonIds: [1, 4, 7, 25] 
        }
    },
    methods: {
        async jugar() {
            // Aumentar intento
            this.intentos++;

            // Array temporal para guardar los nombres obtenidos y comparar
            const nombresObtenidos = [];

            // Actualizar las 3 casillas
            for (let i = 0; i < 3; i++) {
                // Seleccionar ID aleatorio del conjunto fijo
                const randomId = this.pokemonIds[Math.floor(Math.random() * this.pokemonIds.length)];
                
                try {
                    const data = await obtenerPokemonFachada(randomId);
                    
                    // Actualizar casilla
                    this.casillas[i].imagen = data.imagen;
                    this.casillas[i].texto = data.nombre;
                    
                    nombresObtenidos.push(data.nombre);

                } catch (error) {
                    console.error("Error API", error);
                }
            }

            // Calcular Puntaje [cite: 167]
            this.calcularPuntaje(nombresObtenidos);

            // Verificar condiciones de fin de juego [cite: 176]
            this.verificarFinJuego();
        },

        calcularPuntaje(nombres) {
            const [n1, n2, n3] = nombres;
            
            // Si coinciden 3 imágenes [cite: 168]
            if (n1 === n2 && n2 === n3) {
                this.puntaje += 5;
            } 
            // Si coinciden 2 imágenes (n1=n2 O n1=n3 O n2=n3) [cite: 169]
            else if (n1 === n2 || n1 === n3 || n2 === n3) {
                this.puntaje += 2;
            } 
            // Si no coincide ninguna [cite: 170]
            else {
                this.puntaje += 0;
            }
        },

        verificarFinJuego() {
            // Escenario B: Ganar (>= 10 puntos) [cite: 184]
            if (this.puntaje >= 10) {
                this.juegoTerminado = true;
                this.gano = true;
                this.perdio = false;
            }
            // Escenario A: Perder (5 intentos y < 10 puntos) [cite: 180]
            else if (this.intentos >= 5) {
                this.juegoTerminado = true;
                this.gano = false;
                this.perdio = true;
            }
        },

        reiniciar() {
            this.puntaje = 0;
            this.intentos = 0;
            this.juegoTerminado = false;
            this.gano = false;
            this.perdio = false;
            // Resetear casillas a negro
            this.casillas.forEach(c => {
                c.imagen = this.imagenDefecto;
                c.texto = 'XXXXXXXXXXX';
            });
        }
    }
}
</script>

<style scoped>
.juego-container {
    text-align: center;
    font-family: Arial, sans-serif;
    margin-top: 30px;
}

.encabezado {
    display: flex;
    justify-content: center;
    gap: 100px;
    margin-bottom: 30px;
}

.fila-cartas {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
}

.btn-jugar {
    border: 2px solid black;
    background: white;
    padding: 10px 50px;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
}

.btn-jugar:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.btn-reiniciar {
    margin-left: 10px;
    padding: 10px 20px;
    cursor: pointer;
}
</style>