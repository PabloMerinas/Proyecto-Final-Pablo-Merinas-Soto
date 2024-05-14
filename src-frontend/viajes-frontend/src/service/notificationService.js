import axios from 'axios';
import { BASE_URL } from '../App';



// Método para recuperar las notificaciones de un usuario en especifico
export const getNotificationsByUsername = async (username) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${BASE_URL}/notification/getNotificationsByUsername?username=${username}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        // Devolver las notificaciones
        return response.data;
    } catch (error) {
        // errores
        console.error('Error retrieving notificaciones:', error);
        throw error; 
    }
};

// Método para eliminar una notificación pasandole el id de esta
export const deleteNotificationById = async (token, id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/notification/deleteNotificationById?id=${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        // Devuelve la respuesta
        return response.data;

    } catch (error) {
        console.error('Error deleting the notification: ' + error);
        throw error;
    }
}

// Método para agregar una notificación a todos los usuarios
export const addNotificationToAllUsers = async (notificationData) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.post(`${BASE_URL}/notification/addNotificationToAllUsers`, notificationData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        // Devuelve la respuesta
        return response.data;
    } catch (error) {
        console.error('Error adding notification to all users:', error);
        throw error;
    }
};
