import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Buscador from '../Buscador/buscador';
import './navegador.css';

const Nav = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (searchTerm) => {
    console.log('Búsqueda:', searchTerm);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container-fluid px-4">
        
        <a className="navbar-brand d-flex align-items-center" href="/admin" onClick={(e) => { e.preventDefault(); navigate('/admin'); }}>
          <div className="logo-text">
            La Esquina
            <span className="logo-subtitle">ADMIN</span>
          </div>
        </a>

        
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
        
          <div className="mx-auto my-3 my-lg-0">
            <Buscador onSearch={handleSearch} />
          </div>

          
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <a className="nav-link-custom" href="/admin/pedidos" onClick={(e) => { e.preventDefault(); navigate('/admin/pedidos'); }}>
                PEDIDOS
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link-custom" href="/admin/productos" onClick={(e) => { e.preventDefault(); navigate('/admin/productos'); }}>
                PRODUCTOS
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link-custom" href="/admin/ventas" onClick={(e) => { e.preventDefault(); navigate('/admin/ventas'); }}>
                VENTAS
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link-custom" href="/admin/empleados" onClick={(e) => { e.preventDefault(); navigate('/admin/empleados'); }}>
                EMPLEADOS
              </a>
            </li>
          </ul>

          <div className="d-flex align-items-center ms-lg-3">
            <button 
              className="icon-btn" 
              onClick={() => navigate('/admin/configuracion')}
              aria-label="Configuración"
            >
              <i className="bi bi-gear"></i>
            </button>
            <button 
              className="icon-btn" 
              onClick={() => navigate('/perfil')}
              aria-label="Perfil de administrador"
            >
              <i className="bi bi-person-circle"></i>
            </button>
            <button 
              className="icon-btn" 
              onClick={() => navigate('/')}
              aria-label="Salir al sitio cliente"
              title="Ver sitio del cliente"
            >
              <i className="bi bi-box-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;