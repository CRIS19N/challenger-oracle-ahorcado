//dimensiones del canvas
let canvasWidth = CANVAS.width;
let canvasHeight = CANVAS.height;
let grosoLinea = 15;
let puedeJugar = false;
let posicionLetras = []; //se almacena cada letra de la palabra oculta y su posicion
let letrasPresionadas = []; //se almacena las letras presionadas en el juego
let palabraAleatoria = []; //se almacena la palabra completa oculta
let letrasAcertadas = "";
let cantidadIntentos = 0;
let regex = /^[A-Z\s]+$/; //comprobar que solo sea letras Mayúsculas

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
  let result = regex.test(word);
  newWord.value = word;
  if (word.length > 16 || !result) {
    if (word.length > 16) {
      pintarMensajeFinal("La palabra no puede ser mayor a 16 dígitos", 400, 47);

      console.warn(`La palabra no puede ser mayor a 16 dígitos`);
    } else if (!result) {
      pintarMensajeFinal(
        "No puede tener caracteres extraños ó números",
        400,
        47
      );
      console.warn(`No puede tener caracteres extraños ó números`);
    }

    newWord.value = "";
  } else {
    if (!JSONWORDS.includes(word)) {
      JSONWORDS.push(word);
    }
    newWord.value = "";
    pintarMensajeFinal("Se agrego correctamente la palabra", 400, 47);
  }
}

function seleccionarPalabra() {
  let rand = Math.floor(Math.random() * JSONWORDS.length);
  let palabra = JSONWORDS[rand].toUpperCase();
  return palabra;
}

function pintarEspacios(palabra) {
  //si encuentra espacios en la palabra escogida lo pinta en pantalla
  palabra.forEach((letra) => {
    if (letra[0] == " ") {
      lineaText("-", letra[1] + 17, 755);
    }
  });
}

function pintarLineaLetra(palabra) {
  let letraXDesde = 340;
  let letraYHasta = 380;
  let positionY = 760;

  posicionLetras = [];
  for (let i = 0; i < palabra.length; i++) {
    const letra = palabra[i];

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
}
let posicionLetraPresionada = 0;
function pintarLetrasPresionadas(letraPresionada) {
  ///pintar letras presionadas
  lineaText(letraPresionada, posicionLetraPresionada + 10, 120);

  posicionLetraPresionada += 25;
}

function pintarLetraEnLinea(palabra, letraSearch) {
  palabra.forEach((letra) => {
    if (letra[0] == letraSearch) {
      letrasAcertadas += letra[0];
      lineaText(letra[0], letra[1] + 10, 755);
    }
  });
}

function pintarMensajeFinal(palabra, positionX, positionY) {
  lineaText(palabra, positionX, positionY);
}

function comprobarPalabraOculta() {
  if (palabraAleatoria.length > 0) {
    if (
      letrasAcertadas.length == palabraAleatoria.length &&
      cantidadIntentos < 9
    ) {
      return "gano";
    } else if (cantidadIntentos == 9) {
      return "perdio";
    } else {
      return "Estas en Juego";
    }
  } else {
    puedeJugar = false;
  }
}

function reiniciarJuego() {
  INPUTWORDNEW.setAttribute("disabled", "true");
  INPUTWORDNEW.setAttribute("title", "Deshabilitado, estas jugando");
  document.getElementById("mensaje-canvas").innerHTML = "";
  clearPizarra(); //limpiar canvas
  iniciarPizarra(); //iniciar pizarra
  puedeJugar = true;
  letrasPresionadas = [];
  letrasAcertadas = "";
  cantidadIntentos = 0;
  posicionLetraPresionada = 640;
  totalTime = 3;
}
let totalTime = 3;
function updateClock() {
  document.getElementById(
    "mensaje-canvas"
  ).innerHTML = `Reiniciando juego en: ${totalTime}!`;
  if (totalTime == 0) {
    jugar();
  } else {
    totalTime -= 1;

    setTimeout("updateClock()", 1000);
  }
}

function jugar() {
  reiniciarJuego();
  //desde donde se pintara la primera palabra
  //debe iniciar desde x 350 y=760 hasta x=750 y=760 esto le da un tamaño de 59px

  //seleccionar palabra oculta aleatoriamente
  palabraAleatoria = seleccionarPalabra();

  //
  pintarEspacios(posicionLetras);
  pintarLineaLetra(palabraAleatoria);

  //escuchar evento del teclado
}
//agregar nueva palabra
const BTNWORDNEW = document.getElementById("nueva-palabra");
BTNWORDNEW.onclick = newWord;

//btn iniciar Juego
const BTNPLAY = document.getElementById("iniciar-juego");
BTNPLAY.onclick = jugar;

//INPUT nueva palabra
const INPUTWORDNEW = document.getElementById("input-nueva-palabra");
document.addEventListener("keyup", function (e) {
  if (puedeJugar) {
    let letraPresionada = e.key.toLocaleUpperCase();

    //si la letra presiona su longitud es igual a 1
    if (letraPresionada.length == 1) {
      //si la letra presiona cumple el regex, es decir esta entre A-Z
      if (regex.test(letraPresionada)) {
        console.log();
        //agregamos la letra presionada al array
        if (!letrasPresionadas.includes(letraPresionada)) {
          //también comprobamos si esa letra esta en la palabra oculta, sino pintamos parte del ahorcado
          if (!palabraAleatoria.includes(letraPresionada)) {
            cantidadIntentos += 1;
            switch (cantidadIntentos) {
              case 1:
                lineaVertical();
                break;
              case 2:
                lineaHorizontal();
                break;
              case 3:
                lazo();
                break;
              case 4:
                cabeza();
                break;
              case 5:
                tronco();
                break;
              case 6:
                manoIzquierda();
                break;
              case 7:
                manoDerecha();
                break;
              case 8:
                pieDerecho();
                break;
              case 9:
                pieIzquierdo();
                break;
            }
          }
          letrasPresionadas.push(letraPresionada); //push de letrasPresionadas
          pintarLetrasPresionadas(letraPresionada); //Pintar letras presionadas en canvas
        }

        if (!letrasAcertadas.includes(letraPresionada)) {
          //pintamos letra en la linea si es encontrada
          pintarLetraEnLinea(posicionLetras, letraPresionada);
        }
      }
    }
  }

  //comprobando si el usuario puede jugar

  let result = comprobarPalabraOculta();

  if (result == "perdio") {
    pintarMensajeFinal("Fin del juego!", 800, 320);
    INPUTWORDNEW.removeAttribute("disabled");
    INPUTWORDNEW.removeAttribute("title");

    pintarMensajeFinal(`La palabra secreta era: ${palabraAleatoria}`, 600, 520);

    puedeJugar = false;
  } else if (result == "gano") {
    pintarMensajeFinal("Ganaste \n Felicidades!", 800, 320);
    INPUTWORDNEW.removeAttribute("disabled");
    INPUTWORDNEW.removeAttribute("title");
    puedeJugar = false;
  }

  if (!puedeJugar) {
    updateClock();
  }
});
