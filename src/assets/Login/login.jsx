import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-form">
          <h1 className="login-title">BIENVENIDO A LA ESQUINA BAR</h1>
          <p className="login-subtitle">
            INICIA SESIÓN CON TU CORREO ELECTRÓNICO Y CONTRASEÑA.
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="login-input"
              placeholder="Correo electronico......"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              className="login-input"
              placeholder="Contraseña......"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />


            <button type="submit" className="login-button">
              Iniciar Sesion
            </button>
          </form>

          <p className="login-footer">
            NO TENES CUENTA? 
              <Link to="/registro" className="login-link">
              CREAR
            </Link>
            </p>
        </div>
      </div>
    </div>
  );
}

export default Login;