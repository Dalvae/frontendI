import ProductCard from './ProductCard'

function ProductList({ productos, carrito, onAgregar }) {
  // cuando la busqueda no encuentra nada
  if (productos.length === 0) {
    return <div className="alert alert-info"><i className="bi bi-search me-2"></i>No encontramos juegos con ese filtro, prueba con otra busqueda.</div>
  }

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {productos.map((p) => (
        <ProductCard
          key={p.id}
          producto={p}
          enCarrito={carrito.some((item) => item.id === p.id)}
          onAgregar={onAgregar}
        />
      ))}
    </div>
  )
}

export default ProductList
