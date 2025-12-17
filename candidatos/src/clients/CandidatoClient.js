import axios from "axios";

const consumirApi = async () => {
    const respuesta = await axios.get("https://randomuser.me/api/").then(r => r.data);
    return respuesta.results[0];
}

export async function obtenerCandidatoFachada() {
    return await consumirApi();
}