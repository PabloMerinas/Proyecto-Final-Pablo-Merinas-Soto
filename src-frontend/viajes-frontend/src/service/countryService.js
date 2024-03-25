import axios from 'axios';

// Metodo para devolver los paises, se le pasa el token para verificar el usuario
export const getCountries = async (token) => {
    try {
        // LLamo a la api
        const response = await axios.get('http://localhost:8080/v1/country/getCountries', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        //Guardo los paises
        const countries = response.data;
        return countries;
    } catch (error) {
        console.error("Error al recuperar los paises:", error);
        throw new Error('Error al recuperar los paises');
    }
};