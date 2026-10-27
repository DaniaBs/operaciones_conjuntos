# # Operaciones con Conjuntos

Proyecto final del curso de **Matemática Discreta**.

Aplicación web que realiza operaciones con conjuntos (unión, intersección, diferencia,
diferencia simétrica y complemento) y muestra el resultado junto a un **diagrama de Venn**.
Está hecha con HTML, CSS y JavaScript, sin librerías externas ni instalación.

## Cómo ejecutarlo

1. Descargar o clonar el repositorio.
2. Abrir el archivo `index.html` con el navegador (Chrome, Edge o Firefox). Con doble clic basta.

También se puede abrir con la extensión **Live Server** de Visual Studio Code.
No necesita internet ni servidor.

## Módulos

El menú principal tiene tres opciones:

| Menú | Contenido |
|---|---|
| **Inicio** | Presentación del proyecto, acceso a las operaciones y pasos de uso |
| **Conjuntos ▾** | Unión, Intersección, Diferencia, Diferencia simétrica y Complemento |
| **Sobre nosotros** | Fotografía y nombre de los integrantes del grupo |

## Operaciones

| Operación | Notación | Resultado |
|---|---|---|
| Unión | A ∪ B | Elementos que están en A o en B |
| Intersección | A ∩ B | Elementos que están en A y en B a la vez |
| Diferencia | A − B | Elementos de A que no están en B |
| Diferencia simétrica | A Δ B | Elementos que están en A o en B, pero no en los dos: (A − B) ∪ (B − A) |
| Complemento | A′ | Elementos del conjunto universal U que no están en A |

### Ejemplo

Con A = {1, 2, 3, 4} y B = {3, 4, 5, 6}:

| Operación | Resultado |
|---|---|
| A ∪ B | {1, 2, 3, 4, 5, 6} |
| A ∩ B | {3, 4} |
| A − B | {1, 2} |
| B − A | {5, 6} |
| A Δ B | {1, 2, 5, 6} |

Con U = {1, 2, 3, 4, 5, 6, 7, 8} y A = {2, 4, 6}: A′ = {1, 3, 5, 7, 8}.

## Cómo se usa

1. Elegir una operación en el menú **Conjuntos**.
2. Escribir los elementos de cada conjunto separados por comas, por ejemplo `1, 2, 3, 4`.
   Pueden ser números o texto. Los elementos repetidos se eliminan automáticamente.
3. Presionar **Calcular** (o la tecla Enter) para ver el resultado y el diagrama de Venn.

Otras funciones:

- **Ejemplo:** llena los campos con datos de prueba y calcula.
- **Limpiar:** borra los campos y el resultado.
- **+ Añadir conjunto / − Quitar conjunto:** cada operación empieza con dos conjuntos (A y B) y
  se pueden agregar hasta 5 (A, B, C, D y E).
- **Diagrama de Venn:** se dibuja con 2 o 3 conjuntos. Con 4 o 5 se muestra solo el resultado.
- **Diferencia con varios conjuntos:** se elige de cuál se parte. Por ejemplo, A − B − C equivale a A − (B ∪ C).
- **Diferencia simétrica con varios conjuntos:** se aplica de izquierda a derecha, (A Δ B) Δ C.
  Quedan los elementos que pertenecen a un número impar de conjuntos.
- **Complemento:** se escribe el universo U y el conjunto A. Si A tiene elementos que no están en U,
  el programa muestra un aviso, porque A debe ser subconjunto de U.
- La página recuerda la sección en la que estás si se recarga.

## Estructura del proyecto

```
conjuntos/
├── index.html     Estructura de la página y menú principal
├── estilos.css    Diseño visual
├── script.js      Lógica de las operaciones y diagramas de Venn
├── img/           Fotografías de los integrantes (integrante1.jpg ... integrante6.jpg)
└── README.md
```

### Organización de `script.js`

El código está comentado en español y dividido en secciones:

- **Navegación:** `mostrar()` cambia de página con el menú.
- **Funciones de ayuda:** `leerConjunto()` convierte el texto en un conjunto sin repetidos.
- **Operaciones con dos conjuntos:** `union()`, `interseccion()`, `diferencia()`,
  `diferenciaSimetrica()` y `complemento()`.
- **Operaciones con varios conjuntos:** `unionTodos()`, `interseccionTodos()`,
  `diferenciaTodos()` y `simetricaTodos()`, que aplican la operación de dos en dos.
- **Campos y resultado:** `dibujarCampos()`, `agregarConjunto()`, `quitarConjunto()` y `mostrarResultado()`.
- **Diagrama de Venn:** `dibujarVenn()` genera el dibujo en SVG y pinta cada zona del resultado.

## Herramientas

- Lenguajes: HTML5, CSS3 y JavaScript
- Editor: Visual Studio Code
- Control de versiones: Git y GitHub

## Integrantes

| Integrante | Responsabilidad |
|---|---|
| Nombre del integrante 1 | Menú principal y navegación entre páginas |
| Nombre del integrante 2 | Unión e intersección |
| Nombre del integrante 3 | Diferencia y diferencia simétrica |
| Nombre del integrante 4 | Complemento y validación de datos |
| Nombre del integrante 5 | Diagramas de Venn y diseño de la página |
| Nombre del integrante 6 | Documentación, video y repositorio en GitHub |

## Entregables

- Código fuente comentado: este repositorio
- Ejecutable: abrir `index.html` en el navegador
- Video del funcionamiento: [pegar aquí el enlace]
