import React, { useState, useEffect } from 'react';
import "./login.css";
import { Link, useNavigate } from 'react-router-dom';
import { getUserInfo } from '../../service/userService';
import { useAuth } from '../../authContext/autContext';

const BASE_URL = 'http://localhost:8080/api'; // Linea con la ip de coneccion

export const Login = () => {
  const { login, logout } = useAuth();
  // Estado para almacenar los valores de los campos del formulario
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    // Desloguear al montar el componente y eliminar la cookie
    logout();
    localStorage.removeItem('authToken');
    localStorage.removeItem('activeUser');
  }, [logout]);

  // Función para manejar el envío del formulario
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // Manejar la respuesta de la solicitud HTTP
      if (!response.ok) {
        throw new Error('Error login');
      }

      const data = await response.text();
      const userData = await getUserInfo(data);

      // Guardo el token en sesion
      localStorage.setItem('authToken', data);
      login(userData);
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
      <div className="nivel-frame">
        <div className="div-wrapper">
          <p className="text-wrapper">Sign in to your account</p>
        </div>
      </div>
      <form onSubmit={handleLogin} id='loginForm' name='loginForm'>
        <div className="nivel-frame-wrapper">
          <div className="div">
            <div className="nivel-frame-2">
              <div className="nivel-frame-3">
                <div className="text-wrapper-2">Username</div>
              </div>
              <div className="nivel-frame-4">
                <div className="nivel-frame-5">
                  <div className="nivel-frame-6">
                    <div className="nivel-frame-7">
                      <div className="text-wrapper-3">
                        <input className='custom-input'
                          type="text"
                          name='login-form-username'
                          value={username}
                          onChange={handleUsernameChange}
                          placeholder="Enter your username"
                          required
                          autoComplete='username'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="nivel-frame-wrapper">
          <div className="div">
            <div className="nivel-frame-2">
              <div className="nivel-frame-3">
                <div className="text-wrapper-2">Password</div>
              </div>
              <div className="nivel-frame-4">
                <div className="nivel-frame-5">
                  <div className="nivel-frame-8">
                    <div className="nivel-frame-7">
                      <div className="text-wrapper-3">
                        <input className='custom-input'
                          type="password"
                          value={password}
                          name='login-form-password'
                          onChange={handlePasswordChange}
                          placeholder="Enter your password"
                          required
                          autoComplete='current-password'
                        /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="nivel-frame-9">
          <div className="nivel-frame-10">
            <input type="checkbox" id="remember-me-checkbox" />
            <label htmlFor="remember-me-checkbox">Remember me</label>
          </div>
        </div>
        <div className="nivel-frame-14">
          <div className="nivel-frame-15">
            <div className="nivel-frame-16">
              <div className="nivel-frame-7">
                <div className="text-wrapper-5">
                  <button type="submit">Log in</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="nivel-frame-17">
        <Link to="/register" className="nivel-frame-7">
          <div className="text-wrapper-6">Create an account</div>
        </Link>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};
