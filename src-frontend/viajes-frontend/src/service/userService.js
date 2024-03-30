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

    // Obtengo la URL de la imagen de perfil del usuario
    const profileImageResponse = await axios.get('http://localhost:8080/v1/file/getProfileImageByUsername', {
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token en los encabezados de la solicitud
      },
      params: {
        username: response.data.username
      },
      responseType: 'blob'
    });

    // Para obtener la imagen del perfil ( Esto me ha costado la vida )
    const imageData = profileImageResponse.data;
    const imageUrl = URL.createObjectURL(imageData);
    response.data.imgUrl = imageUrl;


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
    console.error('Error recovering user data:', error);
    throw new Error('Error recovering user data');
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
    console.error('Error updating user data:', error);
    throw new Error('Error updating user data');
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
    console.error('Error deleting the user:', error);
    throw new Error('Error deleting the user');
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
    console.error('Error recovering users:', error);
    throw new Error('Error recovering users');
  }
};


// Actualiza la imagen de perfil de un usuario
export const uploadProfileImageByUsername = async (formData, username) => {
  const token = localStorage.getItem("authToken");
  try {
    await axios.post('http://localhost:8080/v1/file/uploadProfileImageToUseraname', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });

    // Obtengo la URL de la imagen de perfil del usuario
    const profileImageResponse = await axios.get('http://localhost:8080/v1/file/getProfileImageByUsername', {
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token en los encabezados de la solicitud
      },
      params: {
        username: username
      },
      responseType: 'blob'
    });

    // Para obtener la imagen del perfil ( Esto me ha costado la vida )
    const imageData = profileImageResponse.data;
    const imageUrl = URL.createObjectURL(imageData);
    return imageUrl;
  } catch (error) {
    console.error('Error updating user profile image: ', error);
    throw new Error('Error updating user profile image: ' + error.response.data);
  }
}
