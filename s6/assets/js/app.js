/*
  Dad Gamers - semana 6
  aca va toda la logica de la tienda:
  - cargar el catalogo con fetch desde data/productos.json
  - armar las tarjetas en el DOM
  - agregar al carrito (click) y mostrar el resumen
  - buscar por nombre (submit) y filtrar por categoria desde la navbar
*/

const RUTA_PRODUCTOS = "data/productos.json";

// estado de la app. el carrito es un Map con id -> cantidad, me resulto mas comodo que un array
const estado = {
  productos: [],
  carrito: new Map(),
  categoria: "todos",
  busqueda: "",
};

// guardo aca los elementos que uso seguido para no repetir getElementById en todos lados
const ui = {
  lista: document.getElementById("lista-productos"),
  estadoCatalogo: document.getElementById("estado-catalogo"),
  carga: document.getElementById("estado-carga"),
  alertaError: document.getElementById("alerta-error"),
  alertaDetalle: document.getElementById("alerta-error-detalle"),
  sinResultados: document.getElementById("sin-resultados"),
  formBusqueda: document.getElementById("form-busqueda"),
  campoBusqueda: document.getElementById("campo-busqueda"),
  menuCategorias: document.getElementById("menu-categorias"),
  listaCarrito: document.getElementById("lista-carrito"),
  carritoVacio: document.getElementById("carrito-vacio"),
  totalCarrito: document.getElementById("total-carrito"),
  contador: document.getElementById("contador-carrito"),
  btnVaciar: document.getElementById("btn-vaciar"),
  btnPagar: document.getElementById("btn-pagar"),
  toast: document.getElementById("toast-carrito"),
  toastMensaje: document.getElementById("toast-mensaje"),
};

/* ---------- utilidades ---------- */

// formatea a pesos chilenos, ej: 24990 -> $24.990
function formatearPrecio(valor) {
  return valor.toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });
}

// muestra u oculta con la clase d-none de bootstrap
function mostrar(elemento, visible) {
  elemento.classList.toggle("d-none", !visible);
}

// avisito abajo a la derecha (toast de bootstrap)
function avisar(mensaje) {
  ui.toastMensaje.textContent = mensaje;
  bootstrap.Toast.getOrCreateInstance(ui.toast, { delay: 1800 }).show();
}

/* ---------- carga de datos con fetch ---------- */

// pide el json local y devuelve la lista. si algo falla tira error y lo agarra iniciarCatalogo
async function cargarProductos() {
  const respuesta = await fetch(RUTA_PRODUCTOS);
  // ojo: fetch NO tira error con un 404, hay que revisar response.ok a mano. me costo cachar esto
  if (!respuesta.ok) {
    throw new Error(`El servidor respondió ${respuesta.status} (${respuesta.statusText})`);
  }
  const datos = await respuesta.json();
  if (!Array.isArray(datos) || datos.length === 0) {
    throw new Error("El archivo de productos está vacío o tiene un formato incorrecto");
  }
  return datos;
}

// alerta amigable para el usuario, el detalle tecnico va en la consola y al final del mensaje
function mostrarError(error) {
  console.error("Error cargando productos:", error);
  mostrar(ui.carga, false);
  mostrar(ui.alertaError, true);
  ui.alertaDetalle.textContent = `Revisa tu conexión e inténtalo de nuevo. Detalle: ${error.message}`;
  ui.estadoCatalogo.textContent = "Error al cargar el catálogo";
}

// flujo de carga: spinner -> fetch -> render, y si falla se muestra la alerta
async function iniciarCatalogo() {
  mostrar(ui.alertaError, false);
  mostrar(ui.carga, true);
  ui.estadoCatalogo.textContent = "Cargando productos...";
  try {
    estado.productos = await cargarProductos();
    mostrar(ui.carga, false);
    console.info(`Fetch OK: ${estado.productos.length} productos desde ${RUTA_PRODUCTOS}`);
    renderProductos();
  } catch (error) {
    mostrarError(error);
  }
}

/* ---------- catalogo ---------- */

// filtra por categoria y por el texto buscado, siempre partiendo de la lista completa
function filtrarProductos() {
  const texto = estado.busqueda.trim().toLowerCase();
  return estado.productos.filter((p) => {
    const coincideCategoria =
      estado.categoria === "todos" ||
      (estado.categoria === "oferta" ? p.oferta : p.categoria === estado.categoria);
    const coincideTexto = texto === "" || p.nombre.toLowerCase().includes(texto) || p.genero.toLowerCase().includes(texto);
    return coincideCategoria && coincideTexto;
  });
}

// arma la card de bootstrap de un producto
function crearCard(producto) {
  const columna = document.createElement("div");
  columna.className = "col";
  const etiqueta = producto.oferta ? '<span class="badge text-bg-success ms-2">Oferta</span>' : "";
  columna.innerHTML = `
    <article class="card h-100 shadow-sm">
      <img src="${producto.imagen}" class="card-img-top" alt="${producto.alt}" width="320" height="180" loading="lazy">
      <div class="card-body d-flex flex-column">
        <h3 class="card-title h5">${producto.nombre}${etiqueta}</h3>
        <p class="card-text text-secondary small mb-1">${producto.genero} · ${producto.categoria === "pc" ? "PC" : "Consola"}</p>
        <p class="card-text flex-grow-1">${producto.descripcion}</p>
        <div class="d-flex justify-content-between align-items-center mt-2">
          <span class="precio">${formatearPrecio(producto.precio)}</span>
          <button class="btn btn-warning btn-agregar" type="button" data-id="${producto.id}">Agregar</button>
        </div>
      </div>
    </article>`;
  return columna;
}

// pinta las tarjetas que pasan el filtro. replaceChildren borra las anteriores
function renderProductos() {
  const visibles = filtrarProductos();
  ui.lista.replaceChildren(...visibles.map(crearCard));
  mostrar(ui.sinResultados, visibles.length === 0);
  ui.estadoCatalogo.textContent = `${visibles.length} de ${estado.productos.length} productos cargados desde ${RUTA_PRODUCTOS}`;
}

/* ---------- carrito ---------- */

// suma una unidad al carrito y actualiza el resumen
function agregarAlCarrito(id) {
  const producto = estado.productos.find((p) => p.id === id);
  if (!producto) return;
  estado.carrito.set(id, (estado.carrito.get(id) || 0) + 1);
  renderCarrito();
  avisar(`${producto.nombre} agregado al carrito`);
}

// cambia la cantidad, si llega a cero se saca del carrito
function cambiarCantidad(id, delta) {
  const nueva = (estado.carrito.get(id) || 0) + delta;
  if (nueva <= 0) {
    estado.carrito.delete(id);
  } else {
    estado.carrito.set(id, nueva);
  }
  renderCarrito();
}

function vaciarCarrito() {
  estado.carrito.clear();
  renderCarrito();
}

// una fila del resumen del carrito
function crearFilaCarrito(producto, cantidad) {
  const fila = document.createElement("li");
  fila.className = "list-group-item d-flex justify-content-between align-items-center gap-2 px-0";
  fila.innerHTML = `
    <div>
      <div class="fw-semibold">${producto.nombre}</div>
      <small class="text-secondary">${cantidad} x ${formatearPrecio(producto.precio)}</small>
    </div>
    <div class="d-flex align-items-center gap-2">
      <div class="btn-group btn-group-sm" role="group" aria-label="Cantidad de ${producto.nombre}">
        <button class="btn btn-outline-secondary" type="button" data-accion="menos" data-id="${producto.id}" aria-label="Quitar uno">−</button>
        <button class="btn btn-outline-secondary" type="button" data-accion="mas" data-id="${producto.id}" aria-label="Agregar uno">+</button>
      </div>
      <span class="fw-bold">${formatearPrecio(producto.precio * cantidad)}</span>
    </div>`;
  return fila;
}

// recalcula el total y el contador y vuelve a pintar la lista
function renderCarrito() {
  const filas = [];
  let total = 0;
  let unidades = 0;
  for (const [id, cantidad] of estado.carrito) {
    const producto = estado.productos.find((p) => p.id === id);
    if (!producto) continue;
    total += producto.precio * cantidad;
    unidades += cantidad;
    filas.push(crearFilaCarrito(producto, cantidad));
  }
  ui.listaCarrito.replaceChildren(...filas);
  ui.totalCarrito.textContent = formatearPrecio(total);
  mostrar(ui.carritoVacio, filas.length === 0);
  ui.btnVaciar.disabled = filas.length === 0;
  ui.btnPagar.disabled = filas.length === 0;

  ui.contador.textContent = unidades;
  // truco para reiniciar la animacion del contador (lo saque de stackoverflow)
  ui.contador.classList.remove("pulso");
  void ui.contador.offsetWidth;
  ui.contador.classList.add("pulso");
}

/* ---------- eventos ---------- */

// submit del buscador. el preventDefault es para que no recargue la pagina
function buscar(evento) {
  evento.preventDefault();
  estado.busqueda = ui.campoBusqueda.value;
  renderProductos();
  document.getElementById("catalogo").scrollIntoView({ behavior: "smooth", block: "start" });
}

// click en una categoria de la navbar
function filtrarCategoria(evento) {
  const enlace = evento.target.closest("[data-categoria]");
  if (!enlace) return;
  estado.categoria = enlace.dataset.categoria;
  ui.menuCategorias.querySelectorAll(".nav-link").forEach((a) => {
    a.classList.toggle("active", a === enlace);
    if (a === enlace) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  renderProductos();
}

// todos los listeners juntos. para los botones que se crean con js uso delegacion en el padre
function registrarEventos() {
  ui.formBusqueda.addEventListener("submit", buscar);
  ui.menuCategorias.addEventListener("click", filtrarCategoria);

  // click en agregar de cualquier tarjeta
  ui.lista.addEventListener("click", (evento) => {
    const boton = evento.target.closest(".btn-agregar");
    if (boton) agregarAlCarrito(Number(boton.dataset.id));
  });

  // botones + y - del carrito
  ui.listaCarrito.addEventListener("click", (evento) => {
    const boton = evento.target.closest("[data-accion]");
    if (!boton) return;
    cambiarCantidad(Number(boton.dataset.id), boton.dataset.accion === "mas" ? 1 : -1);
  });

  ui.btnVaciar.addEventListener("click", vaciarCarrito);
  ui.btnPagar.addEventListener("click", () => avisar("El pago se confirma por correo, como en la tienda física :)"));
  document.getElementById("btn-reintentar").addEventListener("click", iniciarCatalogo);
  document.getElementById("btn-limpiar-busqueda").addEventListener("click", () => {
    ui.campoBusqueda.value = "";
    estado.busqueda = "";
    estado.categoria = "todos";
    ui.menuCategorias.querySelector('[data-categoria="todos"]').classList.add("active");
    renderProductos();
  });
}

// arranque
function init() {
  registrarEventos();
  renderCarrito();
  iniciarCatalogo();
}

document.addEventListener("DOMContentLoaded", init);
