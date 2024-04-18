import axios from 'axios';

// Método para recuperar los lugares visitados por un usuario por su nombre de usuario
export const getVisitedPlacesByUsernameAndType = async (username, type) => {
    try {
        // Se recupera el token
        const token = localStorage.getItem('authToken');
        // Realizar una solicitud GET a la API
        const response = await axios.get(`http://localhost:8080/v1/visitedPlaces/getVisitedPlacesByUsername`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                username: username
            }
        });

        // Se filtra dependiendo del tipo
        const filteredPlaces = response.data.filter(place => place.place === type);
        const placeIds = filteredPlaces.map(place => place.id);

        // Devuelve la lista de ID
        return placeIds;
    } catch (error) {
        console.error("Error retrieving visited places:", error);
        throw new Error('Error retrieving visited places');
    }
};
