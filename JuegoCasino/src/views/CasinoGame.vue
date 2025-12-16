<template>
  <div class="casino-game">
    <div v-if="gameStatus === 'lost'" class="message lost-message">
      <h2>Has utilizado tus 5 intentos</h2>
      <p>El juego ha terminado, inténtalo nuevamente</p>
      <button @click="newGame" class="game-button new-game-button">Nuevo Juego</button>
    </div>

    <div v-else-if="gameStatus === 'won'" class="message won-message">
      <h2>Puntaje: {{ score }}</h2>
      <p>Felicitaciones has ganado un premio de $10.000,00</p>
      <button @click="newGame" class="game-button new-game-button">Nuevo Juego</button>
    </div>

    <div v-else class="game-interface">
      <div class="header-stats">
        <p>Puntaje: {{ score }}</p>
        <p>Intento: {{ attempt }}</p>
      </div>

      <div class="slot-container">
        <SlotItem
          v-for="(slot, index) in slotsData"
          :key="index"
          :imageUrl="slot.imageUrl"
          :answer="slot.answer"
        />
      </div>

      <button @click="playGame" class="game-button play-button">JUGAR</button>
    </div>

  </div>
</template>

<script>
import SlotItem from '@/components/SlotItem.vue'

// URLs iniciales de Pokémon para P1
const INITIAL_URLS = [
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg',
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg'
];

export default {
  name: 'CasinoGame',
  components: {
    SlotItem
  },
  data() {
    return {
      score: 0,
      attempt: 0,
      // Estado: 'playing', 'won', 'lost'
      gameStatus: 'playing',
      // Datos para los 3 slots
      slotsData: []
    }
  },
  // La lógica de inicialización y reinicio del juego
  methods: {
    // P4: Reinicia el juego al estado inicial 
    newGame() {
      this.score = 0;
      this.attempt = 0;
      this.gameStatus = 'playing';
      // Reinicia los datos de los slots a los iniciales (Pokémon e X's)
      this.slotsData = INITIAL_URLS.map(url => ({
        imageUrl: url,
        answer: 'XXXXXXXXX' // Texto oculto
      }));
    },

    // P2: Lógica principal del juego
    async playGame() {
      // Bloquear si el juego ya terminó
      if (this.gameStatus !== 'playing') return;

      // 1. Incrementar intento
      this.attempt++;

      // 2. Consumo de API (3 veces)
      const API_URL = 'https://yesno.wtf/api'; 

      // Crear un arreglo de 3 promesas para consumir la API 3 veces
      const apiCalls = [
        fetch(API_URL),
        fetch(API_URL),
        fetch(API_URL)
      ];

      try {
        // Usamos Promise.all y async/await para esperar las 3 respuestas
        const responses = await Promise.all(apiCalls);
        const results = await Promise.all(responses.map(res => res.json()));

        // 3. Actualizar slotsData y obtener las respuestas
        const answers = [];
        this.slotsData = results.map((result, index) => {
          // Guardar la respuesta para el cálculo de puntos
          answers.push(result.answer);
          return {
            imageUrl: result.image, // Reemplazar la imagen
            answer: result.answer   // Reemplazar el texto oculto
          };
        });

        // 4. Calcular Puntaje
        this.calculateScore(answers);

        // 5. Verificar si el juego terminó
        this.checkGameStatus();

      } catch (error) {
        console.error("Error al consumir la API:", error);
        alert("Ocurrió un error al cargar los resultados. Inténtalo de nuevo.");
      }
    },

    calculateScore(answers) {
      // Contar cuántas respuestas son 'yes'
      const yesCount = answers.filter(answer => answer === 'yes').length;

      let points = 0;
      // Aplicar las reglas de puntaje 
      if (yesCount === 3) {
        points = 5; // 3 'yes' = 5 puntos
      } else if (yesCount === 2) {
        points = 2; // 2 'yes' = 2 puntos
      } else if (yesCount === 1) {
        points = 1; // 1 'yes' = 1 punto
      } else {
        points = 0; // 0 'yes' = 0 puntos
      } 

      this.score += points; // Sumar y actualizar el puntaje
    },

    checkGameStatus() {
      // b) Gana el juego si acumula 10 o más puntos en cualquier intento
      if (this.score >= 10) {
        this.gameStatus = 'won';
        return;
      }

      // a) Pierde si usa el 5to intento y no ha llegado a 10 puntos
      if (this.attempt >= 5) {
        this.gameStatus = 'lost';
        return;
      }
    }
  },
  // Inicializa el juego cuando el componente se crea
  created() {
    this.newGame();
  }
}
</script>

<style scoped>
.casino-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.header-stats {
  display: flex;
  justify-content: space-around;
  width: 450px; /* Ancho para que coincida con los slots */
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 20px;
}

.slot-container {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.game-button {
  padding: 10px 40px;
  font-size: 1.5em;
  border: 2px solid black;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  display: block;
  margin: 0 auto;
}

.game-button:hover {
  background-color: #f0f0f0;
}

/* Estilos para P3 - Mensajes de Fin de Juego */
.message {
  text-align: center;
  padding: 50px;
  border: 1px solid #ccc;
  margin-top: 50px;
}

.lost-message h2, .lost-message p {
  color: red; /* Los mensajes de pérdida son de color rojo */
}

.won-message h2, .won-message p {
  color: blue; /* Los mensajes de ganancia son de color azul */
}

.new-game-button {
  margin-top: 20px;
  /* El botón "Nuevo Juego" también es simple */
}
</style>