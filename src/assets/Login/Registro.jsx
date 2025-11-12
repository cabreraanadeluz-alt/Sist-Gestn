import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'; // usa los mismos estilos del login

function Registro() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  // Simulamos usuarios ya registrados
  const usuariosRegistrados = ['usuario@ejemplo.com', 'test@gmail.com'];

  const validarEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validarPassword = (password) =>
    password.length >= 8 && /[a-zA-Z]/.test(password) && /\d/.test(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validaciones
    if (!nombre || !email || !password || !telefono) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    if (!validarEmail(email)) {
      setError('Ingrese un correo electrónico válido (ejemplo@dominio.com).');
      return;
    }

    if (!validarPassword(password)) {
      setError('La contraseña debe tener al menos 8 caracteres e incluir letras y números.');
      return;
    }

    if (usuariosRegistrados.includes(email)) {
      setError('Este correo ya está en uso.');
      return;
    }

    // Si pasa todas las validaciones
    console.log('Usuario registrado:', { nombre, email, telefono });
    setSuccess('Registro exitoso. Bienvenido.');

    // Simulamos guardar el usuario (ej: localStorage)
    localStorage.setItem('usuario', JSON.stringify({ nombre, email, telefono }));

    // Redirige luego de 2 segundos
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-form">
          <h1 className="login-title">CREAR CUENTA</h1>
          <p className="login-subtitle">Complete sus datos para registrarse.</p>

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="login-input"
              placeholder="Nombre completo..."
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />

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

            <input
              type="tel"
              className="login-input"
              placeholder="Teléfono..."
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
            
            <input
              type="dir"
              className="login-input"
              placeholder="Dirección.."
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              required
            />

            <button type="submit" className="login-button">
              Registrarse
            </button>
          </form>

          <p className="login-footer">
            ¿Ya tenés cuenta?{' '}
            <a href="/login" className="login-link">
              Iniciar sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Registro;
