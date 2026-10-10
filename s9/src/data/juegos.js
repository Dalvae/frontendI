// los juegos de la tienda, antes estaban en un productos.json y los traia con fetch.
// ahora es un arreglo de objetos de javascript y obtenerJuegos() hace como si fuera una api
// las imagenes estan en public/img

export const juegos = [
  {
    id: 1,
    nombre: 'World of Warcraft',
    categoria: 'pc',
    genero: 'MMORPG',
    precio: 24990,
    imagen: 'img/world-of-warcraft.webp',
    alt: 'Personajes de World of Warcraft durante una batalla',
    descripcion: 'Un mundo de fantasía online para crear un héroe y vivir aventuras con otras personas.',
  },
  {
    id: 2,
    nombre: 'Ragnarok Online',
    categoria: 'pc',
    genero: 'MMORPG',
    precio: 9990,
    precioOferta: 6990,
    imagen: 'img/ragnarok-online.webp',
    alt: 'Personajes de Ragnarok Online reunidos en un campo',
    descripcion: 'Un juego de rol online con personajes, profesiones y mapas inspirados en la mitología nórdica.',
  },
  {
    id: 3,
    nombre: 'Terraria',
    categoria: 'pc',
    genero: 'Sandbox',
    precio: 8490,
    imagen: 'img/terraria.webp',
    alt: 'Combate contra un jefe en el Inframundo de Terraria',
    descripcion: 'Un sandbox de acción y aventura para explorar, construir y combatir.',
  },
  {
    id: 4,
    nombre: 'Factorio',
    categoria: 'pc',
    genero: 'Estrategia',
    precio: 27990,
    imagen: 'img/factorio.webp',
    alt: 'Fábrica automatizada con cintas transportadoras en Factorio',
    descripcion: 'Una simulación y estrategia de automatización para construir fábricas.',
  },
  {
    id: 5,
    nombre: 'Kenshi',
    categoria: 'pc',
    genero: 'RPG',
    precio: 12990,
    precioOferta: 9990,
    imagen: 'img/kenshi.webp',
    alt: 'Personaje recorriendo el desierto junto a un animal en Kenshi',
    descripcion: 'Un RPG sandbox de supervivencia donde exploras un mundo abierto y formas tu propio grupo.',
  },
  {
    id: 6,
    nombre: 'Mario Kart World',
    categoria: 'consola',
    genero: 'Carreras',
    precio: 74990,
    imagen: 'img/mario-kart-world.webp',
    alt: 'Koopa Troopa derrapando durante una carrera de Mario Kart World',
    descripcion: 'Juego de carreras de Mario con circuitos y competencias para compartir con amistades. Nintendo Switch 2.',
  },
  {
    id: 7,
    nombre: 'RimWorld',
    categoria: 'pc',
    genero: 'Simulación',
    precio: 25990,
    imagen: 'img/rimworld.webp',
    alt: 'Base de una colonia vista desde arriba en RimWorld',
    descripcion: 'Administra una colonia de sobrevivientes en un planeta lejano, cada partida cuenta una historia distinta.',
  },
  {
    id: 8,
    nombre: 'Satisfactory',
    categoria: 'pc',
    genero: 'Automatización',
    precio: 30990,
    precioOferta: 20990,
    imagen: 'img/satisfactory.webp',
    alt: 'Estructuras de una fábrica y rieles en un planeta alienígena en Satisfactory',
    descripcion: 'Como Factorio pero en primera persona: construye fábricas enormes en un planeta alienígena.',
  },
  {
    id: 9,
    nombre: 'Valheim',
    categoria: 'pc',
    genero: 'Supervivencia',
    precio: 15490,
    imagen: 'img/valheim.webp',
    alt: 'Barco vikingo navegando en el mar de Valheim',
    descripcion: 'Supervivencia vikinga para jugar con amigos: construir, navegar y pelear contra jefes.',
  },
  {
    id: 10,
    nombre: 'Age of Empires II: Definitive Edition',
    categoria: 'pc',
    genero: 'Estrategia',
    precio: 13990,
    precioOferta: 6990,
    imagen: 'img/age-of-empires-2.webp',
    alt: 'Ciudad medieval junto a un río en Age of Empires II',
    descripcion: 'El clásico de estrategia en tiempo real de los 90, remasterizado con todas las civilizaciones.',
  },
  {
    id: 11,
    nombre: 'Old School RuneScape',
    categoria: 'pc',
    genero: 'MMORPG',
    precio: 9990,
    imagen: 'img/old-school-runescape.webp',
    alt: 'Jugadores en un bosque de Old School RuneScape',
    descripcion: 'El RuneScape de 2007 tal como era, para subir skills y hacer quests como en el ciber.',
  },
  {
    id: 12,
    nombre: 'The Legend of Zelda: Tears of the Kingdom',
    categoria: 'consola',
    genero: 'Aventura',
    precio: 69990,
    imagen: 'img/zelda-tears-of-the-kingdom.webp',
    alt: 'Link planeando sobre las islas del cielo en Zelda Tears of the Kingdom',
    descripcion: 'Link explora Hyrule y las islas del cielo, construyendo vehículos con lo que encuentra. Nintendo Switch.',
  },
  {
    id: 13,
    nombre: 'Stardew Valley',
    categoria: 'consola',
    genero: 'Simulación',
    precio: 13990,
    imagen: 'img/stardew-valley.webp',
    alt: 'Granja con cultivos y animales en Stardew Valley',
    descripcion: 'Heredas la granja del abuelo: cultiva, pesca, haz amigos en el pueblo y juega en cooperativo. Nintendo Switch.',
  },
  {
    id: 14,
    nombre: 'Hades',
    categoria: 'consola',
    genero: 'Roguelike',
    precio: 22990,
    imagen: 'img/hades.webp',
    alt: 'Combate con explosiones en el inframundo de Hades',
    descripcion: 'Escapa del inframundo griego pelea tras pelea, cada intento es distinto. Nintendo Switch.',
  },
]

// simula una api: devuelve una promesa que se demora entre 0,8 y 2 segundos en responder
// asi se alcanza a ver el spinner, despues se podria cambiar por un fetch a una api de verdad
export function obtenerJuegos() {
  const demora = 800 + Math.random() * 1200
  return new Promise((resolve) => {
    setTimeout(() => {
      // mando una copia para no tocar el arreglo original
      resolve([...juegos])
    }, demora)
  })
}
