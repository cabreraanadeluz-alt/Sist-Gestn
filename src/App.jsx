import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navegador from './assets/Navegador/navegador';
import Perfil from './assets/Perfil/perfil';
import Menu from './assets/Carta/menu';
import Login from './assets/Login/login';
import Footer from './assets/Footer/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navegador cartCount={3} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carta" element={<Menu />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/info" element={<Info />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
const Home = () => (
  <div className="container" style={{ paddingTop: '100px' }}>
    <h1>Bienvenido a La Esquina BAR</h1>
    <p>Explora nuestra carta y realiza tus pedidos.</p>
  </div>
);

/*const Carta = () => (
  <div className="container" style={{ paddingTop: '100px' }}>
    <h1>Nuestra Carta</h1>
    <p>Aquí irán los productos</p>
  </div>
);*/

const Pedidos = () => (
  <div className="container" style={{ paddingTop: '100px' }}>
    <h1>Mis Pedidos</h1>
    <p>Historial de pedidos</p>
  </div>
);

const Info = () => (
  <div className="container" style={{ paddingTop: '100px' }}>
    <h1>Información</h1>
    <p>Sobre nosotros</p>
  </div>
);

const Carrito = () => (
  <div className="container" style={{ paddingTop: '100px' }}>
    <h1>Carrito de Compras</h1>
    <p>Productos en el carrito</p>
  </div>
);



export default App;