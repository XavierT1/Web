import axios from "axios";

const consumirApi = async () => {
 
    const respuesta = await axios.get("https://yesno.wtf/api").then(r => r.data);
    return respuesta;
}

export async function consumirAPIFachada() {
    return await consumirApi();
}