# Dad Gamers - semana 8 (React)

Sumativa 3 de frontend I. Es la misma tienda Dad Gamers de la semana 3 y 6 pero ahora pasada a React con vite y bootstrap.

- repo: https://github.com/Dalvae/frontendI/tree/main/s8
- pagina: https://dalvae.github.io/frontendI/s8/

## como correrlo

```
npm install
npm run dev
```

para subirlo a github pages: `npm run deploy` (hace el build y lo sube a la carpeta s8 de la rama gh-pages, asi no se borran las otras semanas)

## componentes

- `App.jsx` tiene casi todo, los estados, los useEffect y las funciones del carrito
- `Navbar.jsx` categorias, buscador y el boton del carrito
- `ProductList.jsx` y `ProductCard.jsx` la lista de juegos y cada tarjeta
- `Cart.jsx` y `CartItem.jsx` el carrito
- los productos estan en `public/data/productos.json`, les agregue precio de oferta a dos juegos

## lo que pedia la actividad

**useState**
- productos, carrito, categoria, busqueda, si esta cargando, si hubo error y si el carrito esta abierto
- el boton "Ver carrito" cambia a "Ocultar carrito"
- el boton de cada juego cambia de "Agregar al carrito" a "En el carrito ✓"

**useEffect**
- uno carga los productos del json con fetch cuando se abre la pagina. le puse un timeout de 800ms para que se vea el spinner
- el otro cambia el titulo de la pestaña con la cantidad de juegos del carrito

**renderizado condicional**
- spinner mientras carga, mensaje de error con boton reintentar si falla el fetch
- mensaje de carrito vacio
- etiqueta de oferta y precio tachado solo en los que tienen oferta
- el numerito del carrito solo aparece si hay algo
- mensaje cuando la busqueda no encuentra nada

## capturas

estan en la carpeta `capturas/`:

1. cargando (spinner)
2. catalogo cargado
3. el json
4. carrito vacio
5. botones cambiados a "en el carrito"
6. carrito con productos y total
7. despues de eliminar uno
8. error de carga (le cambie la ruta del json para que fallara)
9. busqueda sin resultados
10. vista en celular
