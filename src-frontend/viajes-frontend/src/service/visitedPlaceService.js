import axios from 'axios';

const BASE_URL = 'http://13.53.46.224:8080/v1'; // Linea con la ip de coneccion

// Método para recuperar los lugares visitados por un usuario por su nombre de usuario
export const getVisitedPlacesByUsernameAndType = async (username, type) => {
    try {
        // Se recupera el token
        const token = localStorage.getItem('authToken');
        // Realizar una solicitud GET a la API
        const response = await axios.get(`${BASE_URL}/visitedPlaces/getVisitedPlacesByUsername`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                username: username
            }
        });
        const dataFiltered = response.data.filter(place => place.place === type);

        // Devuelve la lista 
        return dataFiltered;
    } catch (error) {
        console.error("Error retrieving visited places:", error);
        throw new Error('Error retrieving visited places');
    }
};

// Método para marcar un lugar como visitado por un usuario
export const markAsVisitedByUsername = async (username, countryId, cityId, attractionId) => {
    try {
        // Se recupera el token
        const token = localStorage.getItem('authToken');
        // Realizar una solicitud POST a la API
        const response = await axios.post(`${BASE_URL}/visitedPlaces/markAsVisitedByUsername`, null, {
            params: {
                username: username,
                countryId: countryId,
                cityId: cityId,
                attractionId: attractionId
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Devolver la respuesta de la API
        return response.data;
    } catch (error) {
        console.error("Error al marcar el lugar como visitado:", error);
        throw new Error('Error al marcar el lugar como visitado');
    }
};

// Método para eliminar un lugar por su id
export const deleteVisitedPlace = async (placeId) => {
    try {
        // Se recupera el token
        const token = localStorage.getItem('authToken');
        const response = await axios.delete(`${BASE_URL}/visitedPlaces/deleteVisitedPlace?placeId=${placeId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error deleting the place.", error);
        throw new Error('Error deleting the place');
    }
};

