import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navegador from './assets/Navegador/navegador';
import Perfil from './assets/Perfil/perfil';
import Menu from './assets/Carta/menu';
import Login from './assets/Login/login';
import Footer from './assets/Footer/footer';
import Carrito from './assets/Carrito/carrito';
import MisPedidos from './assets/Mispedidos/mispedidos';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import Inicio from './assets/inicio/Inicio';
import Registro from './assets/Login/registro';

function App() {
  return (
    <CartProvider>
    <Router>
      <div className="App">
        <Navegador />

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/carta" element={<Menu />} />
          <Route path="/pedidos" element={<MisPedidos />} />
          <Route path="/info" element={<InfoRedirect />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
        <Footer />
      </div>
    </Router>
    </CartProvider>
  );
}
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

export default App;