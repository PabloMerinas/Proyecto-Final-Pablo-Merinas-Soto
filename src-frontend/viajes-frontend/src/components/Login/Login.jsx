import React, { useState } from 'react';
import "./style.css";
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
  // Elimino la cookie para garantizar que este eliminado el token de acceso cada vez que accedo al login
  localStorage.removeItem('authToken');
  localStorage.removeItem('activeUser');
  
  // Estado para almacenar los valores de los campos del formulario
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  // Función para manejar el envío del formulario
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // Manejar la respuesta de la solicitud HTTP
      if (!response.ok) {
        throw new Error('Error al iniciar sesión');
      }

      const data = await response.text();
      //console.log('Respuesta del servidor:', data);

      // Guardo el token en sesion
      localStorage.setItem('authToken', data);

      navigate('/account');

      // Aquí podrías manejar la respuesta del servidor según tus necesidades
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      // Manejar el error, mostrar un mensaje al usuario, etc.
      setError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
      // Limpiar los campos del formulario en caso de error
      setUsername('');
      setPassword('');

    }
  };

  // Funciones para manejar los cambios en los campos de entrada
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login">
      <div className="depth-frame">
        <div className="div-wrapper">
          <p className="text-wrapper">Sign in to your account</p>
        </div>
      </div>
      <form onSubmit={handleLogin}>
        <div className="depth-frame-wrapper">
          <div className="div">
            <div className="depth-frame-2">
              <div className="depth-frame-3">
                <div className="text-wrapper-2">Username</div>
              </div>
              <div className="depth-frame-4">
                <div className="depth-frame-5">
                  <div className="depth-frame-6">
                    <div className="depth-frame-7">
                      <div className="text-wrapper-3">
                        <input className='custom-input'
                          type="text"
                          value={username}
                          onChange={handleUsernameChange}
                          placeholder="Enter your username"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="depth-frame-wrapper">
          <div className="div">
            <div className="depth-frame-2">
              <div className="depth-frame-3">
                <div className="text-wrapper-2">Password</div>
              </div>
              <div className="depth-frame-4">
                <div className="depth-frame-5">
                  <div className="depth-frame-8">
                    <div className="depth-frame-7">
                      <div className="text-wrapper-3">
                        <input className='custom-input'
                          type="password"
                          value={password}
                          onChange={handlePasswordChange}
                          placeholder="Enter your password"
                          required
                        /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="depth-frame-9">
          <div className="depth-frame-10">
            <input type="checkbox" id="remember-me-checkbox" />
            <label htmlFor="remember-me-checkbox">Remember me</label>
          </div>
        </div>
        <div className="depth-frame-14">
          <div className="depth-frame-15">
            <div className="depth-frame-16">
              <div className="depth-frame-7">
                <div className="text-wrapper-5">
                  <button type="submit">Log in</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="depth-frame-17">
        <Link to="/register" className="depth-frame-7">
          <div className="text-wrapper-6">Create an account</div>
        </Link>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};
