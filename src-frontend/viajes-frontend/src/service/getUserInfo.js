import axios from 'axios';

// Función para recuperar la información del usuario utilizando el token
export const getUserInfo = async (token) => {
  try {
    const response = await axios.get('http://localhost:8080/v1/users/getUserByToken', {
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token en los encabezados de la solicitud
      },
      params:{
        token: token
      }
    });
    return response.data; // Devolver los datos del usuario obtenidos del backend
  } catch (error) {
    console.error('Error al recuperar los datos del usuario:', error);
    throw new Error('Error al recuperar los datos del usuario');
  }
};
