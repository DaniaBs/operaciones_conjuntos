// Proyecto Final - Matemática Discreta
// Operaciones con conjuntos: unión, intersección, diferencia,
// diferencia simétrica y complemento (con diagrama de Venn dibujado en SVG)

var NOMBRES = ["A", "B", "C", "D", "E"];   // nombres de los conjuntos
var MINIMO = 2;                            // cantidad mínima de conjuntos
var MAXIMO = 5;                            // cantidad máxima de conjuntos

var VERDE = "#8fe0b0";                           // color de la zona del resultado en el Venn
var COLORES = ["#0099cc", "#e67e22", "#8e44ad"]; // color de A, B y C en el Venn

// Datos de ejemplo para los botones "Ejemplo" (uno por cada conjunto)
var EJEMPLOS = ["1, 2, 3, 4", "3, 4, 5, 6", "1, 4, 6, 7", "4, 7, 8, 9", "4, 9, 10, 11"];

// Cuántos conjuntos está usando cada operación (al inicio son 2)
var cantidad = { union: 2, inter: 2, dif: 2, sim: 2 };

// ---------- Cambiar de página con el menú ----------
function mostrar(id) {
  // Se ocultan todas las páginas y se muestra solo la elegida
  var paginas = document.getElementsByClassName("pagina");
  for (var i = 0; i < paginas.length; i++) {
    paginas[i].classList.add("oculto");
  }
  document.getElementById(id).classList.remove("oculto");

  // Se marca en el menú la opción en la que estamos
  var enlaces = document.querySelectorAll(".menu a[data-pagina]");
  for (var j = 0; j < enlaces.length; j++) {
    if (enlaces[j].getAttribute("data-pagina") === id) {
      enlaces[j].classList.add("activo");
    } else {
      enlaces[j].classList.remove("activo");
    }
  }
  var esOperacion = ["union", "interseccion", "diferencia", "simetrica", "complemento"].includes(id);
  if (esOperacion) {
    document.getElementById("btn-conjuntos").classList.add("activo");
  } else {
    document.getElementById("btn-conjuntos").classList.remove("activo");
  }

  // Se guarda la página actual para recordarla si se recarga
  try {
    sessionStorage.setItem("pagina", id);
  } catch (e) {
    // si el navegador no deja guardar, no pasa nada
  }
}

// ---------- Funciones de ayuda ----------

// Convierte el texto "1, 2, 3" en un arreglo ["1", "2", "3"] sin repetidos
function leerConjunto(texto) {
  var partes = texto.split(",");
  var conjunto = [];
  for (var i = 0; i < partes.length; i++) {
    // Se quitan los símbolos < > & " para que no dañen la página
    var elemento = partes[i].trim().replace(/[<>&"]/g, "");
    if (elemento !== "" && !conjunto.includes(elemento)) {
      conjunto.push(elemento);
    }
  }
  return conjunto;
}

// Escribe un conjunto con llaves: {1, 2, 3}  (o ∅ si está vacío)
function mostrarConjunto(conjunto) {
  if (conjunto.length === 0) {
    return "∅";
  }
  return "{" + conjunto.join(", ") + "}";
}

// Escribe un mensaje de error en el cuadro de resultado
function mostrarError(prefijo, mensaje) {
  var caja = document.getElementById(prefijo + "-res");
  caja.classList.add("con-error");
  caja.innerHTML = mensaje;
}

// Lee los conjuntos que hay escritos en una operación (A, B, C...)
function leerTodos(prefijo) {
  var lista = [];
  for (var i = 0; i < cantidad[prefijo]; i++) {
    lista.push(leerConjunto(document.getElementById(prefijo + "-" + i).value));
  }
  return lista;
}

// Revisa que se hayan escrito datos. Devuelve true si todo está bien
function hayDatos(prefijo, lista) {
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].length > 0) {
      return true;
    }
  }
  mostrarError(prefijo, "Escribe al menos un elemento en alguno de los conjuntos.");
  return false;
}

// ---------- Operaciones con dos conjuntos ----------

// Unión: elementos que están en A o en B
function union(a, b) {
  var resultado = [];
  for (var i = 0; i < a.length; i++) {
    resultado.push(a[i]);
  }
  for (var j = 0; j < b.length; j++) {
    if (!resultado.includes(b[j])) {   // para no repetir los que ya están
      resultado.push(b[j]);
    }
  }
  return resultado;
}

// Intersección: elementos que están en A y en B
function interseccion(a, b) {
  var resultado = [];
  for (var i = 0; i < a.length; i++) {
    if (b.includes(a[i])) {
      resultado.push(a[i]);
    }
  }
  return resultado;
}

// Diferencia: elementos que están en A pero no en B
function diferencia(a, b) {
  var resultado = [];
  for (var i = 0; i < a.length; i++) {
    if (!b.includes(a[i])) {
      resultado.push(a[i]);
    }
  }
  return resultado;
}

// Diferencia simétrica: (A − B) ∪ (B − A)
function diferenciaSimetrica(a, b) {
  return union(diferencia(a, b), diferencia(b, a));
}

// Complemento de A respecto al universo U = U − A
function complemento(u, a) {
  return diferencia(u, a);
}

// ---------- Operaciones con varios conjuntos ----------
// Se aplica la operación de dos en dos, de izquierda a derecha

function unionTodos(lista) {
  var resultado = lista[0];
  for (var i = 1; i < lista.length; i++) {
    resultado = union(resultado, lista[i]);
  }
  return resultado;
}

function interseccionTodos(lista) {
  var resultado = lista[0];
  for (var i = 1; i < lista.length; i++) {
    resultado = interseccion(resultado, lista[i]);
  }
  return resultado;
}

// Al conjunto número k se le quitan los elementos de todos los demás
function diferenciaTodos(lista, k) {
  var resultado = lista[k];
  for (var i = 0; i < lista.length; i++) {
    if (i !== k) {
      resultado = diferencia(resultado, lista[i]);
    }
  }
  return resultado;
}

function simetricaTodos(lista) {
  var resultado = lista[0];
  for (var i = 1; i < lista.length; i++) {
    resultado = diferenciaSimetrica(resultado, lista[i]);
  }
  return resultado;
}

// ---------- Títulos de las fórmulas ----------

// Ejemplo con 3 conjuntos y símbolo "∪":  A ∪ B ∪ C
function nombresUnidos(n, simbolo) {
  return NOMBRES.slice(0, n).join(" " + simbolo + " ");
}

// Ejemplo con 3 conjuntos y k = 1:  B − A − C
function tituloDiferencia(n, k) {
  var texto = NOMBRES[k];
  for (var i = 0; i < n; i++) {
    if (i !== k) {
      texto += " − " + NOMBRES[i];
    }
  }
  return texto;
}

// Número de la opción elegida en la lista de la diferencia (0 = A, 1 = B...)
function conjuntoElegido() {
  var k = parseInt(document.getElementById("dif-cual").value, 10);
  if (isNaN(k)) {
    k = 0;
  }
  return k;
}

// Cambia la fórmula que aparece arriba a la derecha del título
function actualizarFormula(prefijo) {
  var n = cantidad[prefijo];
  var texto = "";
  if (prefijo === "union") {
    texto = nombresUnidos(n, "∪");
  } else if (prefijo === "inter") {
    texto = nombresUnidos(n, "∩");
  } else if (prefijo === "dif") {
    texto = tituloDiferencia(n, conjuntoElegido());
  } else if (prefijo === "sim") {
    texto = nombresUnidos(n, "Δ");
  }
  document.getElementById(prefijo + "-formula").textContent = texto;
}

// ---------- Campos de texto de los conjuntos ----------

// Dibuja los campos A, B, C... según cuántos conjuntos haya en la operación
function dibujarCampos(prefijo) {
  var n = cantidad[prefijo];

  // Primero se guardan los textos que ya estaban escritos
  var valores = [];
  for (var i = 0; i < MAXIMO; i++) {
    var campo = document.getElementById(prefijo + "-" + i);
    if (campo) {
      valores.push(campo.value);
    } else {
      valores.push("");
    }
  }

  var html = "";
  for (var j = 0; j < n; j++) {
    html += "<label>Conjunto " + NOMBRES[j] + "</label>";
    html += '<input type="text" id="' + prefijo + "-" + j + '" placeholder="Ejemplo: ' + EJEMPLOS[j] + '"' +
            ' onkeydown="teclaEnter(event, \'' + prefijo + '\')">';
  }
  document.getElementById(prefijo + "-campos").innerHTML = html;

  // Se vuelven a poner los textos que estaban escritos
  for (var m = 0; m < n; m++) {
    document.getElementById(prefijo + "-" + m).value = valores[m];
  }

  // Los botones se desactivan al llegar al mínimo o al máximo
  document.getElementById(prefijo + "-mas").disabled = (n >= MAXIMO);
  document.getElementById(prefijo + "-menos").disabled = (n <= MINIMO);

  // En la diferencia hay que actualizar la lista de opciones (A − B, B − A...)
  if (prefijo === "dif") {
    var lista = document.getElementById("dif-cual");
    var anterior = lista.selectedIndex;
    var opciones = "";
    for (var x = 0; x < n; x++) {
      opciones += '<option value="' + x + '">' + tituloDiferencia(n, x) + "</option>";
    }
    lista.innerHTML = opciones;
    if (anterior >= 0 && anterior < n) {
      lista.selectedIndex = anterior;
    }
  }

  actualizarFormula(prefijo);
}

// Al presionar Enter dentro de un campo se calcula
function teclaEnter(evento, prefijo) {
  if (evento.key === "Enter") {
    calcular(prefijo);
  }
}

function agregarConjunto(prefijo) {
  if (cantidad[prefijo] < MAXIMO) {
    cantidad[prefijo]++;
    dibujarCampos(prefijo);
    reiniciarResultado(prefijo);
  }
}

function quitarConjunto(prefijo) {
  if (cantidad[prefijo] > MINIMO) {
    cantidad[prefijo]--;
    dibujarCampos(prefijo);
    reiniciarResultado(prefijo);
  }
}

// Borra el resultado anterior y deja el diagrama vacío (con la forma nueva)
function reiniciarResultado(prefijo) {
  var caja = document.getElementById(prefijo + "-res");
  caja.innerHTML = "";
  caja.classList.remove("con-error");
  dibujarVenn(prefijo + "-venn", "", listaVacia(cantidad[prefijo]), 0, null);
}

// Si se cambia la opción de la diferencia y ya había un resultado, se recalcula
function cambiarDiferencia() {
  actualizarFormula("dif");
  var caja = document.getElementById("dif-res");
  if (caja.innerHTML !== "" && !caja.classList.contains("con-error")) {
    calcular("dif");
  }
}

// ---------- Mostrar el resultado en pantalla ----------

// Arma el cuadro de resultado: conjuntos, fórmula, "chips" y cantidad
// "lineas" es la lista de textos como "A = {1, 2}"
function mostrarResultado(prefijo, lineas, titulo, resultado) {
  var html = "";
  for (var j = 0; j < lineas.length; j++) {
    html += lineas[j] + "<br>";
  }
  html += "<div class='formula'>" + titulo + " = " + mostrarConjunto(resultado) + "</div>";

  html += "<div class='chips'>";
  for (var i = 0; i < resultado.length; i++) {
    html += "<span class='chip'>" + resultado[i] + "</span>";
  }
  html += "</div>";
  html += "<p class='cantidad'>Cantidad de elementos: " + resultado.length + "</p>";

  var caja = document.getElementById(prefijo + "-res");
  caja.classList.remove("con-error");
  caja.innerHTML = html;
}

// ---------- Diagrama de Venn ----------

// Posiciones de todo lo que se dibuja con 2 conjuntos
var VENN2 = {
  alto: 240,
  fuente: 13,
  circulos: [ { x: 150, y: 125, r: 80 }, { x: 250, y: 125, r: 80 } ],
  letras: [ { x: 105, y: 97 }, { x: 295, y: 97 } ],
  // textos de cada zona: "A" = solo A, "AB" = A y B a la vez, etc.
  textos: {
    A:  { x: 115, y: 130, max: 13 },
    B:  { x: 285, y: 130, max: 13 },
    AB: { x: 200, y: 130, max: 7 }
  }
};

// Posiciones con 3 conjuntos
var VENN3 = {
  alto: 270,
  fuente: 11,
  circulos: [ { x: 150, y: 100, r: 70 }, { x: 250, y: 100, r: 70 }, { x: 200, y: 185, r: 70 } ],
  letras: [ { x: 92, y: 55 }, { x: 308, y: 55 }, { x: 278, y: 238 } ],
  textos: {
    A:   { x: 122, y: 92, max: 11 },
    B:   { x: 278, y: 92, max: 11 },
    C:   { x: 200, y: 228, max: 14 },
    AB:  { x: 200, y: 80, max: 5 },
    AC:  { x: 152, y: 160, max: 7 },
    BC:  { x: 248, y: 160, max: 7 },
    ABC: { x: 200, y: 132, max: 5 }
  }
};

// Recorta el texto de una zona para que quepa dentro del círculo
function cortar(lista, maximo) {
  var texto = lista.join(", ");
  if (texto.length > maximo) {
    texto = texto.substring(0, maximo - 1) + "…";
  }
  return texto;
}

// Crea n conjuntos vacíos (para dibujar el diagrama sin datos)
function listaVacia(n) {
  var lista = [];
  for (var i = 0; i < n; i++) {
    lista.push([]);
  }
  return lista;
}

// Reparte los elementos en las zonas del diagrama.
// La "firma" de un elemento son las letras de los conjuntos donde está:
// un elemento que está en A y en C tiene la firma "AC".
function agrupar(lista) {
  var grupos = {};
  var vistos = [];
  for (var i = 0; i < lista.length; i++) {
    for (var j = 0; j < lista[i].length; j++) {
      var elemento = lista[i][j];
      if (vistos.includes(elemento)) {
        continue;
      }
      vistos.push(elemento);

      var firma = "";
      for (var k = 0; k < lista.length; k++) {
        if (lista[k].includes(elemento)) {
          firma += NOMBRES[k];
        }
      }
      if (!grupos[firma]) {
        grupos[firma] = [];
      }
      grupos[firma].push(elemento);
    }
  }
  return grupos;
}

// Lista todas las zonas posibles con n conjuntos: A, B, AB, C, AC, BC, ABC...
function todasLasFirmas(n) {
  var firmas = [];
  for (var m = 1; m < Math.pow(2, n); m++) {
    var firma = "";
    for (var i = 0; i < n; i++) {
      if ((m >> i) & 1) {       // el bit i indica si el conjunto i forma parte de la zona
        firma += NOMBRES[i];
      }
    }
    firmas.push(firma);
  }
  return firmas;
}

// ¿Esa zona forma parte del resultado de la operación? (si es así se pinta de verde)
function enZona(prefijo, firma, n, k) {
  if (prefijo === "union") {
    return true;                          // cualquier zona dentro de algún conjunto
  } else if (prefijo === "inter") {
    return firma.length === n;            // solo la zona donde están todos
  } else if (prefijo === "dif") {
    return firma === NOMBRES[k];          // solo la parte exclusiva del conjunto k
  } else if (prefijo === "sim") {
    return firma.length % 2 === 1;        // zonas con un número impar de conjuntos
  }
  return false;
}

// Dibuja el diagrama de Venn dentro del div con el id indicado.
// Con "prefijo" vacío no se pinta ninguna zona (diagrama vacío).
// "resultado" es null cuando todavía no se ha calculado nada.
function dibujarVenn(id, prefijo, lista, k, resultado) {
  var caja = document.getElementById(id);
  var n = lista.length;

  if (n > 3) {
    caja.innerHTML = "<p class='aviso-venn'>El diagrama de Venn se dibuja cuando hay 2 o 3 conjuntos. " +
                     "Con " + n + " conjuntos solo se muestra el resultado.</p>";
    return;
  }

  var cfg = (n === 2) ? VENN2 : VENN3;
  var alto = cfg.alto;
  var grupos = agrupar(lista);
  var firmas = todasLasFirmas(n);

  var defs = "";
  var s = "";

  // Recortes con la forma de cada círculo
  for (var i = 0; i < n; i++) {
    var c = cfg.circulos[i];
    defs += '<clipPath id="' + id + '-c' + i + '"><circle cx="' + c.x + '" cy="' + c.y + '" r="' + c.r + '"/></clipPath>';
  }

  // Marco del universo
  s += '<rect x="5" y="5" width="390" height="' + (alto - 10) + '" rx="10" fill="white" stroke="#8a97a3" stroke-dasharray="5,4"/>';
  s += '<text x="18" y="27" font-size="15" font-weight="bold" fill="#5b6b78">U</text>';

  // Zonas del resultado (en verde)
  for (var f = 0; f < firmas.length; f++) {
    var firma = firmas[f];
    if (!enZona(prefijo, firma, n, k)) {
      continue;
    }

    // Para pintar una zona: se recorta dentro de los círculos donde está
    // y se tapan (con una máscara) los círculos donde NO está
    var abre = "";
    var cierra = "";
    var tapar = "";
    for (var j = 0; j < n; j++) {
      var cj = cfg.circulos[j];
      if (firma.indexOf(NOMBRES[j]) >= 0) {
        abre += '<g clip-path="url(#' + id + '-c' + j + ')">';
        cierra += "</g>";
      } else {
        tapar += '<circle cx="' + cj.x + '" cy="' + cj.y + '" r="' + cj.r + '" fill="black"/>';
      }
    }
    if (tapar !== "") {
      var mascara = id + "-m" + firma;
      defs += '<mask id="' + mascara + '" maskUnits="userSpaceOnUse" x="0" y="0" width="400" height="' + alto + '">' +
              '<rect x="0" y="0" width="400" height="' + alto + '" fill="white"/>' + tapar + "</mask>";
      abre = '<g mask="url(#' + mascara + ')">' + abre;
      cierra += "</g>";
    }
    s += abre + '<rect x="0" y="0" width="400" height="' + alto + '" fill="' + VERDE + '"/>' + cierra;
  }

  // Contornos y letras de cada conjunto
  for (var p = 0; p < n; p++) {
    var cp = cfg.circulos[p];
    s += '<circle cx="' + cp.x + '" cy="' + cp.y + '" r="' + cp.r + '" fill="none" stroke="' + COLORES[p] + '" stroke-width="3"/>';
  }
  for (var q = 0; q < n; q++) {
    var lt = cfg.letras[q];
    s += '<text x="' + lt.x + '" y="' + lt.y + '" font-size="20" font-weight="bold" fill="' + COLORES[q] + '" text-anchor="middle">' + NOMBRES[q] + "</text>";
  }

  // Elementos escritos dentro de cada zona
  for (var clave in cfg.textos) {
    var t = cfg.textos[clave];
    var elementos = grupos[clave] || [];
    s += '<text x="' + t.x + '" y="' + t.y + '" font-size="' + cfg.fuente + '" text-anchor="middle">' + cortar(elementos, t.max) + "</text>";
  }

  // Si el resultado quedó vacío se avisa en una esquina
  if (resultado !== null && resultado.length === 0) {
    s += '<text x="385" y="27" font-size="13" fill="#8a97a3" text-anchor="end">Resultado: ∅</text>';
  }

  caja.innerHTML = '<svg viewBox="0 0 400 ' + alto + '" xmlns="http://www.w3.org/2000/svg" font-family="Arial">' +
                   "<defs>" + defs + "</defs>" + s + "</svg>";
}

// Diagrama del complemento: un círculo (A) dentro del universo (U)
function dibujarVennComplemento(a, u) {
  var fuera = diferencia(u, a);
  var s = '<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" font-family="Arial">';
  s += '<rect x="5" y="5" width="390" height="230" rx="10" fill="' + VERDE + '" stroke="#8a97a3" stroke-dasharray="5,4"/>';
  s += '<circle cx="200" cy="125" r="75" fill="white" stroke="' + COLORES[0] + '" stroke-width="3"/>';
  s += '<text x="18" y="27" font-size="15" font-weight="bold" fill="#5b6b78">U</text>';
  s += '<text x="200" y="82" font-size="20" font-weight="bold" fill="' + COLORES[0] + '" text-anchor="middle">A</text>';
  s += '<text x="200" y="130" font-size="13" text-anchor="middle">' + cortar(a, 14) + "</text>";

  // Los elementos de afuera se reparten a la izquierda y a la derecha
  var izquierda = [];
  var derecha = [];
  for (var i = 0; i < fuera.length; i++) {
    if (i % 2 === 0) {
      izquierda.push(fuera[i]);
    } else {
      derecha.push(fuera[i]);
    }
  }
  s += '<text x="65" y="130" font-size="13" text-anchor="middle">' + cortar(izquierda, 15) + "</text>";
  s += '<text x="335" y="130" font-size="13" text-anchor="middle">' + cortar(derecha, 15) + "</text>";
  s += "</svg>";
  document.getElementById("comp-venn").innerHTML = s;
}

// ---------- Botones de calcular, ejemplo y limpiar ----------

// Calcula la operación indicada: "union", "inter", "dif" o "sim"
function calcular(prefijo) {
  var lista = leerTodos(prefijo);
  var n = lista.length;
  if (!hayDatos(prefijo, lista)) {
    return;
  }

  var resultado = [];
  var titulo = "";
  var k = 0;

  if (prefijo === "union") {
    resultado = unionTodos(lista);
    titulo = nombresUnidos(n, "∪");
  } else if (prefijo === "inter") {
    resultado = interseccionTodos(lista);
    titulo = nombresUnidos(n, "∩");
  } else if (prefijo === "dif") {
    k = conjuntoElegido();
    resultado = diferenciaTodos(lista, k);
    titulo = tituloDiferencia(n, k);
  } else if (prefijo === "sim") {
    resultado = simetricaTodos(lista);
    titulo = nombresUnidos(n, "Δ");
  }

  var lineas = [];
  for (var i = 0; i < n; i++) {
    lineas.push(NOMBRES[i] + " = " + mostrarConjunto(lista[i]));
  }
  mostrarResultado(prefijo, lineas, titulo, resultado);
  dibujarVenn(prefijo + "-venn", prefijo, lista, k, resultado);
}

// Llena los campos con datos de ejemplo y calcula
function ejemplo(prefijo) {
  for (var i = 0; i < cantidad[prefijo]; i++) {
    document.getElementById(prefijo + "-" + i).value = EJEMPLOS[i];
  }
  calcular(prefijo);
}

// Borra los campos y el resultado
function limpiar(prefijo) {
  for (var i = 0; i < cantidad[prefijo]; i++) {
    document.getElementById(prefijo + "-" + i).value = "";
  }
  reiniciarResultado(prefijo);
}

// ---------- Complemento ----------

function calcularComplemento() {
  var u = leerConjunto(document.getElementById("comp-u").value);
  var a = leerConjunto(document.getElementById("comp-a").value);

  if (u.length === 0) {
    mostrarError("comp", "Escribe los elementos del conjunto universal U.");
    return;
  }

  // A tiene que ser subconjunto de U
  var sobran = diferencia(a, u);
  if (sobran.length > 0) {
    mostrarError("comp", "A debe ser subconjunto de U. Estos elementos de A no están en U: " +
                 mostrarConjunto(sobran));
    return;
  }

  var resultado = complemento(u, a);
  mostrarResultado("comp", ["U = " + mostrarConjunto(u), "A = " + mostrarConjunto(a)], "A′", resultado);
  dibujarVennComplemento(a, u);
}

function ejemploComplemento() {
  document.getElementById("comp-u").value = "1, 2, 3, 4, 5, 6, 7, 8";
  document.getElementById("comp-a").value = "2, 4, 6";
  calcularComplemento();
}

function limpiarComplemento() {
  document.getElementById("comp-u").value = "";
  document.getElementById("comp-a").value = "";
  var caja = document.getElementById("comp-res");
  caja.innerHTML = "";
  caja.classList.remove("con-error");
  dibujarVennComplemento([], []);
}

// ---------- Al abrir la página ----------

var operaciones = ["union", "inter", "dif", "sim"];
for (var o = 0; o < operaciones.length; o++) {
  dibujarCampos(operaciones[o]);
  dibujarVenn(operaciones[o] + "-venn", "", listaVacia(cantidad[operaciones[o]]), 0, null);
}
dibujarVennComplemento([], []);
var paginaGuardada = "inicio";
try {
  paginaGuardada = sessionStorage.getItem("pagina") || "inicio";
} catch (e) {
  paginaGuardada = "inicio";
}
var elemento = document.getElementById(paginaGuardada);
if (elemento === null || !elemento.classList.contains("pagina")) {
  paginaGuardada = "inicio";
}
mostrar(paginaGuardada);