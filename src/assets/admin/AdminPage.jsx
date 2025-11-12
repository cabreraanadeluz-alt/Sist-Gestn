
import React, { useState } from "react";
import Empleados from '../componentesAdmin/Empleados';
import GestionVentas from "../componentesAdmin/GestionVentas";
import HistorialPedidos from "../componentesAdmin/HistorialPedidos";

export default function AdminPage() {
  const [active, setActive] = useState("ventas");

  const menuItems = [
    { id: "empleados", label: "Gestión Empleados" },
    { id: "ventas", label: "Gestión Ventas" },
    { id: "historial", label: "Historial" },
  ];

  const styles = {
    app: {
      display: "flex",
      minHeight: "100vh",
      fontFamily: "Arial, sans-serif",
    },
    sidebar: {
      width: "250px",
      backgroundColor: "#212529",
      color: "#fff",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
    },
    logo: {
      marginBottom: "30px",
      fontSize: "24px",
      textAlign: "center",
    },
    button: {
      padding: "12px 20px",
      marginBottom: "10px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
      textAlign: "left",
      transition: "all 0.3s",
    },
    content: {
      flex: 1,
      padding: "30px",
      backgroundColor: "#f8f9fa",
    },
  };

  return (
    <div style={styles.app}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>🍕 Panel Admin</h2>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            style={{
              ...styles.button,
              backgroundColor: active === item.id ? "#007bff" : "transparent",
              color: active === item.id ? "#fff" : "#ddd",
            }}
          >
            {item.label}
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <main style={styles.content}>
        {active === "empleados" && <Empleados />}
        {active === "ventas" && <GestionVentas />}
        {active === "historial" && <HistorialPedidos />}
      </main>
    </div>
  );
}