import axios from 'axios';

// Método para recuperar las notificaciones de un usuario en especifico
export const getNotificationsByUsername = async (username) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`http://localhost:8080/v1/notification/getNotificationsByUsername?username=${username}`, {
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
        const response = await axios.delete(`http://localhost:8080/v1/notification/deleteNotificationById?id=${id}`, {
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
        const response = await axios.post('http://localhost:8080/v1/notification/addNotificationToAllUsers', notificationData, {
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
