function Carta({ nombre, descripcion, precio, imagen }) {
  return (
    <div className="menu-card">
      <img
        src={imagen || "https://via.placeholder.com/140x140/fc913a/ffffff?text=Comida"}
        alt={nombre}
        className="menu-image"
      />
      <div className="menu-info">
        <div className="menu-name">{nombre}</div>
        <div className="menu-description">{descripcion}</div>
        <div className="menu-price">PRECIO: {precio}</div>
      </div>
      <button className="add-btn">+</button>
    </div>
  );
}

export default Carta;