import Carta from "./carta";
import "./menu.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Menu() {
  const { hash } = useLocation(); // Ej: "#pizzas"


  useEffect(() => {
    if (hash) {
      const section = document.querySelector(hash);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hash]);

  return (
    <div className="menu-container">
      <div className="menu-section" id="pizzas">
        <h2 className="section-title">PIZZAS</h2>
        <Carta
          nombre="Pizza Margarita"
          descripcion="Salsa de tomate, mozzarella fresca y albahaca"
          precio="$7.000"
          imagen="img/margarita.jpg"
        />
        <Carta
          nombre="Pizza Pepperoni"
          descripcion="Salsa de tomate, mozzarella y pepperoni"
          precio="$8.000"
          imagen="img/peperoni.jpg"
        />
        <Carta
          nombre="Pizza Napolitana"
          descripcion="Salsa de tomate, mozzarella, tomate y ajo"
          precio="$6.000"
          imagen="img/napolitana.jpg"
        />
      </div>

      <div className="menu-section" id="panes">
        <h2 className="section-title">ENTRE PANES</h2>
        <Carta
          nombre="Sandwich de Milanesa"
          descripcion="Pan, milanesa de carne, tomate, lechuga y aderezo a gusto"
          precio="$9.000"
          imagen="img/sandwich.jpg"
        />
        <Carta
          nombre="Hamburguesa Completa"
          descripcion="Pan, carne, queso, lechuga, tomate y cebolla"
          precio="$8.000"
          imagen="img/hamburguesa.jpg"
        />
        <Carta
          nombre="Pancho Especial"
          descripcion="Pan, salchicha, queso, bacon y aderezos"
          precio="$5.000"
          imagen="img/panchos.jpg"
        />
      </div>

      <div className="menu-section" id="plato">
        <h2 className="section-title">AL PLATO</h2>
        <Carta
          nombre="Milanesa con Papas"
          descripcion="Milanesa de carne o pollo con papas fritas"
          precio="$8.000"
          imagen="img/milapapas.jpg"
        />
        <Carta
          nombre="Pasta Boloñesa"
          descripcion="Fideos con salsa boloñesa y queso rallado"
          precio="$7.500"
          imagen="img/pasta.jpg"
        />
        <Carta
          nombre="Empanadas"
          descripcion="Carne, pollo, jamón y queso (docena)"
          precio="$2.000ud."
          imagen="img/empanadas.jpg"
        />
      </div>

      <div className="menu-section" id="bebidas">
        <h2 className="section-title">BEBIDAS</h2>
        <Carta
          nombre="Gaseosa"
          descripcion="Coca Cola, Sprite, Fanta (500ml)"
          precio="$2.500"
          imagen="img/gaseosas.jpg"
        />
        <Carta
          nombre="Agua Mineral"
          descripcion="Agua con o sin gas (500ml)"
          precio="$1.800"
          imagen="img/aguas.jpg"
        />
        <Carta
          nombre="Cerveza"
          descripcion="Quilmes, Brahma (1L)"
          precio="$4.000"
          imagen="img/cervezas.jpg"
        />
      </div>
    </div>
  );
}

export default Menu;