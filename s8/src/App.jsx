import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import Cart from './components/Cart'

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
    fetch(import.meta.env.BASE_URL + 'data/productos.json')
      .then((res) => {
        if (!res.ok) throw new Error('error ' + res.status)
        return res.json()
      })
      .then((data) => {
        // le puse un timeout para que se alcanze a ver el spinner, si no carga altiro
        setTimeout(() => {
          setProductos(data)
          setCargando(false)
        }, 800)
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
        <span>{error}</span>
        <button className="btn btn-sm btn-danger" onClick={cargarProductos}>
          Reintentar
        </button>
      </div>
    )
  } else {
    contenido = <ProductList productos={productosFiltrados} carrito={carrito} onAgregar={agregar} />
  }

  return (
    <>
      <Navbar
        categoria={categoria}
        setCategoria={setCategoria}
        setBusqueda={setBusqueda}
        totalProductos={totalProductos}
        mostrarCarrito={mostrarCarrito}
        setMostrarCarrito={setMostrarCarrito}
      />

      <header className="hero text-white text-center py-5">
        <div className="container">
          <h1 className="display-5 fw-bold">Dad Gamers</h1>
          <p className="lead mb-0">Videojuegos para papas que todavia le dan al control</p>
        </div>
      </header>

      <main className="container py-4">
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
        {contenido}
      </main>

      <footer className="bg-dark text-white-50 text-center py-3">
        <small>Dad Gamers - actividad sumativa 3, Desarrollo Frontend I</small>
      </footer>
    </>
  )
}

export default App
