import axios from 'axios';

// Metodo para devolver las attractions, se le pasa el token para verificar el usuario
export const getAttractions = async (token) => {
    try {
        // LLamo a la api
        const response = await axios.get('http://localhost:8080/v1/attraction', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        //Guardo las attracciones
        const attractions = response.data;
        return attractions;
    } catch (error) {
        console.error("Error al recuperar las atracciones:", error);
        throw new Error('Error al recuperar las atracciones');
    }
};