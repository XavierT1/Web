import axios from "axios";

// Función privada que hace la petición
const consumirApi = async () => {
    // Axios.get devuelve un objeto respuesta, accedemos a .data
    const respuesta = await axios.get("https://yesno.wtf/api").then(r => r.data);
    return respuesta;
}

// Función fachada que exportamos para usar en la vista
export async function consumirAPIFachada() {
    return await consumirApi();
}