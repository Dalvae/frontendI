// las categorias estaban en la navbar en la semana 8, las movi aca arriba del catalogo
const CATEGORIAS = [
  { id: 'todas', nombre: 'Todos', icono: 'bi-grid' },
  { id: 'pc', nombre: 'PC', icono: 'bi-pc-display' },
  { id: 'consola', nombre: 'Consola', icono: 'bi-joystick' },
]

function FiltroCategorias({ categoria, setCategoria, productos }) {
  // cuantos juegos hay de cada categoria para mostrarlo en el boton
  const contar = (id) => {
    if (id === 'todas') return productos.length
    return productos.filter((p) => p.categoria === id).length
  }

  return (
    <div className="d-flex flex-wrap gap-2 mb-4">
      {CATEGORIAS.map((c) => (
        <button
          key={c.id}
          type="button"
          className={categoria === c.id ? 'btn btn-primary' : 'btn btn-outline-primary'}
          onClick={() => setCategoria(c.id)}
        >
          <i className={'bi ' + c.icono + ' me-1'}></i>
          {c.nombre}
          <span className="badge bg-light text-dark ms-2">{contar(c.id)}</span>
        </button>
      ))}
    </div>
  )
}

export default FiltroCategorias
