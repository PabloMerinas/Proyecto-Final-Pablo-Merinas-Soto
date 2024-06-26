import axios from 'axios';
import { BASE_URL } from '../App';


// Metodo para devolver los paises, se le pasa el token para verificar el usuario
export const getCountries = async () => {
    try {
        const token = localStorage.getItem('authToken');
        // LLamo a la api
        const response = await axios.get(`${BASE_URL}/country/getCountries`, {
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
        const response = await axios.get(`${BASE_URL}/country/getCountryByCountry`, {
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
        const response = await axios.delete(`${BASE_URL}/country/deleteCountryByCountry?country=${country}`, {
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

// Método para agregar un nuevo país
export const addCountry = async (newCountryData) => {
    const token = localStorage.getItem('authToken');
    try {
        // Llamo a la API para agregar el nuevo país
        const response = await axios.post(`${BASE_URL}/country/addCountry`, newCountryData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;

    } catch (error) {
        if (error.response && error.response.status === 409) {
            console.error("Country already exists:", error);
            throw new Error('The country already exists.');
        } else {
            console.error("Error adding the country:", error);
            throw new Error('Error adding the country');
        }
    }
}

// Método para actualizar un país existente
export const updateCountry = async (countryName, updatedCountryData) => {
    const token = localStorage.getItem('authToken');
    try {
        // Llamo a la API para actualizar el país
        const response = await axios.post(`${BASE_URL}/country/updateCountry`, updatedCountryData, {
            headers: {
                Authorization: `Bearer ${token}`
            }, params: {
                country: countryName
            }
        });

        return response.data;

    } catch (error) {
        console.error("Error updating the country:", error);
        throw new Error('Error updating the country');
    }
}
