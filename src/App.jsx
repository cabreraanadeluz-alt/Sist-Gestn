import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navegador from './assets/Navegador/navegador';
import Perfil from './assets/Perfil/perfil';
import Menu from './assets/Carta/menu';
import Login from './assets/Login/login';
import Footer from './assets/Footer/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import Inicio from './assets/inicio/Inicio';

function App() {
  return (
    <Router>
      <div className="App">
        <Navegador cartCount={3} />

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/carta" element={<Menu />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/info" element={<InfoRedirect />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}


const Pedidos = () => (
  <div className="container" style={{ paddingTop: '100px' }}>
    <h1>Mis Pedidos</h1>
    <p>Historial de pedidos</p>
  </div>
);

const InfoRedirect = () => {
  const navigate = useNavigate();
  
  React.useEffect(() => {
    navigate('/');
    setTimeout(() => {
      const elemento = document.getElementById('ubicacion');
      if (elemento) {
        elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }, [navigate]);

  return null;
};

const Carrito = () => (
  <div className="container" style={{ paddingTop: '100px' }}>
    <h1>Carrito de Compras</h1>
    <p>Productos en el carrito</p>
  </div>
);



export default App;