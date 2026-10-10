# Dad Gamers - Evaluacion Final Transversal (Frontend I)

Tienda online de videojuegos hecha en React con Vite y Bootstrap 5. Muestra los juegos en tarjetas, se pueden filtrar por categoria,
buscar, agregar al carrito, agregar y quitar juegos del catalogo, y tiene un formulario de contacto con validacion.
Es la misma tienda que vengo haciendo desde la semana 3.

- repo: https://github.com/Dalvae/frontendI/tree/main/s9
- pagina: https://dalvae.github.io/frontendI/s9/

## Instalacion y uso

Necesitas Node.js (yo use la version 22).

```
git clone https://github.com/Dalvae/frontendI.git
cd frontendI/s9
npm install
npm run dev
```

y abrir http://localhost:5173/frontendI/s9/ . Para publicarlo en github pages: `npm run deploy`.

## Como cumpli los requerimientos

**HTML, CSS y Bootstrap 5**
- etiquetas semanticas en los componentes: `header`, `nav`, `main`, `section`, `article` en cada tarjeta, `aside` en el carrito y la info de contacto, `address` y `footer`
- componentes de Bootstrap: navbar, cards, formularios con `is-invalid`, alertas, badges y la grilla responsiva (1 columna en celular, 2 en tablet, 3 en escritorio)
- flexbox propio en `index.css` para la seccion de contacto y el footer

**JavaScript (dentro de React)**
- los juegos son un arreglo de objetos en `src/data/juegos.js` (nombre, categoria, precio, descripcion, imagen) y `obtenerJuegos()` simula una api con una promesa que se demora
- la manipulacion del DOM se hace con el manejo de estado: las tarjetas salen del estado `productos` con `map`, y al filtrar, agregar o quitar un juego cambia el estado y la pagina se actualiza
- filtro por categoria con botones (Todos / PC / Consola)
- el formulario de contacto valida nombre, email y mensaje antes de enviar y muestra el error en cada campo

**React**
- componentes: Navbar, FiltroCategorias, ProductList, ProductCard, Cart, CartItem, AgregarJuego, ContactForm y Footer
- `useState` para los productos, el carrito, la categoria, la busqueda y la carga. Agregar y quitar juegos cambia el estado `productos`
- props de padres a hijos: `App` tiene los estados y se los pasa a sus hijos (`ProductList` recibe la lista filtrada y le pasa cada juego a `ProductCard`).
  Los hijos avisan al padre con funciones que reciben por props (`setCategoria`, `onAgregar`, `onEliminarJuego`, `onAgregarJuego`)
- `useEffect` para cargar los juegos al abrir la pagina

**Pruebas**
- probado en Chrome en escritorio, tablet y celular: filtro, carrito, agregar y quitar juegos y el formulario de contacto. Las capturas estan en `capturas/`
