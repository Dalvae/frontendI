import CartItem from './CartItem'

function Cart({ items, totalProductos, totalPagar, cambiarCantidad, eliminar, vaciar }) {
  return (
    <section className="card shadow-sm mb-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2 className="h5 mb-0">Tu carrito ({totalProductos})</h2>
        {items.length > 0 && (
          <button className="btn btn-sm btn-outline-secondary" onClick={vaciar}>
            Vaciar carrito
          </button>
        )}
      </div>

      {/* si no hay nada muestro el mensaje */}
      {items.length === 0 ? (
        <div className="card-body text-center text-secondary py-4">
          Tu carrito esta vacio, agrega algun juego del catalogo.
        </div>
      ) : (
        <>
          <ul className="list-group list-group-flush">
            {items.map((item) => (
              <CartItem
                key={item.producto.id}
                producto={item.producto}
                cantidad={item.cantidad}
                cambiarCantidad={cambiarCantidad}
                eliminar={eliminar}
              />
            ))}
          </ul>
          <div className="card-footer d-flex justify-content-between fs-5">
            <span>Total</span>
            <strong>${totalPagar.toLocaleString('es-CL')}</strong>
          </div>
        </>
      )}
    </section>
  )
}

export default Cart
