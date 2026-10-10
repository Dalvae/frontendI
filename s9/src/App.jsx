import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import FiltroCategorias from './components/FiltroCategorias'
import Footer from './components/Footer'
import ContactForm from './components/ContactForm'

function App() {
  const [productos, setProductos] = useState([])
  const [carrito, setCarrito] = useState([]) // aca guardo {id, cantidad}
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [categoria, setCategoria] = useState('todas')
  const [busqueda, setBusqueda] = useState('')
  const [mostrarCarrito, setMostrarCarrito] = useState(false)

  // trae los productos del json, la deje aparte para poder llamarla de nuevo con el boton reintentar
  const cargarProductos = () => {
    setCargando(true)
    setError(null)
    // como es un json local carga altiro, asi que espero un rato al azar (entre 0,8 y 2 seg)
    // antes del fetch para que parezca una api de verdad, asi el error tambien se demora
    const demora = 800 + Math.random() * 1200
    new Promise((resolve) => setTimeout(resolve, demora))
      .then(() => fetch(import.meta.env.BASE_URL + 'data/productos.json'))
      .then((res) => {
        if (!res.ok) throw new Error('error ' + res.status)
        return res.json()
      })
      .then((data) => {
        setProductos(data)
        setCargando(false)
      })
      .catch(() => {
        setError('No pudimos cargar los productos, intenta de nuevo.')
        setCargando(false)
      })
  }

  useEffect(() => {
    cargarProductos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // cuantos juegos hay en total en el carrito (sumando cantidades)
  let totalProductos = 0
  carrito.forEach((item) => {
    totalProductos += item.cantidad
  })

  // esto lo vi en un video, cambia el titulo de la pestaña con el numero del carrito
  useEffect(() => {
    if (totalProductos > 0) {
      document.title = '(' + totalProductos + ') Dad Gamers'
    } else {
      document.title = 'Dad Gamers'
    }
  }, [totalProductos])

  const agregar = (id) => {
    // si ya esta no lo agrego otra vez, la cantidad se cambia en el carrito
    if (carrito.find((item) => item.id === id)) return
    setCarrito([...carrito, { id: id, cantidad: 1 }])
  }

  const cambiarCantidad = (id, cambio) => {
    const nuevo = carrito.map((item) => {
      if (item.id === id) {
        return { ...item, cantidad: item.cantidad + cambio }
      }
      return item
    })
    // si queda en 0 lo saco
    setCarrito(nuevo.filter((item) => item.cantidad > 0))
  }

  const eliminar = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id))
  }

  // filtro por categoria y por lo que se busco
  const productosFiltrados = productos.filter((p) => {
    const okCategoria = categoria === 'todas' || p.categoria === categoria
    const okBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    return okCategoria && okBusqueda
  })

  // junto el carrito con los datos del producto para mostrarlo
  const items = carrito.map((item) => {
    const producto = productos.find((p) => p.id === item.id)
    return { producto: producto, cantidad: item.cantidad }
  })

  let totalPagar = 0
  items.forEach((item) => {
    const precio = item.producto.precioOferta ? item.producto.precioOferta : item.producto.precio
    totalPagar += precio * item.cantidad
  })

  let contenido
  if (cargando) {
    contenido = (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>
        <p className="mt-3 mb-0">Cargando productos...</p>
      </div>
    )
  } else if (error) {
    contenido = (
      <div className="alert alert-danger d-flex justify-content-between align-items-center">
        <span><i className="bi bi-exclamation-triangle-fill me-2"></i>{error}</span>
        <button className="btn btn-sm btn-danger" onClick={cargarProductos}>
          <i className="bi bi-arrow-clockwise me-1"></i>Reintentar
        </button>
      </div>
    )
  } else {
    contenido = <ProductList productos={productosFiltrados} carrito={carrito} onAgregar={agregar} />
  }

  return (
    <>
      <header>
        <Navbar
          setBusqueda={setBusqueda}
          totalProductos={totalProductos}
          mostrarCarrito={mostrarCarrito}
          setMostrarCarrito={setMostrarCarrito}
        />
      </header>

      <main>
        <section id="inicio" className="hero text-white text-center py-5">
          <div className="container">
            <h1 className="display-5 fw-bold">Dad Gamers</h1>
            <p className="lead mb-0">Videojuegos para papas que todavia le dan al control</p>
          </div>
        </section>

        <div className="container py-4">
          {mostrarCarrito && (
            <Cart
              items={items}
              totalProductos={totalProductos}
              totalPagar={totalPagar}
              cambiarCantidad={cambiarCantidad}
              eliminar={eliminar}
              vaciar={() => setCarrito([])}
            />
          )}

          <section id="catalogo" className="mb-5">
            <h2 className="mb-3"><i className="bi bi-grid me-2"></i>Catalogo</h2>
            <FiltroCategorias categoria={categoria} setCategoria={setCategoria} productos={productos} />
            {contenido}
          </section>

          <section id="contacto" className="mb-4">
            <h2 className="mb-3"><i className="bi bi-envelope me-2"></i>Contacto</h2>
            <ContactForm />
          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default App
