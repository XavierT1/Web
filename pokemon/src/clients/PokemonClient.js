import axios from "axios";

const consumirApi = async (idPokemon) => {
    // Consumimos la API base [cite: 162]
    const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`).then(r => r.data);
    
    // Retornamos solo lo necesario, construyendo la URL de imagen solicitada 
    return {
        nombre: data.name,
        imagen: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${idPokemon}.svg`
    };
}

// Fachada que recibe el ID del pokemon a buscar
export async function obtenerPokemonFachada(idPokemon) {
    return await consumirApi(idPokemon);
}