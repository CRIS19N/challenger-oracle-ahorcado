//dimensiones del canvas
let canvasWidth = CANVAS.width;
let canvasHeight = CANVAS.height;
let grosoLinea = 15;

function lineaVertical() {
  linea(180, 60, 180, 690, "red", grosoLinea);
}

function lineaHorizontal() {
  linea(180, 60, 580, 60, "black", grosoLinea);
}

function lazo() {
  linea(580, 60, 580, 200, "brown", grosoLinea);
}

function cabeza() {
  circulo();
}

function tronco() {
  linea(580, 600, 580, 375, "black", grosoLinea);
}

function manoIzquierda() {
  linea(580, 450, 450, 380, "black", grosoLinea);
}

function manoDerecha() {
  linea(580, 450, 720, 380, "black", grosoLinea);
}

function pieIzquierdo() {
  linea(580, 600, 450, 650, "black", grosoLinea);
}

function pieDerecho() {
  linea(580, 600, 720, 650, "black", grosoLinea);
}

function newWord() {
  let newWord = document.getElementById("input-nueva-palabra");
  let word = newWord.value.toUpperCase();
  word = word.trim();
  let result = /^[A-Z\s]+$/.test(word);
  newWord.value = word;
  if (word.length > 16 || !result) {
    if (word.length > 16) {
      console.warn(`La palabra no puede ser mayor a 16 dígitos`);
    } else if (!result) {
      console.warn(`No puede tener caracteres extraños ó números`);
    }
    newWord.value = "";
  } else {
    if (!JSONWORDS.includes(word)) {
      JSONWORDS.push(word);
    }
    newWord.value = "";
    alert("Se agrego correctamente la palabra");
  }
}

function jugar(params) {
  var rand = ~~(Math.random() * myArray.length);
  console.log(JSONWORDS.length);
}
//agregar nueva palabra
const BTNWORDNEW = document.getElementById("nueva-palabra");
BTNWORDNEW.onclick = newWord;

//btn iniciar Juego
const BTNPLAY = document.getElementById("iniciar-juego");

/* linea(350, 760, 400, 760, "black", grosoLinea - 10); //pie derecha */

//desde donde se pintara la primera palabra
//debe iniciar desde x 350 y=760 hasta x=750 y=760 esto le da un tamaño de 59px
let letraXDesde = 340;
let letraYHasta = 380;
let positionY = 760;
let widthLinea = grosoLinea - 10;

let letras = "NAME IS CRISTIAN";
if (letras.length > 16) {
  console.log(
    "letras " +
      letras.length +
      " excedió el tamaño - el temaño permitido es 16 letras"
  );
}
let posicionLetras = [];

for (let i = 0; i < letras.length; i++) {
  const letra = letras[i];
  linea(
    letraXDesde,
    positionY,
    letraYHasta,
    positionY,
    "black",
    grosoLinea - 10
  ); //LINEA TEXT

  posicionLetras.push([letra, letraXDesde]);
  /*  lineaText(letra, letraXDesde + 7 + 10, 755);*/
  letraXDesde += 50;
  letraYHasta += 50;
}

for (let index = 0; index < posicionLetras.length; index++) {
  const letra = posicionLetras[index];
  if (letra[0] == "I") {
    lineaText(letra[0], letra[1] + 17, 755);

    //letra[0];
  }

  if (letra[0] == " ") {
    lineaText("-", letra[1] + 17, 755);

    //letra[0];
  }
}
/* 
clearPizarra(); //limpiarcanvas
iniciarPizarra(); //iniciar pizara */
