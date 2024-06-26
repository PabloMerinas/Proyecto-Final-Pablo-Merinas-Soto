import axios from 'axios';
import { BASE_URL } from '../App';

// Metodo para devolver las attractions, se le pasa el token para verificar el usuario
export const getAttractions = async () => {
    try {
        // Recupero el token
        const token = localStorage.getItem("authToken");
        // LLamo a la api
        const response = await axios.get(`${BASE_URL}/attraction`, {
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
        const response = await axios.delete(`${BASE_URL}/attraction/deleteAttractionByAttraction`, {
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

// Método para obtener una atraccion por su nombre
export const getAttractionByAttraction = async (attractionName) => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await axios.get(`${BASE_URL}/attraction/getAttractionByAttraction`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                attraction: attractionName
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error recovering the attraction:", error);
        throw new Error('Error recovering the attraction');
    }
}

// Método para agregar una nueva atracción
export const addAttraction = async (attractionData, cityName) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.post(`${BASE_URL}/attraction/addAttraction`, attractionData, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                cityName: cityName
            }
        });

        return response.data;
    } catch (error)  {
        if (error.response && error.response.status === 409) {
            console.error("Attraction already exists:", error);
            throw new Error('The Attraction already exists.');
        } else {
            console.error("Error adding the Attraction:", error);
            throw new Error('Error adding the Attraction');
        }
    }
};

// Método para actualizar una atraccion existente
export const updateAttraction = async (cityName, updatedAttractionData) => {
    const token = localStorage.getItem('authToken');
    try {
        // Llamo a la API para actualizar el país
        const response = await axios.post(`${BASE_URL}/attraction/updateAttraction`, updatedAttractionData, {
            headers: {
                Authorization: `Bearer ${token}`
            }, params: {
                cityName: cityName
            }
        });

        return response.data;

    } catch (error) {
        console.error("Error updating the attraction:", error);
        throw new Error('Error updating the attraction');
    }
}