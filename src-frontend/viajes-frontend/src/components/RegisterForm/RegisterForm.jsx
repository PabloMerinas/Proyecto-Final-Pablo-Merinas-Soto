import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserInfo } from "../../service/getUserInfo";

import './style.css';

export const RegisterForm = () => {

  // Borro la cookie del usuario y el token al cargar el registro
  localStorage.removeItem("activeUser");
  localStorage.removeItem("authToken");

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Función para manejar el envío del formulario
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/v1/user/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });

      // Manejar la respuesta de la solicitud HTTP
      if (!response.ok) {
        throw new Error('Error');
      }

      const data = await response.text();
      const activeUser = await getUserInfo(data);

      // Guardo el token en sesion y el usuario
      localStorage.setItem('authToken', data);
      localStorage.setItem('activeUser',JSON.stringify(activeUser));
      
      navigate('/account');


    } catch (error) {
      console.error('Error al registrar el usuario:', error.message);
      // Manejar el error, mostrar un mensaje al usuario.
      setError('El usuario ya existe.');
      // Limpiar los campos del formulario en caso de error
      setUsername('');
      setPassword('');
      setEmail('');
    }
  };

  // Funciones para manejar los cambios en los campos de entrada
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  return (
    <div className="p-rincipal-container">

      <div className="p-rincipal-register">
        <div className="p-rincipal-depth4-frame0">
          <div className="p-rincipal-depth5-frame0">
            <span className="p-rincipal-text">
              <span>Create an account</span>
            </span>
          </div>
        </div>
        <form onSubmit={handleLogin}>
          <div className="p-rincipal-depth4-frame1">
            <div className="p-rincipal-depth5-frame01">
              <div className="p-rincipal-depth6-frame0">
                <div className="p-rincipal-depth7-frame0">
                  <span className="p-rincipal-text02">
                    <span>Email</span>
                  </span>
                </div>
                <div className="p-rincipal-depth7-frame1">
                  <div className="p-rincipal-depth8-frame0">
                    <div className="p-rincipal-depth9-frame0 custom-width">
                      <div className="p-rincipal-depth10-frame0">
                        <label htmlFor="email" className="p-rincipal-text04">
                          <input type="email" id="email" placeholder="you@example.com" required
                            onChange={handleEmailChange} value={email} />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-rincipal-depth4-frame2">
            <div className="p-rincipal-depth5-frame02">
              <div className="p-rincipal-depth6-frame01">
                <div className="p-rincipal-depth7-frame01">
                  <span className="p-rincipal-text06">
                    <span>Username</span>
                  </span>
                </div>
                <div className="p-rincipal-depth7-frame11">
                  <div className="p-rincipal-depth8-frame01">
                    <div className="p-rincipal-depth9-frame01 custom-width">
                      <div className="p-rincipal-depth10-frame01">
                        <label htmlFor="username" className="p-rincipal-text08">
                          <input type="text" id="username" placeholder="Enter your username"
                            onChange={handleUsernameChange} value={username}
                            required />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className="p-rincipal-depth4-frame3">
            <div className="p-rincipal-depth5-frame03">
              <div className="p-rincipal-depth6-frame02">
                <div className="p-rincipal-depth7-frame02">
                  <span className="p-rincipal-text10">
                    <span>Password</span>
                  </span>
                </div>
                <div className="p-rincipal-depth7-frame12">
                  <div className="p-rincipal-depth8-frame02">
                    <div className="p-rincipal-depth9-frame02 custom-width">
                      <div className="p-rincipal-depth10-frame02">
                        <label htmlFor="password" className="p-rincipal-text12">
                          <input type="password" id="password" placeholder="Enter your password" required value={password}
                            onChange={handlePasswordChange} />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className="p-rincipal-depth4-frame4">
            <div className="p-rincipal-depth6-frame1">
              <div className="p-rincipal-depth7-frame04">
                <label htmlFor="terms" className="p-rincipal-text14">
                  <input type="checkbox" id="terms" className="mr-2" required />
                  <span> I agree to the terms and conditions.</span>
                </label>
              </div>
            </div>
          </div>
          <div className="p-principal">
            <button type="submit" className="p-rincipal-text16">
              Create account
            </button>
          </div>
        </form>

        <Link to="/" id='link'>
          <div>Already have an account</div>
        </Link>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>

  );
};
