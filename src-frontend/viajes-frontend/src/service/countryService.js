import axios from 'axios';

// Metodo para devolver los paises, se le pasa el token para verificar el usuario
export const getCountries = async () => {
    try {
        const token = localStorage.getItem('authToken');
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
        console.error("Error recovering the countries:", error);
        throw new Error('Error recovering the countries');
    }
};

// Método para obtener un país por su nombre
export const getCountryByCountry = async (countryName) => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await axios.get(`http://localhost:8080/v1/country/getCountryByCountry`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                country: countryName
            }
        });

        // Devolver el país encontrado
        return response.data;
    } catch (error) {
        console.error("Error recovering the countries:", error);
        throw new Error('Error recovering the countries');
    }
};

// Método para eliminar un pais por su nombre
export const deleteCountryByCountry = async (country) => {
    const token = localStorage.getItem('authToken');
    try {
        // Llamo a la API para eliminar el pais por su nombre
        const response = await axios.delete(`http://localhost:8080/v1/country/deleteCountryByCountry?country=${country}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;

    } catch (error) {
        console.error("Error deleting the country:", error);
        throw new Error('Error deleting the country');
    }
}