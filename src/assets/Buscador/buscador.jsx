import React, { useState } from 'react';
import './buscador.css';

const Buscador = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="search-box">
      <i className="bi bi-search"></i>
      <input
        type="text"
        className="form-control"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Buscador;