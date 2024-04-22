import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserInfo } from "../../service/userService";
import { useAuth } from '../../authContext/autContext';
import './registerForm.css';

export const RegisterForm = () => {
  const { login } = useAuth();
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
      login(activeUser);
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
    <div className="principal-container">

      <div className="principal-register">
        <div className="principal-nivel4-frame0">
          <div className="principal-nivel5-frame0">
            <span className="principal-text">
              <span>Create an account</span>
            </span>
          </div>
        </div>
        <form onSubmit={handleLogin} id='registerForm' name='registerForm'>
          <div className="principal-nivel4-frame1">
            <div className="principal-nivel5-frame01">
              <div className="principal-nivel6-frame0">
                <div className="principal-nivel7-frame0">
                  <span className="principal-text02">
                    <span>Email</span>
                  </span>
                </div>
                <div className="principal-nivel7-frame1">
                  <div className="principal-nivel8-frame0">
                    <div className="principal-nivel9-frame0 custom-width">
                      <div className="principal-nivel10-frame0">
                        <label htmlFor="email" className="principal-text04">
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
          <div className="principal-nivel4-frame2">
            <div className="principal-nivel5-frame02">
              <div className="principal-nivel6-frame01">
                <div className="principal-nivel7-frame01">
                  <span className="principal-text06">
                    <span>Username</span>
                  </span>
                </div>
                <div className="principal-nivel7-frame11">
                  <div className="principal-nivel8-frame01">
                    <div className="principal-nivel9-frame01 custom-width">
                      <div className="principal-nivel10-frame01">
                        <label htmlFor="username" className="principal-text08">
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
          <div className="principal-nivel4-frame3">
            <div className="principal-nivel5-frame03">
              <div className="principal-nivel6-frame02">
                <div className="principal-nivel7-frame02">
                  <span className="principal-text10">
                    <span>Password</span>
                  </span>
                </div>
                <div className="principal-nivel7-frame12">
                  <div className="principal-nivel8-frame02">
                    <div className="principal-nivel9-frame02 custom-width">
                      <div className="principal-nivel10-frame02">
                        <label htmlFor="password" className="principal-text12">
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
          <div className="principal-nivel4-frame4">
            <div className="principal-nivel6-frame1">
              <div className="principal-nivel7-frame04">
                <label htmlFor="terms" className="principal-text14">
                  <input type="checkbox" id="terms" className="mr-2" required />
                  <span> I agree to the terms and conditions.</span>
                </label>
              </div>
            </div>
          </div>
          <div className="p-principal">
            <button type="submit" className="principal-text16">
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
