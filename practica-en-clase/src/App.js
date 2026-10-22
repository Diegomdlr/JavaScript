// Importa el hook 'useState' de React, que permite a la aplicación recordar y actualizar datos (el estado).
import { useState } from 'react';
// Importa los estilos predeterminados de Bootstrap para el diseño estructurado y responsivo.
import 'bootstrap/dist/css/bootstrap.min.css';
// Importa la librería de iconos de Bootstrap (para poder usar las etiquetas <i className="bi...">).
import 'bootstrap-icons/font/bootstrap-icons.css'; 
// Importa tu archivo de estilos personalizados (donde configuraste los fondos, animaciones y sombras).
import './App.css';

// Define la función principal que representa toda tu aplicación web.
function App() {
  // Crea un estado 'paciente' (iniciado vacío) y su función actualizadora 'setPaciente'.
  const [paciente, setPaciente] = useState('');
  // Crea un estado 'especialidad' (iniciado vacío) para el menú desplegable.
  const [especialidad, setEspecialidad] = useState('');
  // Crea un estado 'fecha' (iniciado vacío) para almacenar el día seleccionado.
  const [fecha, setFecha] = useState('');
  // Crea un estado 'hora' (iniciado vacío) para almacenar la hora seleccionada.
  const [hora, setHora] = useState('');
  // Crea un estado 'citas' como un ARREGLO VACÍO ([]). Aquí se guardará la lista de todas las citas programadas.
  const [citas, setCitas] = useState([]);

// Crea la función que se ejecuta al presionar el botón "Registrar Cita" (enviar el formulario).
  const manejarEnvio = (e) => {
    // Evita el comportamiento por defecto del navegador de recargar toda la página al enviar un formulario.
    e.preventDefault();
    
    // Verifica si ALGUNO de los campos obligatorios está vacío.
    if (!paciente || !especialidad || !fecha || !hora) {
      // Si falta algún dato, lanza una ventana de alerta advirtiendo al usuario.
      alert('Por favor, completa todos los campos.');
      // Detiene la ejecución de la función aquí mismo para no guardar una cita a medias.
      return;
    }

    // Crea un nuevo objeto (diccionario) que agrupa todos los datos de la cita.
    const nuevaCita = {
      // Genera un ID único e irrepetible usando la fecha/hora exacta actual en milisegundos.
      id: Date.now(),
      // Guarda el valor actual del estado 'paciente'.
      paciente,
      // Guarda el valor actual del estado 'especialidad'.
      especialidad,
      // Guarda el valor actual del estado 'fecha'.
      fecha,
      // Guarda el valor actual del estado 'hora'.
      hora
    };

    // Actualiza la lista principal: toma todas las citas existentes (...citas) y agrega la 'nuevaCita' al final.
    setCitas([...citas, nuevaCita]);
    
    // Limpia el input del paciente dejándolo en blanco.
    setPaciente('');
    // Restablece el selector de especialidad.
    setEspecialidad('');
    // Limpia el input de fecha.
    setFecha('');
    // Limpia el input de hora.
    setHora('');
  };

// Crea la función que recibe el 'id' de una cita específica para borrarla.
  const eliminarCita = (id) => {
    // Reconstruye el arreglo de citas: filtra y CONSERVA solo aquellas citas cuyo ID sea DIFERENTE al que queremos borrar.
    const citasActualizadas = citas.filter(cita => cita.id !== id);
    // Actualiza el estado principal con esta nueva lista (que ya no tiene la cita borrada).
    setCitas(citasActualizadas);
  };

// Renderiza el contenido de la aplicación en la pantalla.
  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-dark mb-2">
          <i className="bi bi-hospital fs-1 text-primary me-2"></i>
          Clínica Salud
        </h1>
        <p className="text-muted fs-5">Sistema de Gestión de Citas Médicas</p>
      </div>

      <div className="row">
        {/* Formulario */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm card-hover">
            <div className="card-header bg-gradient-primary text-white py-3">
              <h5 className="mb-0 fw-bold"><i className="bi bi-person-plus-fill me-2"></i>Nueva Cita</h5>
            </div>
            <div className="card-body p-4">
              <form onSubmit={manejarEnvio}>
                <div className="mb-3">
                  <label className="form-label text-secondary fw-semibold">Nombre del Paciente</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light"><i className="bi bi-person"></i></span>
                    <input type="text" className="form-control" placeholder="Ej. Carlos Mendoza" 
                      value={paciente} onChange={(e) => setPaciente(e.target.value)} 
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label text-secondary fw-semibold">Especialidad</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light"><i className="bi bi-stethoscope"></i></span>
                    <select className="form-select" value={especialidad} onChange={(e) => setEspecialidad(e.target.value)}>
                      <option value="">Seleccione...</option>
                      <option value="Medicina General">Medicina General</option>
                      <option value="Pediatría">Pediatría</option>
                      <option value="Cardiología">Cardiología</option>
                      <option value="Dermatología">Dermatología</option>
                      <option value="Odontología">Odontología</option>
                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label text-secondary fw-semibold">Fecha</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light"><i className="bi bi-calendar-event"></i></span>
                    <input type="date" className="form-control" 
                      value={fecha} onChange={(e) => setFecha(e.target.value)} 
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="form-label text-secondary fw-semibold">Hora</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light"><i className="bi bi-clock"></i></span>
                    <input type="time" className="form-control" 
                      value={hora} onChange={(e) => setHora(e.target.value)} 
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100 fw-bold btn-animado py-2">
                  <i className="bi bi-calendar-check me-2"></i>Registrar Cita
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className="col-md-8">
          <div className="card shadow-sm card-hover">
            <div className="card-header bg-gradient-success text-dark py-3 d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-bold"><i className="bi bi-card-list me-2"></i>Agenda de Hoy</h5>
              <span className="badge bg-white text-success rounded-pill px-3 py-2 fs-6 shadow-sm">
                Total: {citas.length}
              </span>
            </div>
            <div className="card-body p-4">
              {citas.length === 0 ? (
                <div className="empty-state text-center mt-2">
                  <i className="bi bi-inbox text-muted" style={{ fontSize: '3rem' }}></i>
                  <h5 className="text-muted mt-3">No hay citas programadas</h5>
                  <p className="text-muted mb-0">Las nuevas reservas aparecerán aquí.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th className="text-secondary"><i className="bi bi-person me-1"></i>Paciente</th>
                        <th className="text-secondary"><i className="bi bi-heart-pulse me-1"></i>Especialidad</th>
                        <th className="text-secondary"><i className="bi bi-calendar me-1"></i>Fecha</th>
                        <th className="text-secondary"><i className="bi bi-clock me-1"></i>Hora</th>
                        <th className="text-secondary text-center">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {citas.map((cita) => (
                        <tr key={cita.id}>
                          <td className="fw-semibold">{cita.paciente}</td>
                          <td><span className="badge bg-light text-dark border">{cita.especialidad}</span></td>
                          <td>{cita.fecha}</td>
                          <td>{cita.hora}</td>
                          <td className="text-center">
                            <button className="btn btn-outline-danger btn-sm btn-animado rounded-circle" onClick={() => eliminarCita(cita.id)} title="Eliminar cita">
                              <i className="bi bi-trash3-fill"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;