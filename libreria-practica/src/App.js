// Importa el hook 'useState' de React, que nos permite guardar y actualizar datos (el estado) en la aplicación.
import { useState } from 'react'; 
// Importa los estilos base de Bootstrap para tener un diseño responsivo.
import 'bootstrap/dist/css/bootstrap.min.css'; 
// Importa la librería de iconos de Bootstrap (para usar las etiquetas <i className="bi...">).
import 'bootstrap-icons/font/bootstrap-icons.css'; 
// Importa nuestro archivo de estilos personalizados (donde pusimos los colores, degradados y animaciones).
import './App.css';

// Declara la función principal del componente App.
function App() { 
  // Crea un estado 'nombre' (y su actualizador 'setNombre') iniciado como un texto vacío.
  const [nombre, setNombre] = useState(''); 
  // Crea un estado 'categoria' iniciado vacío para el selector.
  const [categoria, setCategoria] = useState(''); 
  // Crea un estado 'precio' iniciado vacío para el input numérico.
  const [precio, setPrecio] = useState(''); 
  // Crea un estado 'cantidad' iniciado vacío para el input numérico.
  const [cantidad, setCantidad] = useState(''); 
  // Crea un estado 'productos' que es un ARREGLO VACÍO ([]). Aquí se guardará la lista de todo el inventario.
  const [productos, setProductos] = useState([]);

 // Crea una función que se ejecutará cuando el usuario presione el botón "Guardar en Inventario".
  const manejarEnvio = (e) => { 
    // Evita que la página web se recargue por defecto al enviar el formulario.
    e.preventDefault(); 
    
    // Verifica si ALGUNO de los 4 campos está vacío (!nombre significa "si no hay nombre").
    if (!nombre || !categoria || !precio || !cantidad) { 
      // Si falta algún dato, muestra una alerta en el navegador.
      alert('Por favor, completa todos los campos.'); 
      // Detiene la ejecución de la función para que no se guarde un producto incompleto.
      return; 
    }
    
    // Verifica si el precio o la cantidad son números negativos o cero.
    if (precio <= 0 || cantidad <= 0) { 
      // Si es así, muestra un mensaje de error.
      alert('El precio y la cantidad deben ser mayores a cero.'); 
      // Detiene la ejecución.
      return; 
    }

    // Crea un nuevo objeto (diccionario) con los datos del producto validado.
    const nuevoProducto = { 
      // Genera un ID único usando la fecha y hora exacta en milisegundos.
      id: Date.now(), 
      // Guarda el nombre actual.
      nombre, 
      // Guarda la categoría actual.
      categoria, 
      // Convierte el texto del precio a un número decimal (float).
      precio: parseFloat(precio), 
      // Convierte el texto de la cantidad a un número entero (base 10).
      cantidad: parseInt(cantidad, 10) 
    };

    // Actualiza la lista de productos: toma todos los productos que ya existían (...productos) y le añade el 'nuevoProducto' al final.
    setProductos([...productos, nuevoProducto]); 
    
    // Limpia el input del nombre dejándolo vacío.
    setNombre(''); 
    // Limpia el selector de categoría.
    setCategoria(''); 
    // Limpia el input del precio.
    setPrecio(''); 
    // Limpia el input de cantidad.
    setCantidad(''); 
  };

  // Crea una función que elimina un producto del inventario según su ID. 
  const eliminarProducto = (id) => {
    setProductos(productos.filter(prod => prod.id !== id));
  };

  // Calcula el total de productos registrados en el inventario.
  const totalProductosRegistrados = productos.length;
  // Calcula el valor total del inventario sumando el precio por la cantidad de cada producto.
  const valorTotalInventario = productos.reduce(
    (total, prod) => total + (prod.precio * prod.cantidad), 0
  );

  // Renderiza el contenido de la aplicación en la pantalla.
  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-dark mb-2">
          <i className="bi bi-book fs-1 text-primary me-2" style={{ color: '#667eea' }}></i>
          Librería "El Estudiante"
        </h1>
        <p className="text-muted fs-5">Sistema de Control de Inventario</p>
      </div>

      <div className="row mb-4">
        <div className="col-md-6 mb-3 mb-md-0">
          <div className="stat-card p-3 d-flex align-items-center">
            <div className="bg-light p-3 rounded-circle me-3">
              <i className="bi bi-box-seam fs-3 text-primary"></i>
            </div>
            <div>
              <p className="text-muted mb-0 fw-semibold">Productos Registrados</p>
              <h3 className="mb-0 fw-bold">{totalProductosRegistrados}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="stat-card warning p-3 d-flex align-items-center">
            <div className="bg-light p-3 rounded-circle me-3">
              <i className="bi bi-cash-coin fs-3 text-warning"></i>
            </div>
            <div>
              <p className="text-muted mb-0 fw-semibold">Valor Total del Inventario</p>
              <h3 className="mb-0 fw-bold">S/ {valorTotalInventario.toFixed(2)}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm card-hover">
            <div className="card-header bg-gradient-indigo text-white py-3">
              <h5 className="mb-0 fw-bold"><i className="bi bi-plus-circle me-2"></i>Nuevo Producto</h5>
            </div>
            <div className="card-body p-4">
              <form onSubmit={manejarEnvio}>
                <div className="mb-3">
                  <label className="form-label text-secondary fw-semibold">Nombre del Producto</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light"><i className="bi bi-tag"></i></span>
                    <input type="text" className="form-control" placeholder="Ej. Cuaderno A4" 
                      value={nombre} onChange={(e) => setNombre(e.target.value)} 
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label text-secondary fw-semibold">Categoría</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light"><i className="bi bi-collection"></i></span>
                    <select className="form-select" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                      <option value="">Seleccione...</option>
                      <option value="Libros de Texto">Libros de Texto</option>
                      <option value="Útiles Escolares">Útiles Escolares</option>
                      <option value="Arte y Dibujo">Arte y Dibujo</option>
                      <option value="Tecnología">Tecnología</option>
                      <option value="Oficina">Oficina</option>
                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label text-secondary fw-semibold">Precio (S/)</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">S/</span>
                    <input type="number" step="0.10" className="form-control" placeholder="0.00"
                      value={precio} onChange={(e) => setPrecio(e.target.value)} 
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="form-label text-secondary fw-semibold">Cantidad Disponible</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light"><i className="bi bi-123"></i></span>
                    <input type="number" className="form-control" placeholder="0"
                      value={cantidad} onChange={(e) => setCantidad(e.target.value)} 
                    />
                  </div>
                </div>
                <button type="submit" className="btn text-white w-100 fw-bold btn-animado py-2" style={{ backgroundColor: '#667eea' }}>
                  <i className="bi bi-save me-2"></i>Guardar en Inventario
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card shadow-sm card-hover h-100">
            <div className="card-header bg-white border-bottom py-3">
              <h5 className="mb-0 fw-bold text-dark"><i className="bi bi-table me-2 text-primary"></i>Existencias</h5>
            </div>
            <div className="card-body p-4">
              {productos.length === 0 ? (
                <div className="empty-state text-center mt-2">
                  <i className="bi bi-boxes text-muted" style={{ fontSize: '3rem' }}></i>
                  <h5 className="text-muted mt-3">Inventario Vacío</h5>
                  <p className="text-muted mb-0">Registra productos para visualizar el stock.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th className="text-secondary">Producto</th>
                        <th className="text-secondary">Categoría</th>
                        <th className="text-secondary">Precio Unit.</th>
                        <th className="text-secondary">Stock</th>
                        <th className="text-secondary">Subtotal</th>
                        <th className="text-secondary text-center">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productos.map((prod) => (
                        <tr key={prod.id}>
                          <td className="fw-semibold">{prod.nombre}</td>
                          <td><span className="badge bg-light text-dark border">{prod.categoria}</span></td>
                          <td>S/ {prod.precio.toFixed(2)}</td>
                          <td>
                            <span className={`badge ${prod.cantidad < 5 ? 'bg-danger' : 'bg-success'}`}>
                              {prod.cantidad} unds
                            </span>
                          </td>
                          <td className="fw-bold text-dark">
                            S/ {(prod.precio * prod.cantidad).toFixed(2)}
                          </td>
                          <td className="text-center">
                            <button className="btn btn-outline-danger btn-sm btn-animado rounded-circle" onClick={() => eliminarProducto(prod.id)} title="Eliminar producto">
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