import './inicio.css';
import { useNavigate } from 'react-router-dom';

export default function Inicio() {
  const navigate = useNavigate();

  const menuOptions = [
    { id: 1, title: 'Pizzas', image: '/img/pizza.jpg', alt: 'Pizzas' },
    { id: 2, title: 'Entre Panes', image: '/img/entrePanes.jpg', alt: 'Sandwiches' },
    { id: 3, title: 'Al Plato', image: '/img/alPlato.jpg', alt: 'Platos' },
    { id: 4, title: 'Picadas & Tablas', image: '/img/picadas.jpg', alt: 'Picadas y tablas' },
    { id: 5, title: 'Bebidas', image: '/img/bebidas.jpg', alt: 'Bebidas' },
  ];

  const handleIrALaCarta = (categoria) => {
    navigate('/carta', { state: { categoria } });
  };

  return (
    <main className="inicio">
      <section className="hero">
        <button className="hero-btn" onClick={() => navigate('/carta')}>
          Explorar carta
        </button>
      </section>

      <section className="inicio-contenido">
        <div className="inicio-opciones">
          <h2 className="inicio-titulo">Nuestras opciones</h2>
          <div className="opciones-grid">
            {menuOptions.map((option) => (
              <button
                key={option.id}
                className="opcion-card"
                onClick={() => handleIrALaCarta(option.title)}
              >
                <img src={option.image} alt={option.alt} />
                <span>{option.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div id="ubicacion" className="inicio-ubicacion">
          <h2 className="inicio-titulo">Dónde nos encontramos</h2>
          <div className="mapa-wrap">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3543.6483440207894!2d-65.59801942486789!3d-27.355460411847776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9423cf606d2c1f93%3A0x9a3e0dd70a67d834!2sUniversidad%20Tecnol%C3%B3gica%20Nacional%20%E2%80%93%20Facultad%20Regional%20Tucum%C3%A1n%20(U.T.N.%20%E2%80%93%20F.R.T.)%20%5BExtensi%C3%B3n%20%C3%81ulica%20Concepci%C3%B3n%5D!5e0!3m2!1ses!2sar!4v1762351982103!5m2!1ses!2sar"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación del restaurante"
            />
          </div>
          <h3 className="inicio-horario-titulo">Horarios de atención</h3>
          <p className="inicio-horario">
            Lunes a domingos<br />
            08:30 - 13:30 y 17:30 - 00:30
          </p>
        </div>
      </section>
    </main>
  );
}