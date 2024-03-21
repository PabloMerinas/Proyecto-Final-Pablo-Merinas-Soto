import React, { useState } from 'react';
import "./style.css";


export const Login = () => {
  // Estado para almacenar los valores de los campos del formulario
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Función para manejar el envío del formulario
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    // Aquí puedes realizar cualquier lógica que desees con los valores del formulario
    console.log('Username:', username);
    console.log('Password:', password);

    // Por ejemplo, podrías enviar los datos del formulario a través de una solicitud HTTP
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
      console.log('Respuesta del servidor:', data);

      // Aquí podrías manejar la respuesta del servidor según tus necesidades
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      // Manejar el error, mostrar un mensaje al usuario, etc.
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
                        <input
                          type="text"
                          value={username}
                          onChange={handleUsernameChange}
                          placeholder="Enter your username"
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
                        <input
                          type="password"
                          value={password}
                          onChange={handlePasswordChange}
                          placeholder="Enter your password"
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
            <div className="depth-frame-11">
              <div className="depth-frame-12">
                <div className="vector-wrapper">
                  <img className="vector" alt="Vector" src="/img/vector-0.svg" />
                </div>
              </div>
            </div>
            <div className="depth-frame-13">
              <div className="depth-frame-7">
                <div className="text-wrapper-4">Remember me</div>
              </div>
            </div>
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
        <div className="depth-frame-7">
          <div className="text-wrapper-6">Create an account</div>
        </div>
      </div>
    </div>
  );
};
