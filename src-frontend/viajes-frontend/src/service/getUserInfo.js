import axios from 'axios';

// Función para recuperar la información del usuario utilizando el token
export const getUserInfo = async (token) => {
  try {
    const response = await axios.get('/api/user', {
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token en los encabezados de la solicitud
      },
    });
    return response.data; // Devolver los datos del usuario obtenidos del backend
  } catch (error) {
    console.error('Error al recuperar los datos del usuario:', error);
    throw new Error('Error al recuperar los datos del usuario'); // Manejar errores de manera adecuada
  }
};
