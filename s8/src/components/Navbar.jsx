import { useState } from 'react'

function Navbar({ categoria, setCategoria, setBusqueda, totalProductos, mostrarCarrito, setMostrarCarrito }) {
  // lo que se escribe en el buscador, se manda recien cuando aprietan buscar
  const [texto, setTexto] = useState('')

  const buscar = (e) => {
    e.preventDefault()
    setBusqueda(texto.trim())
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <span className="navbar-brand fw-bold">
          <i className="bi bi-controller me-2"></i>Dad Gamers
        </span>

        <ul className="navbar-nav flex-row gap-2 me-lg-auto">
          <li className="nav-item">
            <button
              className={'nav-link btn btn-link ' + (categoria === 'todas' ? 'active fw-bold' : '')}
              onClick={() => setCategoria('todas')}
            >
              <i className="bi bi-grid me-1"></i>Todos
            </button>
          </li>
          <li className="nav-item">
            <button
              className={'nav-link btn btn-link ' + (categoria === 'pc' ? 'active fw-bold' : '')}
              onClick={() => setCategoria('pc')}
            >
              <i className="bi bi-pc-display me-1"></i>PC
            </button>
          </li>
          <li className="nav-item">
            <button
              className={'nav-link btn btn-link ' + (categoria === 'consola' ? 'active fw-bold' : '')}
              onClick={() => setCategoria('consola')}
            >
              <i className="bi bi-joystick me-1"></i>Consola
            </button>
          </li>
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
    </nav>
  )
}

export default Navbar
