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

// Método para aliminar una attraccion
export const deleteAttractionByAttraction = async (attraction) => {
    const token = localStorage.getItem('authToken');
    try {
        // Llamar a la API
        const response = await axios.delete('http://localhost:8080/v1/attraction/deleteAttractionByAttraction', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                attraction: attraction
            }
        });


        return response.data;
    } catch (error) {
        console.error("Error deleting the attraction:", error);
        throw new Error('Error deleting the attraction');
    }
};