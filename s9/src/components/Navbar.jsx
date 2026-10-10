import { useState } from 'react'

// los links a cada seccion de la pagina
const SECCIONES = [
  { id: 'inicio', nombre: 'Inicio', icono: 'bi-house' },
  { id: 'catalogo', nombre: 'Catalogo', icono: 'bi-grid' },
  { id: 'agregar', nombre: 'Agregar juego', icono: 'bi-plus-square' },
  { id: 'contacto', nombre: 'Contacto', icono: 'bi-envelope' },
]

function Navbar({ setBusqueda, totalProductos, mostrarCarrito, setMostrarCarrito }) {
  // lo que se escribe en el buscador, se manda recien cuando aprietan buscar
  const [texto, setTexto] = useState('')
  // para el menu hamburguesa en el celular (no importe el js de bootstrap, lo hago con un estado)
  const [menuAbierto, setMenuAbierto] = useState(false)

  const buscar = (e) => {
    e.preventDefault()
    setBusqueda(texto.trim())
    setMenuAbierto(false)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#inicio">
          <i className="bi bi-controller me-2"></i>Dad Gamers
        </a>

        <button className="navbar-toggler" type="button" onClick={() => setMenuAbierto(!menuAbierto)}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={menuAbierto ? 'collapse navbar-collapse show' : 'collapse navbar-collapse'}>
          <ul className="navbar-nav me-auto">
            {SECCIONES.map((s) => (
              <li className="nav-item" key={s.id}>
                <a className="nav-link" href={'#' + s.id} onClick={() => setMenuAbierto(false)}>
                  <i className={'bi ' + s.icono + ' me-1'}></i>
                  {s.nombre}
                </a>
              </li>
            ))}
          </ul>

          <form className="d-flex gap-2 my-2 my-lg-0" onSubmit={buscar}>
            <input
              className="form-control"
              type="search"
              placeholder="Buscar juego"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />
            <button className="btn btn-outline-light text-nowrap" type="submit">
              <i className="bi bi-search me-1"></i>Buscar
            </button>
          </form>

          {/* boton que cambia el texto si el carrito esta abierto */}
          <button
            className={'btn ms-lg-3 ' + (mostrarCarrito ? 'btn-warning' : 'btn-outline-warning')}
            onClick={() => setMostrarCarrito(!mostrarCarrito)}
          >
            {/* el icono tambien cambia, una x para cerrar */}
            <i className={mostrarCarrito ? 'bi bi-x-lg me-1' : 'bi bi-cart3 me-1'}></i>
            {mostrarCarrito ? 'Ocultar carrito' : 'Ver carrito'}
            {totalProductos > 0 && <span className="badge rounded-pill bg-danger ms-2">{totalProductos}</span>}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
