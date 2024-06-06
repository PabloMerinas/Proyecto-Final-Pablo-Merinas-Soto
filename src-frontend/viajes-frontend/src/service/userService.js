import axios from 'axios';
import { BASE_URL } from '../App';


// Función para recuperar la información del usuario utilizando el token
export const getUserInfo = async (token) => {
  try {
    // Obtengo el usuario
    const response = await axios.get(`${BASE_URL}/user/getUserByToken`, {
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token en los encabezados de la solicitud
      },
      params: {
        token: token
      }
    });

    const userData = response.data;

    if (!userData || !userData.username) {
      throw new Error('Invalid user data received');
    }

    let profileImageUrl = null;
    try {
      // Obtengo la URL de la imagen de perfil del usuario
      const profileImageResponse = await axios.get(`${BASE_URL}/file/getProfileImageByUsername`, {
        headers: {
          Authorization: `Bearer ${token}`, // Incluir el token en los encabezados de la solicitud
        },
        params: {
          username: userData.username
        },
        responseType: 'blob'
      });

      // Para obtener la imagen del perfil ( Esto me ha costado la vida )
      const imageData = profileImageResponse.data;
      profileImageUrl = URL.createObjectURL(imageData);
    } catch (profileImageError) {
      console.error('Error fetching profile image:', profileImageError);
    }

    userData.imgUrl = profileImageUrl;

    let roles = [];
    try {
      // Obtengo sus roles
      const rolesResponse = await axios.get(`${BASE_URL}/user/getRolesByToken`, {
        headers: {
          Authorization: `Bearer ${token}`, // Incluir el token en los encabezados de la solicitud
        },
        params: {
          token: token
        }
      });
      roles = rolesResponse.data;
    } catch (rolesError) {
      console.error('Error fetching roles:', rolesError);
      roles = ['CUSTOMER']; // Proporciona un rol predeterminado
    }

    userData.roles = roles;

    return userData; // Devolver los datos del usuario obtenidos del backend
  } catch (error) {
    console.error('Error recovering user data:', error);
    throw new Error('Error recovering user data');
  }
};

// Funcion para actualizar un usuario
export const updateUser = async (newData, isAdmin, isCustomer) => {
  try {
    const token = localStorage.getItem('authToken');
    delete newData.isAdmin;
    delete newData.isCustomer;
    // Realizar la solicitud para actualizar el usuario
    const response = await axios.put(`${BASE_URL}/user`, newData, {
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token en los encabezados de la solicitud
      }, params: {
        isAdmin: isAdmin,
        isCustomer: isCustomer
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
    const response = await axios.delete(`${BASE_URL}/user/deleteMyUser`, {
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
    const response = await axios.get(`${BASE_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token en los encabezados de la solicitud
      }
    });

    // Obtener los datos de los usuarios
    const users = response.data;

    // Para cada usuario, obtener la imagen de perfil y los roles
    const usersWithImagesAndRoles = await Promise.all(users.map(async (user) => {
      // Obtener la imagen de perfil
      const profileImageResponse = await axios.get(`${BASE_URL}/file/getProfileImageByUsername`, {
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
      const rolesResponse = await axios.get(`${BASE_URL}/user/getRolesByUsername`, {
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
    await axios.post(`${BASE_URL}/file/uploadProfileImageToUseraname`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });

    // Obtengo la URL de la imagen de perfil del usuario
    return await getProfileImageURL(username, token);
  } catch (error) {
    console.error('Error updating user profile image: ', error);
    throw new Error('Error updating user profile image: ' + (error.response ? error.response.data : error.message));
  }
}

// Obtener la URL de la imagen de perfil del usuario
export const getProfileImageURL = async (username, token) => {
  try {
    const profileImageResponse = await axios.get(`${BASE_URL}/file/getProfileImageByUsername`, {
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token en los encabezados de la solicitud
      },
      params: {
        username: username
      },
      responseType: 'blob'
    });

    // Para obtener la imagen del perfil
    const imageData = profileImageResponse.data;
    const imageUrl = URL.createObjectURL(imageData);
    return imageUrl;
  } catch (error) {
    console.error('Error getting user profile image URL: ', error);
    throw new Error('Error getting user profile image URL: ' + (error.response ? error.response.data : error.message));
  }
}


// Elimina un usuario pasandole el usuario
export const deleteUserByUsername = async (username) => {
  const token = localStorage.getItem("authToken");
  try {
    await axios.delete(`${BASE_URL}/user/deleteUserByUsername/${username}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error('Error deleting user: ', error);
    throw new Error('Error deleting user: ' + error);
  }
}

export const addUserFromAdmin = async (userData, isAdmin, isCustomer) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/addUserFromAdmin`, userData, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, params: {
        isAdmin: isAdmin,
        isCustomer: isCustomer
      }

    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 409) {
      console.error("User already exists:", error);
      throw new Error('The User already exists.');
    } else {
      console.error("Error adding the User:", error);
      throw new Error('Error adding the User');
    }
  }
}