import { useState } from 'react'

const VACIO = { nombre: '', categoria: 'pc', genero: '', precio: '', descripcion: '', imagen: '' }

function AgregarJuego({ onAgregarJuego }) {
  const [juego, setJuego] = useState(VACIO)
  const [error, setError] = useState('')
  const [agregado, setAgregado] = useState('')

  const cambiar = (e) => {
    setJuego({ ...juego, [e.target.name]: e.target.value })
  }

  const guardar = (e) => {
    e.preventDefault()
    setAgregado('')

    if (juego.nombre.trim() === '' || juego.genero.trim() === '' || juego.descripcion.trim() === '') {
      setError('Completa el nombre, el genero y la descripcion.')
      return
    }
    const precio = Number(juego.precio)
    if (!precio || precio <= 0) {
      setError('El precio tiene que ser un numero mayor a 0.')
      return
    }

    // si no ponen link de imagen uso una por defecto
    onAgregarJuego({
      nombre: juego.nombre.trim(),
      categoria: juego.categoria,
      genero: juego.genero.trim(),
      precio: precio,
      descripcion: juego.descripcion.trim(),
      imagen: juego.imagen.trim() !== '' ? juego.imagen.trim() : 'img/sin-imagen.svg',
      alt: 'Imagen de ' + juego.nombre.trim(),
    })
    setError('')
    setAgregado(juego.nombre.trim())
    setJuego(VACIO)
  }

  return (
    <form className="card card-body shadow-sm" onSubmit={guardar} noValidate>
      {error && <div className="alert alert-danger"><i className="bi bi-exclamation-triangle-fill me-2"></i>{error}</div>}
      {agregado && <div className="alert alert-success"><i className="bi bi-check-circle-fill me-2"></i>{agregado} se agrego al catalogo.</div>}

      <div className="row g-3">
        <div className="col-md-6">
          <label htmlFor="juego-nombre" className="form-label">Nombre</label>
          <input id="juego-nombre" name="nombre" className="form-control" value={juego.nombre} onChange={cambiar} />
        </div>
        <div className="col-md-3">
          <label htmlFor="juego-categoria" className="form-label">Categoria</label>
          <select id="juego-categoria" name="categoria" className="form-select" value={juego.categoria} onChange={cambiar}>
            <option value="pc">PC</option>
            <option value="consola">Consola</option>
          </select>
        </div>
        <div className="col-md-3">
          <label htmlFor="juego-genero" className="form-label">Genero</label>
          <input id="juego-genero" name="genero" className="form-control" value={juego.genero} onChange={cambiar} />
        </div>
        <div className="col-md-4">
          <label htmlFor="juego-precio" className="form-label">Precio</label>
          <input id="juego-precio" name="precio" type="number" min="1" className="form-control" value={juego.precio} onChange={cambiar} />
        </div>
        <div className="col-md-8">
          <label htmlFor="juego-imagen" className="form-label">Link de la imagen (opcional)</label>
          <input id="juego-imagen" name="imagen" type="url" className="form-control" placeholder="https://..." value={juego.imagen} onChange={cambiar} />
        </div>
        <div className="col-12">
          <label htmlFor="juego-descripcion" className="form-label">Descripcion</label>
          <textarea id="juego-descripcion" name="descripcion" rows="2" className="form-control" value={juego.descripcion} onChange={cambiar}></textarea>
        </div>
      </div>

      <button className="btn btn-success align-self-start mt-3" type="submit">
        <i className="bi bi-plus-circle me-1"></i>Agregar juego
      </button>
    </form>
  )
}

export default AgregarJuego
