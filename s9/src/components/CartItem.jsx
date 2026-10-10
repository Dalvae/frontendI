function CartItem({ producto, cantidad, cambiarCantidad, eliminar }) {
  const precio = producto.precioOferta ? producto.precioOferta : producto.precio
  const imagen = producto.imagen.startsWith('http') ? producto.imagen : import.meta.env.BASE_URL + producto.imagen

  return (
    <li className="list-group-item d-flex align-items-center gap-3">
      <img className="carrito-img rounded" src={imagen} alt={producto.alt} />
      <div className="flex-grow-1">
        <div className="fw-semibold">{producto.nombre}</div>
        <div className="small text-secondary">${precio.toLocaleString('es-CL')} c/u</div>
      </div>
      <div className="btn-group btn-group-sm">
        <button className="btn btn-outline-secondary" onClick={() => cambiarCantidad(producto.id, -1)}>
          <i className="bi bi-dash"></i>
        </button>
        <span className="btn btn-light disabled">{cantidad}</span>
        <button className="btn btn-outline-secondary" onClick={() => cambiarCantidad(producto.id, 1)}>
          <i className="bi bi-plus"></i>
        </button>
      </div>
      <div className="fw-bold text-end" style={{ minWidth: '5.5rem' }}>
        ${(precio * cantidad).toLocaleString('es-CL')}
      </div>
      <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(producto.id)}>
        <i className="bi bi-trash3 me-1"></i>Eliminar
      </button>
    </li>
  )
}

export default CartItem
