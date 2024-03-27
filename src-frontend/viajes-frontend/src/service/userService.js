import axios from 'axios';

// Función para recuperar la información del usuario utilizando el token
export const getUserInfo = async (token) => {
  try {
    // Obtengo el usuario
    const response = await axios.get('http://localhost:8080/v1/user/getUserByToken', {
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token en los encabezados de la solicitud
      },
      params: {
        token: token
      }
    });

    // Obtengo sus roles
    const rolesResponse = await axios.get('http://localhost:8080/v1/user/getRolesByToken', {
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token en los encabezados de la solicitud
      },
      params: {
        token: token
      }
    });
    const roles = rolesResponse.data;
    response.data.roles = roles;

    return response.data; // Devolver los datos del usuario obtenidos del backend
  } catch (error) {
    console.error('Error al recuperar los datos del usuario:', error);
    throw new Error('Error al recuperar los datos del usuario');
  }
};

// Funcion para actualizar un usuario
export const updateUser = async (token, newData) => {
  try {
    // Realizar la solicitud para actualizar el usuario
    const response = await axios.put('http://localhost:8080/v1/user', newData, {
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token en los encabezados de la solicitud
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error al actualizar los datos del usuario:', error);
    throw new Error('Error al actualizar los datos del usuario');
  }
}

// Función para eliminar un usuario
export const deleteMyUser = async (username, token) => {
  try {
    const response = await axios.delete('http://localhost:8080/v1/user/deleteMyUser', {
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token en los encabezados de la solicitud
      },
      params: {
        username: username // Paso el username que se va a eliminar
      }
    });

    return response.data; // Devolvo la respuesta
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    throw new Error('Error al eliminar el usuario');
  }
};

// Funcion para recuperar todos los usuarios.
export const getAllUsers = async (token) => {
  try {
    const response = await axios.get('http://localhost:8080/v1/user', {
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token en los encabezados de la solicitud
      }
    });

    return response.data; // Devuelvo la respuesta
  } catch (error) {
    console.error('Error recuperando los usuarios:', error);
    throw new Error('Error recuperando los usuarios');
  }
};
