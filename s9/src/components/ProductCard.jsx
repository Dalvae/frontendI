function ProductCard({ producto, enCarrito, onAgregar }) {
  return (
    <div className="col">
      <div className="card h-100 shadow-sm">
        <img className="card-img-top" src={import.meta.env.BASE_URL + producto.imagen} alt={producto.alt} />
        <div className="card-body d-flex flex-column">
          <h2 className="h5 card-title">
            {producto.nombre}
            {producto.precioOferta && <span className="badge bg-danger ms-2"><i className="bi bi-fire me-1"></i>Oferta</span>}
          </h2>
          <p className="text-secondary small mb-2"><i className="bi bi-tag me-1"></i>{producto.genero}</p>
          <p className="card-text flex-grow-1">{producto.descripcion}</p>

          {/* si tiene oferta muestro el precio normal tachado */}
          {producto.precioOferta ? (
            <p className="mb-3">
              <del className="text-secondary me-2">${producto.precio.toLocaleString('es-CL')}</del>
              <span className="precio text-danger">${producto.precioOferta.toLocaleString('es-CL')}</span>
            </p>
          ) : (
            <p className="precio mb-3">${producto.precio.toLocaleString('es-CL')}</p>
          )}

          <button className={enCarrito ? 'btn btn-success' : 'btn btn-primary'} onClick={() => onAgregar(producto.id)}>
            {enCarrito ? (
              <><i className="bi bi-check-circle-fill me-1"></i>En el carrito</>
            ) : (
              <><i className="bi bi-cart-plus me-1"></i>Agregar al carrito</>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
