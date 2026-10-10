import { useState } from 'react'

function ContactForm() {
  const [datos, setDatos] = useState({ nombre: '', email: '', mensaje: '' })
  const [errores, setErrores] = useState({})
  const [enviado, setEnviado] = useState(false)

  // un solo onChange para los 3 campos, usa el name del input
  const cambiar = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value })
    setEnviado(false)
  }

  const validar = () => {
    const nuevos = {}
    if (datos.nombre.trim() === '') {
      nuevos.nombre = 'Escribe tu nombre.'
    } else if (datos.nombre.trim().length < 3) {
      nuevos.nombre = 'El nombre tiene que tener al menos 3 letras.'
    }

    // esta expresion la saque de internet, revisa que tenga algo@algo.algo
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (datos.email.trim() === '') {
      nuevos.email = 'Escribe tu email.'
    } else if (!formatoEmail.test(datos.email.trim())) {
      nuevos.email = 'El email no es valido, por ejemplo: nombre@correo.cl'
    }

    if (datos.mensaje.trim() === '') {
      nuevos.mensaje = 'Escribe un mensaje.'
    } else if (datos.mensaje.trim().length < 10) {
      nuevos.mensaje = 'El mensaje es muy corto, minimo 10 caracteres.'
    }
    return nuevos
  }

  const enviar = (e) => {
    e.preventDefault()
    const encontrados = validar()
    setErrores(encontrados)

    // si no hay errores se "envia" (no hay backend, asi que solo muestro el mensaje)
    if (Object.keys(encontrados).length === 0) {
      setEnviado(true)
      setDatos({ nombre: '', email: '', mensaje: '' })
    }
  }

  // le pone la clase roja de bootstrap al campo que tiene error
  const clase = (campo) => (errores[campo] ? 'form-control is-invalid' : 'form-control')

  return (
    <div className="contacto-flex">
      <div className="card bg-dark text-white contacto-info">
        <div className="card-body">
          <h3 className="h5"><i className="bi bi-chat-dots me-2"></i>Hablemos</h3>
          <p className="mb-2">Si buscas un juego que no esta en el catalogo o tienes dudas con tu compra, escribenos.</p>
          <p className="mb-1"><i className="bi bi-envelope me-2"></i>contacto@dadgamers.cl</p>
          <p className="mb-0"><i className="bi bi-clock me-2"></i>Lunes a viernes, 9 a 18 hrs</p>
        </div>
      </div>

      <form className="card card-body shadow-sm contacto-form" onSubmit={enviar} noValidate>
        {enviado && (
          <div className="alert alert-success">
            <i className="bi bi-check-circle-fill me-2"></i>Gracias, tu mensaje fue enviado. Te respondemos pronto.
          </div>
        )}
        {Object.keys(errores).length > 0 && (
          <div className="alert alert-danger">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>Revisa los campos marcados en rojo.
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input id="nombre" name="nombre" type="text" className={clase('nombre')} value={datos.nombre} onChange={cambiar} />
          <div className="invalid-feedback">{errores.nombre}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input id="email" name="email" type="email" className={clase('email')} value={datos.email} onChange={cambiar} />
          <div className="invalid-feedback">{errores.email}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="mensaje" className="form-label">Mensaje</label>
          <textarea id="mensaje" name="mensaje" rows="4" className={clase('mensaje')} value={datos.mensaje} onChange={cambiar}></textarea>
          <div className="invalid-feedback">{errores.mensaje}</div>
        </div>

        <button className="btn btn-primary align-self-start" type="submit">
          <i className="bi bi-send me-1"></i>Enviar mensaje
        </button>
      </form>
    </div>
  )
}

export default ContactForm
