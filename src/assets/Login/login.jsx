import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          contraseña: password, // TU BACKEND LO PIDE ASÍ
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Error al iniciar sesión");
        return;
      }

      // Guardar usuario
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      // Redirigir a home
      navigate("/");
    } catch (err) {
      setError("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-form">
          <h1 className="login-title">BIENVENIDO A LA ESQUINA BAR</h1>
          <p className="login-subtitle">
            INICIA SESIÓN CON TU CORREO ELECTRÓNICO Y CONTRASEÑA.
          </p>

          {error && <p className="login-error">{error}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="login-input"
              placeholder="Correo electrónico..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              className="login-input"
              placeholder="Contraseña..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="login-button">
              Iniciar Sesión
            </button>
          </form>

          <p className="login-footer">
            ¿NO TENÉS CUENTA?
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
