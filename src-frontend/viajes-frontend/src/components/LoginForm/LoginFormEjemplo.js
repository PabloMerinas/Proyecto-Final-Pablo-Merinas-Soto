import React, { useState } from 'react';

const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Error al iniciar sesión');
    }

    const token = await response.text(); // Obtener el token como texto

    onLogin(token); // Pasar el token directamente a la función onLogin
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);
  }
};

return (
  <form onSubmit={handleLogin}>
    <input
      type="text"
      placeholder="Nombre de usuario"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
    <input
      type="password"
      placeholder="Contraseña"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <button type="submit">Iniciar sesión</button>
  </form>
);


// export default LoginForm;
