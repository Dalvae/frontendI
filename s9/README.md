# Dad Gamers - Evaluacion Final Transversal (Frontend I)

Tienda online de videojuegos hecha con HTML5, CSS3, JavaScript, Bootstrap 5 y React (con Vite). Es la misma tienda Dad Gamers
que vengo haciendo desde la semana 3 (html y css), la 6 (bootstrap y js con fetch) y la 8 (react). Para la EFT le agregue 8 juegos mas (ahora son 14),
el formulario de contacto con validacion, agregar y quitar juegos del catalogo, el filtro de categorias arriba del catalogo,
la navbar con links a las secciones y menu para celular, y el footer.

- repo: https://github.com/Dalvae/frontendI/tree/main/s9
- pagina: https://dalvae.github.io/frontendI/s9/

## Instalacion

Necesitas tener [Node.js](https://nodejs.org/) instalado (yo use la version 22) y git.

```
git clone https://github.com/Dalvae/frontendI.git
cd frontendI/s9
npm install
npm run dev
```

Despues abrir el link que muestra la consola, normalmente http://localhost:5173/frontendI/s9/

Otros comandos:

- `npm run build` genera la version final en la carpeta `dist/`
- `npm run preview` muestra lo que quedo en `dist/` para revisarlo antes de subirlo
- `npm run lint` revisa el codigo con oxlint
- `npm run deploy` hace el build y lo sube a la carpeta s9 de la rama gh-pages (asi no se borran las otras semanas)

Ojo: es una app de React con Vite, asi que hay que abrirla con `npm run dev` y no haciendo doble click en el index.html.

## Como se usa

1. **Inicio**: arriba esta la navbar con los links a Inicio, Catalogo, Agregar juego y Contacto. En el celular se esconden en el boton de las 3 rayas.
2. **Catalogo**: los juegos aparecen en tarjetas con imagen, nombre, genero, descripcion y precio (algunos con oferta).
   Con los botones **Todos / PC / Consola** se filtra por categoria (el numerito dice cuantos hay de cada una).
   El buscador de la navbar busca por nombre.
3. **Carrito**: "Agregar al carrito" en cada juego, y "Ver carrito" en la navbar para ver el total, cambiar cantidades o eliminar.
4. **Agregar juego**: se llena el formulario (nombre, categoria, genero, precio, descripcion y link de imagen opcional) y el juego
   aparece al final del catalogo. Si falta algo o el precio no es valido muestra un error. Con "Quitar del catalogo" se borra un juego
   (si estaba en el carrito tambien sale de ahi). Esto no se guarda, si recargas vuelve a lo que esta en `juegos.js`.
5. **Contacto**: formulario con nombre, email y mensaje. Antes de enviar revisa que el nombre tenga al menos 3 letras, que el email
   tenga formato valido y que el mensaje tenga al menos 10 caracteres. Los campos con error se marcan en rojo con el mensaje abajo.
   Como no hay backend, cuando esta todo bien solo muestra el mensaje de enviado y limpia el formulario.

## Estructura

```
s9/
├── index.html              la pagina base, aca react monta todo en <div id="root">
├── public/
│   └── img/                imagenes de los juegos y sin-imagen.svg para los que se agregan sin foto
├── src/
│   ├── data/juegos.js      los 14 juegos (arreglo de objetos) y obtenerJuegos() que simula la api
│   ├── main.jsx            importa bootstrap, los iconos y monta App
│   ├── App.jsx             los estados principales y las funciones (carrito, agregar y quitar juegos, filtro)
│   ├── index.css           estilos propios encima de bootstrap
│   └── components/
│       ├── Navbar.jsx           navbar con links, buscador, boton del carrito y menu para celular
│       ├── FiltroCategorias.jsx botones para filtrar por categoria
│       ├── ProductList.jsx      recorre los juegos con map y arma las tarjetas
│       ├── ProductCard.jsx      una tarjeta de juego
│       ├── Cart.jsx / CartItem.jsx el carrito
│       ├── AgregarJuego.jsx     formulario para agregar juegos
│       ├── ContactForm.jsx      formulario de contacto con validacion
│       └── Footer.jsx           pie de pagina
└── capturas/               capturas de las pruebas
```

## Lo que pedia la EFT

**HTML, CSS y Bootstrap 5**
- etiquetas semanticas dentro de los componentes: `header` (con la `nav`), `main`, `section` para inicio, catalogo, agregar y contacto,
  la lista de juegos es un `ul` con un `li` y un `article` por tarjeta, el carrito y la info de contacto son `aside`, el correo va en `address` y el `footer` tiene su `nav`
- bootstrap para la navbar, las tarjetas (`card`), los formularios (`form-control`, `is-invalid`, `invalid-feedback`), alertas, badges y la grilla responsiva (`row-cols-1 row-cols-md-2 row-cols-lg-3`)
- flexbox propio en `index.css` para la seccion de contacto (en celular uno abajo del otro y en pantalla grande lado a lado) y para el footer, y las clases `d-flex` de bootstrap en los filtros y botones
- iconos de bootstrap-icons

**JavaScript (todo hecho dentro de React, no hay javascript puro aparte)**
- los juegos son un arreglo de objetos en `src/data/juegos.js` con nombre, categoria, genero, precio, descripcion e imagen
- `obtenerJuegos()` simula una api: devuelve una promesa que se resuelve despues de una demora al azar, por eso se ve el spinner
- la manipulacion del DOM se hace con el manejo de estado de React (`useState`): cada cosa que cambia en la pagina es un estado, y cuando cambia React actualiza el DOM
- las tarjetas se generan recorriendo el estado `productos` con `map`. Al filtrar (`setCategoria`), agregar o quitar un juego (`setProductos`) cambia el estado y la lista se actualiza
- lo mismo con los mensajes de error del formulario (`errores`), el spinner (`cargando`), el carrito (`carrito`, `mostrarCarrito`) y el menu del celular (`menuAbierto`): aparecen o desaparecen segun el estado
- el filtro por categoria usa `filter` sobre la lista
- validacion del formulario de contacto antes de enviarlo, con mensajes de error
- `document.title` cambia con la cantidad de juegos del carrito

**React**
- la app esta dividida en componentes (navbar, filtro, lista, tarjeta, carrito, agregar juego, contacto, footer)
- `useState` en App para los productos, el carrito, la categoria, la busqueda, la carga y el error. Agregar y quitar juegos cambia el estado `productos` y la lista se actualiza sola
- props de componentes padres a hijos. `App` es el padre que tiene los estados y se los pasa a sus hijos:

  ```
  App (estados: productos, carrito, categoria, busqueda, cargando...)
  ├── Navbar            recibe totalProductos, mostrarCarrito, setMostrarCarrito, setBusqueda
  ├── FiltroCategorias  recibe categoria, setCategoria, productos
  ├── ProductList       recibe productosFiltrados, carrito, onAgregar, onEliminarJuego
  │   └── ProductCard   recibe producto, enCarrito, onAgregar, onEliminarJuego
  ├── Cart              recibe items, totalPagar, cambiarCantidad, eliminar, vaciar
  │   └── CartItem      recibe producto, cantidad, cambiarCantidad, eliminar
  ├── AgregarJuego      recibe onAgregarJuego
  ├── ContactForm
  └── Footer
  ```

  los datos bajan del padre a los hijos, y los hijos avisan al padre llamando a las funciones que recibieron por props.
  por ejemplo: en `FiltroCategorias` aprietas Consola y llama a `setCategoria`, cambia el estado en `App`, `App` calcula la lista filtrada
  y se la pasa a `ProductList`, que a su vez le pasa cada juego a `ProductCard`. Asi lo que pasa en un componente cambia otro
- `useEffect` para pedir los juegos a la api simulada al abrir la pagina y para el titulo de la pestaña
- renderizado condicional: spinner mientras carga, error con boton reintentar, carrito vacio, ofertas, mensajes del formulario

**Pruebas**
- lo probe en Chrome en escritorio (1280px), tablet (820px) y celular (390px), no aparece scroll hacia el lado
- probe el filtro, agregar un juego (vacio y bien), quitar un juego que estaba en el carrito y el formulario de contacto vacio, con email malo y bien

## Capturas

En la carpeta `capturas/`:

1. inicio en escritorio
2. filtro por consola
3. agregar juego con campos vacios (error)
4. juego agregado
5. el juego nuevo en el catalogo (sin imagen)
6. despues de quitar Factorio
7. carrito con productos
8. contacto enviado vacio, todos los campos en rojo
9. contacto con email y mensaje malos
10. contacto enviado bien
11. vista tablet
12. vista celular
13. menu del celular abierto
14. contacto en celular, el formulario queda abajo de la info
