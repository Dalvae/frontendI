# Desarrollo Frontend I

Este repositorio reúne las respuestas semanales de la asignatura Desarrollo Frontend I.

## Semana 3

Sitio publicado: https://dalvae.github.io/frontendI/s3/

Los archivos están en la carpeta `s3/`: `index.html`, `style.css`, las imágenes en
`assets/images/` y las capturas de pantalla en `capturas/`.

## Semana 6

Sitio publicado: https://dalvae.github.io/frontendI/s6/

Tienda Dad Gamers pero ahora con Bootstrap 5 y JavaScript. Los archivos estan en `s6/`:

- `index.html`: navbar responsiva con categorias, catalogo, carrito (offcanvas) y pie de pagina.
- `assets/js/app.js`: carga los productos con `fetch` desde `data/productos.json`, arma las tarjetas,
  maneja el carrito (evento `click`), el buscador (evento `submit`) y muestra un mensaje si falla la carga.
- `assets/css/style.css`: estilos propios sobre Bootstrap.
- `assets/img/`: imagenes de los productos.
- `data/productos.json`: lista de productos.
- `capturas/`: capturas de la estructura, carrito, busqueda, carga con fetch y el error.

Para probarlo en local hay que levantarlo con un servidor (yo uso `python3 -m http.server` dentro de `s6/`),
porque el fetch no funciona abriendo el archivo directo con file://.

## Semana 8

Sitio publicado: https://dalvae.github.io/frontendI/s8/

la tienda pasada a react (vite + bootstrap), esta en `s8/`. ahi en el readme explico lo de useState, useEffect y el renderizado condicional

## Evaluacion Final Transversal (semana 9)

Sitio publicado: https://dalvae.github.io/frontendI/s9/

la tienda de la semana 8 con formulario de contacto, agregar y quitar juegos, filtro de categorias y navbar para celular. esta en `s9/`, en su readme estan las instrucciones de instalacion y uso
