Cuaderno interactivo — De la metrología básica a la metrología cuántica: De la regla al fotón
Universidad Tecnológica de Pereira

ESTRUCTURA
  index.html        página única del cuaderno (portada + 20 páginas)
  css/styles.css    estilos (tema oscuro/claro, responsive, impresión)
  js/app.js         motor de navegación, índice, progreso, tema
  js/data.js        contenido de las páginas (BOOK_DATA) — edite aquí los textos
  js/sims.js        8 simuladores en canvas (diana, ondas, Michelson, lluvia,
                    globo de incertidumbre, comparador 1/√N vs 1/N, reloj, Hoja de Ruta)
  img/portada.png   portada

INSTALACIÓN
  Suba la carpeta completa al servidor conservando las subcarpetas.
  No requiere backend ni instalación. Fuentes y MathJax se cargan por CDN
  (si el servidor no tiene salida a internet, el cuaderno funciona igual con
  fuentes del sistema).

USO
  Flechas ← → para cambiar de página. El progreso y la Hoja de Ruta del
  asistente se guardan en el navegador (localStorage).
