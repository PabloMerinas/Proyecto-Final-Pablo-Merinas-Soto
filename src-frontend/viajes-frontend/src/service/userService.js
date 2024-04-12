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

// Funcion para recuperar todos los usuarios con sus imágenes de perfil y roles
export const getAllUsers = async (token) => {
  try {
    const response = await axios.get('http://localhost:8080/v1/user', {
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token en los encabezados de la solicitud
      }
    });

    // Obtener los datos de los usuarios
    const users = response.data;

    // Para cada usuario, obtener la imagen de perfil y los roles
    const usersWithImagesAndRoles = await Promise.all(users.map(async (user) => {
      // Obtener la imagen de perfil
      const profileImageResponse = await axios.get('http://localhost:8080/v1/file/getProfileImageByUsername', {
        headers: {
          Authorization: `Bearer ${token}`, // Incluir el token en los encabezados de la solicitud
        },
        params: {
          username: user.username
        },
        responseType: 'blob'
      });

      // Para obtener la imagen del perfil
      const imageData = profileImageResponse.data;
      const imageUrl = URL.createObjectURL(imageData);

      // Obtener los roles del usuario específico
      const rolesResponse = await axios.get('http://localhost:8080/v1/user/getRolesByUsername', {
        headers: {
          Authorization: `Bearer ${token}`, // Incluir el token en los encabezados de la solicitud
        },
        params: {
          username: user.username
        }
      });
      const roles = rolesResponse.data;

      // Devolver el usuario con la imagen de perfil y los roles adjuntos
      return {
        ...user,
        imgUrl: imageUrl,
        roles: roles
      };
    }));

    return usersWithImagesAndRoles; // Devolver los usuarios con sus imágenes de perfil y roles
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

  // Elimina un usuario pasandole el usuario
  export const deleteUserByUsername = async (username) => {
    console.log(username)
    const token = localStorage.getItem("authToken");
    try {
      await axios.delete(`http://localhost:8080/v1/user/deleteUserByUsername/${username}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Error deleting user: ', error);
      throw new Error('Error deleting user: ' + error.response.data);
    }
  }
