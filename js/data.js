/* ============================================================
   Contenido del cuaderno — BOOK_DATA
   Cada página: { section, title, html }
   Los simuladores se insertan con <div class="sim" data-sim="nombre"></div>
   ============================================================ */
const BOOK_DATA = [

/* ===================== APERTURA ===================== */
{ section: 'Apertura', title: '¿Cuánto mide esto?', html: `
<p>Antes de empezar, cada mesa recibe <strong>el mismo objeto</strong> y un instrumento distinto: una regla escolar, una cinta métrica, un calibrador, una regla de madera vieja. Midan y escriban su resultado en el tablero, <em>sin decir con qué lo midieron</em>.</p>
<div class="pregunta">Las medidas no coinciden. ¿Cuál es la correcta?</div>
<p>No vamos a responder todavía. Esa pregunta es, en realidad, toda la cátedra. Lo que sí podemos hacer es ponernos de acuerdo en el contrato de estas cuatro horas:</p>
<div class="grid3">
  <div class="card blue"><div class="label">Sin ecuaciones en el tablero</div>No vamos a derivar la ecuación de Schrödinger. La única "fórmula" que usaremos es <code>valor ± incertidumbre</code>.</div>
  <div class="card gold"><div class="label">Ver, tocar, simular</div>Cada idea se vive primero en una simulación o con las manos, y solo después recibe su nombre técnico.</div>
  <div class="card green"><div class="label">Un mapa para llevar</div>Al final cada asistente completa su <strong>Hoja de Ruta de la Precisión</strong> y se la lleva.</div>
</div>
<h2>El viaje en cinco estaciones</h2>
<div class="timeline">
  <div class="tl-item"><div class="tl-year">1799 / 1889</div><div class="tl-title">📏 El objeto</div>Medir con trozos de metal: el metro y el kilogramo de platino-iridio.</div>
  <div class="tl-item"><div class="tl-year">1960 / 1983</div><div class="tl-title">🌊 La onda</div>La luz como regla: el interferómetro.</div>
  <div class="tl-item"><div class="tl-year">Siglo XX</div><div class="tl-title">💧 El fotón</div>La luz llega en gotas: el ruido de disparo.</div>
  <div class="tl-item"><div class="tl-year">2019</div><div class="tl-title">🌀 La lluvia domada</div>Luz comprimida y entrelazamiento: metrología cuántica.</div>
  <div class="tl-item"><div class="tl-year">1967 / 2019</div><div class="tl-title">⚛️ El átomo</div>El patrón perfecto: la frecuencia de los átomos.</div>
</div>
<p class="idea">"Medir mejor no es tener una regla más fina, sino entender y reducir la incertidumbre."</p>
` },

/* ===================== BLOQUE 1 ===================== */
{ section: 'Bloque 1 · El objeto', title: 'Medir es comparar', html: `
<p>Toda medida es una <strong>comparación con un patrón</strong>. Cuando decimos que una mesa mide 1,20 m, estamos diciendo que es 1,2 veces más larga que <em>algo</em> que todos aceptamos llamar "un metro". La pregunta de fondo de la metrología es: <strong>¿qué es ese algo, y cómo nos aseguramos de que sea el mismo para todos?</strong></p>
<h2>Patrones antiguos: el cuerpo del rey</h2>
<p>Durante milenios los patrones fueron partes del cuerpo (el pie, el codo, el palmo) o costumbres locales. Un "pie" en París no era el mismo "pie" en Londres. Un comerciante podía ser honesto y aun así vender menos tela de la que creía.</p>
<h2>1799: un patrón para "todos los pueblos, todos los tiempos"</h2>
<p>La Revolución Francesa definió el metro como la diezmillonésima parte de la distancia del Polo Norte al Ecuador, y materializó esa definición en una <strong>barra de platino</strong>. En 1889 se fabricó la versión definitiva: la barra de platino-iridio y el <strong>kilogramo de Sèvres</strong>, un cilindro de 39 mm guardado bajo tres campanas de vidrio cerca de París.</p>
<div class="card gold"><div class="label">El dato que lo cambia todo</div>Durante un siglo, las copias oficiales del kilogramo, fabricadas con el mismo metal y guardadas con el mismo cuidado, se desviaron del original en unos <strong>50 microgramos</strong>, el peso de una pestaña. Nadie sabe si el original perdió masa o las copias la ganaron.</div>
<div class="pregunta">Si el patrón cambia, ¿quién tiene razón: el original o las copias?</div>
` },

{ section: 'Bloque 1 · El objeto', title: 'Exactitud, precisión e incertidumbre', html: `
<p>Volvamos a las medidas de la apertura. Para entender por qué no coinciden necesitamos tres palabras que en la vida diaria se confunden y en metrología son distintas.</p>
<div class="grid3">
  <div class="card"><div class="label">Exactitud</div>Qué tan cerca está el <em>promedio</em> de las medidas del valor verdadero. Una regla mal calibrada es imprecisa <em>por sistema</em>: siempre se equivoca hacia el mismo lado.</div>
  <div class="card"><div class="label">Precisión</div>Qué tan parecidas son las medidas <em>entre sí</em>. Una regla con divisiones de 1 cm nunca será precisa al milímetro.</div>
  <div class="card"><div class="label">Incertidumbre</div>El rango dentro del cual, con cierta confianza, está el valor verdadero. <strong>Una medida sin incertidumbre no es una medida.</strong></div>
</div>
<div class="sim" data-sim="diana"></div>
<h3>La única fórmula de la cátedra</h3>
<p>Un resultado de medición se escribe como <code>valor ± incertidumbre</code>, por ejemplo <code>52,1 ± 0,3 mm</code>. Eso dice mucho más que "52 mm": dice cuánto confiamos en el número. Fíjate en la simulación: al agregar más medidas, la incertidumbre del promedio se reduce. Guarda esa observación: volverá con los fotones.</p>
` },

{ section: 'Bloque 1 · El objeto', title: 'Trazabilidad: la cadena que no se puede romper', html: `
<p>¿Cómo sabe la regla de tu mesa cuánto es un metro? Porque fue fabricada comparándola con un instrumento mejor, que fue calibrado contra uno mejor, que fue calibrado contra el patrón nacional, que fue comparado con el patrón internacional. Esa cadena de comparaciones documentadas se llama <strong>trazabilidad</strong>.</p>
<div class="timeline">
  <div class="tl-item"><div class="tl-title">Tu regla</div>Comprada en la papelería. Incertidumbre: ~0,5 mm.</div>
  <div class="tl-item"><div class="tl-title">Laboratorio de calibración acreditado</div>Compara instrumentos industriales con patrones de referencia.</div>
  <div class="tl-item"><div class="tl-title">Instituto Nacional de Metrología (INM, Colombia)</div>Mantiene los patrones nacionales y los compara internacionalmente.</div>
  <div class="tl-item"><div class="tl-title">BIPM (Sèvres, Francia)</div>Oficina Internacional de Pesas y Medidas: coordina las comparaciones entre países.</div>
</div>
<div class="card blue"><div class="label">Analogía: la receta de la abuela</div>Todos cocinan "igual", pero cada copia de la receta tiene un pequeño cambio. En metrología, cada eslabón de la cadena <em>mide y documenta</em> ese cambio: por eso la medida de tu regla sigue valiendo. <strong>Donde se rompe:</strong> en la cocina nadie mide la desviación; en metrología es obligatorio.</div>
<h2>El límite del trozo de metal</h2>
<p>Un patrón material se raya, se ensucia, se dilata con el calor, y existe en <em>un solo lugar</em>. Si se destruyera, nadie podría reconstruirlo exactamente. Necesitamos un patrón que no se toque, que no se desgaste y que cualquiera pueda reproducir.</p>
<div class="pregunta">¿Existe algo en la naturaleza que sea exactamente igual en todas partes y que nunca cambie?</div>
` },

/* ===================== BLOQUE 2 ===================== */
{ section: 'Bloque 2 · La onda', title: 'La luz trae su propia regla', html: `
<p>Una onda tiene una propiedad muy útil: una <strong>longitud de onda</strong>, la distancia entre dos crestas consecutivas. Para una luz de un color puro esa distancia es siempre la misma, en cualquier laboratorio del mundo. La luz, entonces, trae incorporada una regla de divisiones diminutas y perfectamente regulares.</p>
<p>Pero una onda de luz es demasiado pequeña para verla directamente: la luz roja de un láser tiene crestas separadas por 0,0006 mm. ¿Cómo usar una regla cuyas marcas no podemos ver? La respuesta es hacer que dos ondas se <strong>encuentren</strong>.</p>
<div class="sim" data-sim="ondas"></div>
<div class="card blue"><div class="label">Analogía: dos personas aplaudiendo</div>Si aplauden a la vez, el sonido se refuerza. Si una aplaude justo cuando la otra tiene las manos abiertas, el sonido se apaga. Las ondas hacen lo mismo: donde cresta encuentra cresta hay luz (franja clara); donde cresta encuentra valle hay oscuridad (franja oscura).</div>
<p>Las franjas claras y oscuras son <strong>interferencia</strong>. Y lo importante: la distancia entre franjas depende de la longitud de onda. Si logramos contar franjas, estamos contando longitudes de onda. <em>Estamos midiendo con la luz.</em></p>
` },

{ section: 'Bloque 2 · La onda', title: 'El interferómetro de Michelson', html: `
<p>En 1881 Albert Michelson construyó un instrumento que convierte ese principio en una máquina de medir: un haz de luz se divide en dos caminos, cada uno rebota en un espejo y los dos se recombinan en un detector. Si un espejo se mueve <em>media longitud de onda</em>, las franjas se desplazan exactamente una posición.</p>
<div class="sim" data-sim="michelson"></div>
<h3>Actividad: cuenta diez franjas</h3>
<ol>
  <li>Mueve el espejo lentamente hasta que pasen 10 franjas.</li>
  <li>Lee el desplazamiento: debe ser unos 3 164 nm, es decir, 10 medias longitudes de onda del láser rojo (λ = 632,8 nm).</li>
  <li>Acabas de medir un desplazamiento de tres milésimas de milímetro <strong>sin tocar nada y sin ninguna fórmula</strong>.</li>
</ol>
<div class="card gold"><div class="label">Qué se mide así en la vida real</div>Rugosidad de superficies pulidas, dilatación térmica de materiales, índice de refracción de gases, deformación de estructuras, y, con brazos de 4 km, las ondas gravitacionales que detecta LIGO.</div>
<div class="pregunta">Activa el "ruido realista" y baja la intensidad al mínimo. Aunque nada se mueva, las franjas tiemblan. ¿De dónde viene ese temblor?</div>
` },

{ section: 'Bloque 2 · La onda', title: 'El metro se vuelve luz (1960 y 1983)', html: `
<p>Si la luz es una regla perfecta, ¿por qué no definir el metro con ella? Eso se hizo en dos pasos:</p>
<div class="timeline">
  <div class="tl-item"><div class="tl-year">1960</div><div class="tl-title">El metro como longitudes de onda</div>Un metro = 1 650 763,73 longitudes de onda de la luz naranja emitida por el kriptón-86. La barra de platino-iridio se jubila.</div>
  <div class="tl-item"><div class="tl-year">1983</div><div class="tl-title">El metro como velocidad de la luz</div>Un metro = la distancia que recorre la luz en el vacío en 1/299 792 458 de segundo. Desde entonces la velocidad de la luz es <em>exacta por definición</em>, y el metro se deriva del segundo.</div>
</div>
<p>Observa el cambio de filosofía: la regla ya no es un <strong>objeto</strong> que alguien guarda, sino una <strong>propiedad de la naturaleza</strong> que cualquier laboratorio, en cualquier país, puede reproducir con un láser estabilizado.</p>
<div class="card green"><div class="label">Idea para la Hoja de Ruta</div>Estación 2, "La onda": el metro definido por la luz. Límite: las franjas tiemblan.</div>
<h2>Pero algo tiembla</h2>
<p>En el interferómetro perfecto, con espejos quietos y sin vibraciones, las franjas siguen temblando ligeramente. Y el temblor es mayor cuanto menos luz hay. Ese fenómeno no es un defecto del aparato: es una propiedad de la luz misma. Para entenderlo hay que mirar la luz muy de cerca.</p>
` },

/* ===================== BLOQUE 3 ===================== */
{ section: 'Bloque 3 · El fotón', title: 'La luz llega en gotas', html: `
<p>Baja la intensidad de una lámpara hasta niveles extremadamente tenues y ponle delante un detector muy sensible. No verás un brillo continuo que se va apagando: oirás <strong>clics</strong>. La luz llega en paquetes indivisibles, uno a uno. Cada paquete es un <strong>fotón</strong>.</p>
<p>Y aquí está lo asombroso: si dejas que esos fotones individuales pasen por un interferómetro y acumulas sus impactos durante minutos, el patrón de franjas aparece <em>punto a punto</em>. Cada fotón llega a un solo lugar, pero el conjunto se organiza como una onda.</p>
<div class="grid2">
  <div class="card blue"><div class="label">Lo que ve el ojo</div>Un haz continuo, un brillo parejo, una regla perfecta.</div>
  <div class="card gold"><div class="label">Lo que ve el detector</div>Clic. Clic-clic. Clic. ... Gotas que caen al azar, sin ritmo fijo.</div>
</div>
<h2>La demostración del paraguas</h2>
<p>Un asistente sostiene un paraguas abierto (o una bandeja metálica). Otro deja caer arroz desde arriba.</p>
<ul>
  <li><strong>Pocos granos:</strong> tac... tac-tac... tac. El sonido es irregular, impredecible.</li>
  <li><strong>Muchos granos:</strong> un siseo parejo y continuo. Parece lluvia constante.</li>
</ul>
<p>Pero escuchen bien el siseo: <em>nunca es perfectamente uniforme</em>. Sigue habiendo pequeñas variaciones, porque cada grano cae cuando le toca, al azar. Esa es la clave de la siguiente página.</p>
` },

{ section: 'Bloque 3 · El fotón', title: 'El ruido de disparo', html: `
<p>Si en un intervalo caen en promedio 100 gotas, en el siguiente pueden caer 92 y en el otro 109. La fluctuación típica es de unas 10 gotas: la <strong>raíz cuadrada</strong> del promedio. Si caen 10 000, la fluctuación es de unas 100. Más gotas, más fluctuación absoluta, pero <em>menos fluctuación relativa</em>: 10 % frente a 1 %.</p>
<div class="sim" data-sim="lluvia"></div>
<h3>Haz números sin fórmulas</h3>
<table>
  <tr><th>Gotas (o fotones) por intervalo, N</th><th>Fluctuación típica, √N</th><th>Ruido relativo, √N / N</th></tr>
  <tr><td>100</td><td>10</td><td>10 %</td></tr>
  <tr><td>10 000</td><td>100</td><td>1 %</td></tr>
  <tr><td>1 000 000</td><td>1 000</td><td>0,1 %</td></tr>
</table>
<div class="card gold"><div class="label">La regla que acabas de descubrir</div>Para ganar <strong>un dígito</strong> de precisión hay que multiplicar la luz por <strong>cien</strong>. Esto se llama <strong>ruido de disparo</strong> (<em>shot noise</em>), y la precisión que permite es el <strong>límite cuántico estándar</strong>.</div>
<div class="card blue"><div class="label">Analogía: la encuesta electoral</div>Con 100 encuestados el margen de error ronda el 10 %; con 10 000, el 1 %. Es exactamente la misma matemática. <strong>Donde se rompe:</strong> las gotas y los encuestados son independientes entre sí; en el Bloque 4 veremos fotones que <em>no</em> lo son.</div>
<p>Ahora vuelve al interferómetro de la página anterior: las franjas temblaban porque los fotones llegan al azar. Con más luz tiemblan menos, pero nunca dejan de temblar.</p>
` },

{ section: 'Bloque 3 · El fotón', title: 'El problema de LIGO', html: `
<p>LIGO es un interferómetro de Michelson con brazos de 4 kilómetros. Su tarea: detectar que una onda gravitacional, al pasar, estira un brazo y encoge el otro en <strong>una diezmilésima del tamaño de un protón</strong>. Para eso necesita que las franjas tiemblen lo menos posible.</p>
<div class="grid2">
  <div class="card"><div class="label">Solución obvia</div>Más luz: cientos de kilovatios circulando dentro de los brazos. Y funciona... hasta cierto punto.</div>
  <div class="card"><div class="label">El costo</div>Tanta luz empuja y calienta los espejos: los hace vibrar y deformarse. Pasado un punto, agregar luz <em>empeora</em> la medida.</div>
</div>
<div class="pregunta">Aumentar la lluvia tiene un costo. ¿Y si en lugar de más gotas lográramos que las gotas cayeran <em>ordenadas</em>?</div>
<p>Vuelve al simulador de la lluvia y activa "lluvia ordenada": mismo número de gotas, mucho menos ruido. Eso, que parece trampa, es precisamente lo que permite la mecánica cuántica. Bienvenidos al Bloque 4.</p>
<div class="card green"><div class="label">Idea para la Hoja de Ruta</div>Estación 3, "El fotón": la luz llega en gotas y contarlas tiene un ruido inevitable. Límite: más luz cuesta.</div>
` },

/* ===================== BLOQUE 4 ===================== */
{ section: 'Bloque 4 · La lluvia domada', title: 'El globo de incertidumbre', html: `
<p>La mecánica cuántica impone una regla a la luz: su incertidumbre no se puede eliminar, pero <strong>sí se puede reorganizar</strong>. Imagina la incertidumbre como un globo de agua de volumen fijo. No puedes hacerlo desaparecer, pero si lo aprietas por un lado se abulta por el otro.</p>
<p>Un interferómetro solo "mira" en una dirección: la que corresponde al desplazamiento del espejo. Si apretamos el globo justo en esa dirección, las franjas tiemblan menos, y la incertidumbre que se abultó queda en una dirección que al instrumento no le importa.</p>
<div class="sim" data-sim="globo"></div>
<div class="card gold"><div class="label">Luz comprimida (squeezed light)</div>Así se llama la luz cuyo "globo" ha sido apretado. LIGO la usa desde 2019 y mejoró su sensibilidad lo equivalente a haber aumentado la potencia del láser un 50 %, sin calentar los espejos. Es metrología cuántica funcionando todos los días.</div>
<div class="card blue"><div class="label">Donde se rompe la analogía</div>El globo de agua se puede reventar; el globo cuántico tiene un área mínima que ninguna fuerza puede reducir: es el principio de incertidumbre de Heisenberg dibujado.</div>
` },

{ section: 'Bloque 4 · La lluvia domada', title: 'Entrelazamiento: el coro afinado', html: `
<p>Hay una segunda estrategia. Recuerda la encuesta: N personas independientes dan un error que baja como 1/√N. Pero ¿y si las N personas no fueran independientes, sino que estuvieran perfectamente coordinadas?</p>
<div class="grid2">
  <div class="card"><div class="label">La multitud</div>Mil personas gritando al azar producen un ruido que crece como √N. Cada una va por su cuenta.</div>
  <div class="card gold"><div class="label">El coro</div>Mil voces afinadas producen una señal que crece como N. Están correlacionadas.</div>
</div>
<p>En el mundo cuántico esa coordinación perfecta se llama <strong>entrelazamiento</strong>. Un conjunto de N fotones o átomos entrelazados puede medir con un error que baja como <strong>1/N</strong> en vez de 1/√N. Ese es el <strong>límite de Heisenberg</strong>, la frontera última que permite la física.</p>
<div class="sim" data-sim="comparador"></div>
<div class="card blue"><div class="label">Donde se rompe la analogía</div>El coro se coordina porque sus miembros se escuchan: hay comunicación. Las partículas entrelazadas no se comunican; simplemente comparten un estado. Es más extraño que cualquier coro.</div>
<div class="card green"><div class="label">Idea para la Hoja de Ruta</div>Estación 4, "La lluvia domada": luz comprimida y entrelazamiento. Salida: hacia el límite de Heisenberg.</div>
` },

{ section: 'Bloque 4 · La lluvia domada', title: 'El átomo como péndulo perfecto', html: `
<p>Hemos resuelto el problema del ruido. Falta el del patrón. Queríamos algo que fuera idéntico en todas partes y nunca cambiara. Ese algo existe: <strong>el átomo</strong>.</p>
<p>Un átomo de cesio-133 absorbe luz de microondas a una frecuencia exactísima: 9 192 631 770 oscilaciones por segundo. No importa si está en Bogotá, en París o en Marte; no importa si es de 1967 o de 2026. Todos los átomos de cesio del universo "vibran" igual.</p>
<div class="sim" data-sim="reloj"></div>
<div class="card gold"><div class="label">Desde 1967</div>El segundo se define como 9 192 631 770 periodos de esa oscilación del cesio. Un reloj atómico de cesio no atrasaría ni un segundo en cien millones de años.</div>
<div class="card blue"><div class="label">Relojes ópticos (siglo XXI)</div>Átomos de estroncio o iterbio oscilan a frecuencias de luz visible, cien mil veces más altas. Un reloj óptico no atrasaría un segundo en toda la edad del universo. Con ellos se nota que un reloj a 1 cm de altura marcha más rápido que otro, como predijo Einstein.</div>
<div class="card green"><div class="label">Donde se rompe la analogía</div>El átomo no oscila como un péndulo visible; "oscila" entre dos niveles de energía. Pero la consecuencia es la misma: una frecuencia inmutable que sirve de patrón.</div>
` },

{ section: 'Bloque 4 · La lluvia domada', title: '2019: el fin de los trozos de metal', html: `
<p>El 20 de mayo de 2019 entró en vigor la mayor reforma del Sistema Internacional de Unidades desde su creación. Desde ese día <strong>ninguna unidad depende de un objeto físico</strong>. Todas se definen fijando el valor de constantes de la naturaleza.</p>
<table>
  <tr><th>Unidad</th><th>Antes</th><th>Desde 2019</th></tr>
  <tr><td>Segundo</td><td>Frecuencia del cesio (desde 1967)</td><td>Frecuencia del cesio</td></tr>
  <tr><td>Metro</td><td>Velocidad de la luz y segundo (desde 1983)</td><td>Velocidad de la luz y segundo</td></tr>
  <tr><td><strong>Kilogramo</strong></td><td><strong>Cilindro de platino-iridio en Sèvres</strong></td><td><strong>Constante de Planck, medida con una balanza de Kibble (un experimento cuántico)</strong></td></tr>
  <tr><td>Amperio</td><td>Fuerza entre dos conductores</td><td>Carga del electrón</td></tr>
  <tr><td>Kelvin</td><td>Punto triple del agua</td><td>Constante de Boltzmann</td></tr>
</table>
<p>Fíjate en el cierre del círculo: el segundo lo da un átomo; el metro se deriva del segundo con la luz; el kilogramo se deriva de una constante cuántica. <strong>Todas las unidades son ahora propiedades de la naturaleza medidas con átomos y fotones.</strong></p>
<p class="idea">Pasamos de confiar en un objeto guardado bajo llave en París a confiar en que todos los átomos de cesio del universo vibran exactamente igual.</p>
<div class="card green"><div class="label">Idea para la Hoja de Ruta</div>Estación 5, "El átomo": el reloj de cesio, los relojes ópticos y el SI sin objetos.</div>
` },

{ section: 'Bloque 4 · La lluvia domada', title: '¿Para qué sirve medir con fotones?', html: `
<p>La metrología cuántica no es solo para laboratorios de élite. Un minuto para cada aplicación:</p>
<div class="grid2">
  <div class="card"><div class="label">GPS</div>Cada satélite lleva relojes atómicos. Un error de un microsegundo en el tiempo es un error de 300 metros en tu posición. Sin relojes atómicos, no hay mapas en el celular.</div>
  <div class="card"><div class="label">Ondas gravitacionales</div>LIGO, con luz comprimida, escucha choques de agujeros negros a miles de millones de años luz.</div>
  <div class="card"><div class="label">Magnetómetros cuánticos</div>Sensores basados en átomos o en defectos del diamante que detectan el campo magnético del cerebro o del corazón sin contacto.</div>
  <div class="card"><div class="label">Gravimetría atómica</div>Átomos en caída libre que miden la gravedad con tal precisión que revelan agua subterránea, túneles o cámaras de magma.</div>
  <div class="card"><div class="label">Monitoreo ambiental</div>Sensores cuánticos para medir gases traza, cambios de nivel del mar por relojes ópticos, y campos eléctricos biológicos.</div>
  <div class="card"><div class="label">Salud</div>Medición de bioseñales eléctricas y magnéticas con sensibilidad que antes exigía cuartos blindados del tamaño de una casa.</div>
</div>
<div class="pregunta">¿Qué medirías tú con un fotón?</div>
` },

/* ===================== BLOQUE 5 ===================== */
{ section: 'Bloque 5 · Taller', title: 'Tu Hoja de Ruta de la Precisión', html: `
<p>Es el momento de construir el mapa del viaje. Completa las cinco estaciones con el banco de etiquetas, escribe cada límite en tus propias palabras y agrega tu aporte personal. Al terminar, revisa tus respuestas e imprime o guarda tu hoja como PDF.</p>
<div class="sim" data-sim="hojaRuta"></div>
` },

{ section: 'Bloque 5 · Taller', title: 'Hoja de Ruta completa (versión del docente)', html: `
<div class="infografico">
  <h2>Hoja de Ruta de la Precisión — De la regla al fotón</h2>
  <p style="color:#b8c2dc">Cómo pasamos de medir con trozos de metal a medir con la frecuencia de los átomos. La barra muestra la incertidumbre relativa alcanzable en cada estación: la historia contada en potencias de diez.</p>
  <div class="est"><div class="ic">📏</div><div><div class="yr">1799 / 1889</div><div class="ti">El objeto</div><div class="li">Metro y kilogramo de platino-iridio. <em>Límite:</em> el patrón se desgasta y existe en un solo lugar.</div></div><div class="bar-wrap"><div class="bar" style="width:100%"></div><div class="bar-k">~10⁻⁷</div></div></div>
  <div class="est"><div class="ic">🌊</div><div><div class="yr">1960 / 1983</div><div class="ti">La onda</div><div class="li">El metro definido por la luz (kriptón, luego velocidad de la luz). <em>Límite:</em> las franjas tiemblan.</div></div><div class="bar-wrap"><div class="bar" style="width:72%"></div><div class="bar-k">~10⁻⁹ – 10⁻¹¹</div></div></div>
  <div class="est"><div class="ic">💧</div><div><div class="yr">Siglo XX</div><div class="ti">El fotón</div><div class="li">La luz llega en gotas: ruido de disparo, límite cuántico estándar (1/√N). <em>Límite:</em> más luz cuesta.</div></div><div class="bar-wrap"><div class="bar" style="width:55%"></div><div class="bar-k">1/√N</div></div></div>
  <div class="est"><div class="ic">🌀</div><div><div class="yr">2019</div><div class="ti">La lluvia domada</div><div class="li">Luz comprimida en LIGO; entrelazamiento. <em>Salida:</em> hacia el límite de Heisenberg (1/N).</div></div><div class="bar-wrap"><div class="bar" style="width:38%"></div><div class="bar-k">→ 1/N</div></div></div>
  <div class="est"><div class="ic">⚛️</div><div><div class="yr">1967 / 2019</div><div class="ti">El átomo</div><div class="li">Reloj de cesio (10⁻¹⁶), relojes ópticos (10⁻¹⁸), SI definido por constantes. <em>Un átomo es idéntico en todo el universo.</em></div></div><div class="bar-wrap"><div class="bar" style="width:18%"></div><div class="bar-k">10⁻¹⁶ – 10⁻¹⁸</div></div></div>
  <div class="grid2" style="margin-top:18px">
    <div><strong>Analogías ancla</strong><br>🎯 La diana (exactitud vs precisión) · 🏃 Los dos corredores (interferómetro) · ☔ Lluvia sobre el paraguas (ruido de disparo) · 🎵 El coro afinado (entrelazamiento)</div>
    <div><strong>La única fórmula</strong><br><code style="color:#fff;background:rgba(255,255,255,0.12)">valor ± incertidumbre</code><br><span style="font-size:13px;color:#b8c2dc">Una medida sin incertidumbre no es una medida.</span></div>
  </div>
  <div class="frase">"Pasamos de confiar en un objeto guardado bajo llave en París a confiar en que todos los átomos de cesio del universo vibran exactamente igual."</div>
  <p style="text-align:center;font-size:12px;color:#9aa5bf;margin-top:14px;font-family:var(--font-mono)">Universidad Tecnológica de Pereira · Facultad de Ciencias Básicas · Grupo de Investigación en Metrología Bioeléctrica</p>
</div>
<p class="hint no-print" style="color:var(--muted);font-size:13px">Usa el botón de tema (☀️/🌙) y luego <em>Imprimir</em> del navegador para guardar esta página como PDF.</p>
` },

/* ===================== CIERRE ===================== */
{ section: 'Cierre', title: '¿Cuál medida era la correcta?', html: `
<p>Volvamos a la pregunta con la que empezamos. Las mesas midieron el mismo objeto y obtuvieron números distintos. ¿Cuál era la correcta?</p>
<p class="idea">Ninguna lo era sin su incertidumbre. La mejor medida es la que conoce mejor su propia duda.</p>
<p>Eso es lo que cambió entre la regla y el fotón. No es que hoy midamos "sin error": es que entendemos de dónde viene cada error, hasta el último temblor cuántico de la luz, y hemos aprendido a reorganizarlo, a domarlo y a apoyarnos en lo único que no cambia: los átomos.</p>
<h2>Encuesta de salida</h2>
<ol>
  <li>¿Qué idea de hoy te sorprendió más?</li>
  <li>¿Qué analogía te quedó grabada?</li>
  <li>¿Qué medirías tú con un fotón?</li>
</ol>
<h2>Para seguir explorando</h2>
<ul>
  <li>BIPM, <em>El Sistema Internacional de Unidades</em>, 9.ª edición (2019).</li>
  <li>LIGO Caltech, "How does LIGO work?" y la nota sobre luz comprimida (2019).</li>
  <li>NIST, páginas de divulgación sobre relojes atómicos y la redefinición del kilogramo.</li>
  <li>Giovannetti, Lloyd y Maccone, "Advances in quantum metrology", <em>Nature Photonics</em> (2011).</li>
  <li>Simulaciones PhET (Universidad de Colorado), Quantum Flytrap Virtual Lab y los applets de Falstad.</li>
</ul>
` },

/* ===================== GUÍA DOCENTE ===================== */
{ section: 'Guía del docente', title: 'Cronograma de las 4 horas', html: `
<table>
  <tr><th>Tiempo</th><th>Bloque</th><th>Páginas del cuaderno</th><th>Actividad clave</th></tr>
  <tr><td>0:00 – 0:15</td><td>Apertura</td><td>1</td><td>Medir el mismo objeto con instrumentos distintos; tablero en vivo</td></tr>
  <tr><td>0:15 – 1:00</td><td>Bloque 1 · El objeto</td><td>2 – 4</td><td>Simulador de diana con las medidas de las mesas; cadena de trazabilidad</td></tr>
  <tr><td>1:00 – 1:45</td><td>Bloque 2 · La onda</td><td>5 – 7</td><td>Tanque de ondas; interferómetro: "cuenta 10 franjas"</td></tr>
  <tr><td>1:45 – 2:00</td><td>Pausa</td><td>—</td><td></td></tr>
  <tr><td>2:00 – 2:45</td><td>Bloque 3 · El fotón</td><td>8 – 10</td><td>Demostración del paraguas con arroz; simulador de lluvia; tabla √N</td></tr>
  <tr><td>2:45 – 3:30</td><td>Bloque 4 · La lluvia domada</td><td>11 – 15</td><td>Globo de incertidumbre; comparador 1/√N vs 1/N; péndulo vs átomo; SI 2019</td></tr>
  <tr><td>3:30 – 3:55</td><td>Bloque 5 · Taller</td><td>16 – 17</td><td>Cada asistente completa su Hoja de Ruta</td></tr>
  <tr><td>3:55 – 4:00</td><td>Cierre</td><td>18</td><td>Frase final y encuesta de salida</td></tr>
</table>
<div class="card gold"><div class="label">Regla de oro de ritmo</div>Ningún tramo expositivo supera los 12 minutos seguidos sin una simulación, una pregunta o una manipulación.</div>
<h2>Materiales</h2>
<ul>
  <li>Un objeto idéntico por mesa y 4 – 5 instrumentos distintos (regla escolar, cinta métrica, calibrador, regla vieja, escuadra).</li>
  <li>Paraguas abierto o bandeja metálica y 1 kg de arroz o lentejas.</li>
  <li>Opcional: puntero láser y un CD para mostrar difracción real en dos minutos.</li>
  <li>Computador con este cuaderno abierto, proyector, parlantes para el video de LIGO, y el enlace o código QR del cuaderno para los celulares de los asistentes.</li>
</ul>
` },

{ section: 'Guía del docente', title: 'Analogías: uso y punto de ruptura', html: `
<p>Cada analogía se introduce, se explota y luego se <strong>rompe explícitamente</strong> para evitar concepciones erróneas.</p>
<table>
  <tr><th>Concepto</th><th>Analogía</th><th>Dónde se rompe</th></tr>
  <tr><td>Patrón y trazabilidad</td><td>La receta de la abuela que cambia en cada copia</td><td>En metrología la desviación se mide y documenta</td></tr>
  <tr><td>Exactitud vs precisión</td><td>Tiro al blanco</td><td>El "centro" (valor verdadero) nunca se conoce del todo</td></tr>
  <tr><td>Incertidumbre</td><td>"El bus llega a las 7:10 ± 5 min"</td><td>La incertidumbre metrológica tiene nivel de confianza definido</td></tr>
  <tr><td>Interferencia</td><td>Dos personas aplaudiendo en fase o en contrafase</td><td>El sonido no es luz, pero la suma y cancelación de ondas es la misma</td></tr>
  <tr><td>Interferómetro</td><td>Dos corredores: la diferencia en la meta revela el metro extra</td><td>Se detecta por fase, no por tiempo de llegada</td></tr>
  <tr><td>Ruido de disparo</td><td>Lluvia sobre un paraguas</td><td>Las gotas son independientes; los fotones comprimidos no lo son</td></tr>
  <tr><td>Escala 1/√N</td><td>Encuesta electoral</td><td>Es la misma matemática, no solo una analogía</td></tr>
  <tr><td>Luz comprimida</td><td>Globo de agua que se abulta por el otro lado</td><td>El globo cuántico tiene área mínima; el real puede reventar</td></tr>
  <tr><td>Entrelazamiento</td><td>Coro afinado vs multitud</td><td>El coro se coordina por comunicación; el entrelazamiento no transmite información</td></tr>
  <tr><td>Reloj atómico</td><td>Péndulo que nunca se desgasta ni siente el calor</td><td>El átomo no oscila visiblemente: es una transición entre niveles</td></tr>
</table>
<h2>Evaluación formativa</h2>
<ul>
  <li><strong>Apertura:</strong> ¿reportan incertidumbre? (línea base: casi nunca).</li>
  <li><strong>Bloque 1:</strong> clasifican correctamente las medidas en la diana.</li>
  <li><strong>Bloque 2:</strong> relacionan franjas con desplazamiento del espejo.</li>
  <li><strong>Bloque 3:</strong> predicen que el ruido relativo baja pero no desaparece.</li>
  <li><strong>Bloque 4:</strong> distinguen "más lluvia" de "lluvia ordenada".</li>
  <li><strong>Bloque 5:</strong> la Hoja de Ruta tiene las cinco estaciones en orden y cada límite en palabras propias.</li>
</ul>
` },

];
