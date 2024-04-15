import axios from 'axios';

// Metodo para devolver las ciudades, se le pasa el token para verificar el usuario
export const getCities = async (token) => {
    try {
        // LLamo a la api
        const response = await axios.get('http://localhost:8080/v1/city/getCities', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        //Guardo las ciudades
        const countries = response.data;
        return countries;
    } catch (error) {
        console.error("Error recovering cities:", error);
        throw new Error('Error recovering cities');
    }
};

// Metodo para eliminar una ciudad por su nombre de ciudad
export const deleteCityByCity = async (city) => {
    const token = localStorage.getItem('authToken');
    try {
        // Llamo a la API para eliminar la ciudad por su nombre
        const response = await axios.delete(`http://localhost:8080/v1/city/deleteCityByCity?city=${city}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;

    } catch (error) {
        console.error("Error deleting the city:", error);
        throw new Error('Error deleting the city');
    }
};