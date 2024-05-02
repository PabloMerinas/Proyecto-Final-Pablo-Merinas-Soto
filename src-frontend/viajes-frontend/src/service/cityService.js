import axios from 'axios';

// Metodo para devolver las ciudades, se le pasa el token para verificar el usuario
export const getCities = async () => {
    try {
        // Recupero el token
        const token = localStorage.getItem("authToken");
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

// Método para obtener una ciudad por su nombre
export const getCityByCity = async (cityName) => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await axios.get(`http://localhost:8080/v1/city/getCityByCity`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                city: cityName
            }
        });

        // Devolver la ciudad encontrada
        return response.data;
    } catch (error) {
        console.error("Error recovering the countries:", error);
        throw new Error('Error recovering the countries');
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

// Metodo para añadir una ciudad
export const addCity = async(countryName, cityData) => {
    delete cityData.country;
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.post('http://localhost:8080/v1/city/addCity', cityData, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                countryName: countryName
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error adding city:", error);
        throw new Error('Error adding city');
    }
}

// Metodo para editar una ciudad
export const updateCity = async (updatedCityData, countryName) => {
    delete updatedCityData.country;
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.post('http://localhost:8080/v1/city/updateCity', updatedCityData, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                countryName: countryName
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error updating city:", error);
        throw new Error('Error updating city');
    }
}
