import axios from 'axios';

// Método para recuperar las notificaciones de un usuario en especifico
export const getNotificationsByUsername = async (token, username) => {
    try {
        const response = await axios.get(`http://localhost:8080/v1/notification/getNotificationsByUsername?username=${username}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        // Devolver las notificaciones
        return response.data;
    } catch (error) {
        // errores
        console.error('Error al recuperar las notificaciones:', error);
        throw error; 
    }
};