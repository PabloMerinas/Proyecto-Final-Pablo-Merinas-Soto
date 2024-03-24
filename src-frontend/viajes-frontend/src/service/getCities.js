import axios from 'axios';

// Metodo para devolver las ciudades, se le pasa el token para verificar el usuario
export const getCountries = async (token) => {
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
        console.error("Error al recuperar las ciudades:", error);
        throw new Error('Error al recuperar las ciudades');
    }
};