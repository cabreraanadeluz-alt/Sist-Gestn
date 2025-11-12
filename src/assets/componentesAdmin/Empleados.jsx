export default function Empleados() {
  const empleadosData = [
    { sector: 'Caja', manana: 'María López', tarde: 'Carlos Díaz', noche: 'María López' },
    { sector: 'Meseros', manana: 'Julián Pérez', tarde: 'Camila Soto', noche: 'Matías Herrera' },
    { sector: 'Cocina', manana: 'Pedro Gómez', tarde: 'Ana Torres', noche: 'Pedro Gómez' },
    { sector: 'Limpieza', manana: 'Laura Castro', tarde: 'Nicolás Ruiz', noche: 'Laura Castro' },
    { sector: 'Reparto', manana: 'Tomás Navarro', tarde: 'Martina Rojas', noche: 'Franco Suárez' },
    { sector: 'Barra', manana: 'Valentina Ramos', tarde: 'Daniel Ponce', noche: 'Valentina Ramos' },
    { sector: 'Supervisión', manana: 'Paula Giménez', tarde: 'Federico Ruiz', noche: 'Paula Giménez' },
  ];

  return (
    <main>
      <section className="my-5">
        <div className="container text-center">
          <div
            className="card shadow-lg p-4 mx-auto border-0 rounded-4"
            style={{ maxWidth: '900px' }}
          >
            <h1 className="mb-4">Cronograma de trabajo</h1>
            <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered align-middle text-center mb-0">
                <thead className="bg-primary text-white">
                  <tr>
                    <th>Sector</th>
                    <th>Turno mañana</th>
                    <th>Turno tarde</th>
                    <th>Turno noche</th>
                  </tr>
                </thead>
                <tbody>
                  {empleadosData.map((fila, index) => (
                    <tr key={index}>
                      <th scope="row">{fila.sector}</th>
                      <td>{fila.manana}</td>
                      <td>{fila.tarde}</td>
                      <td>{fila.noche}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
