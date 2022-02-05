const CANVAS = document.getElementById("ahorcado");
//preparando pincel o pincel CANVAS
const pincel = CANVAS.getContext("2d");

function contornoTriangular(x, y, width, height, color, typeline) {
  //pincel.strokeStyle = color;
  pincel.shadowColor = "black";
  pincel.shadowBlur = 2; //tamaño de color de los laterales
  pincel.lineJoin = typeline; //"bevel" || "round" || "miter";
  pincel.lineWidth = 10;
  pincel.strokeStyle = color;
  pincel.strokeRect(x, y, width, height);
}

function rectangulo(x, y, width, height, color) {
  pincel.fillStyle = color;
  pincel.fillRect(x, y, width, height);
}

function base() {
  pincel.beginPath();
  // Create path
  pincel.lineWidth = 15;
  // Color de línea
  pincel.strokeStyle = "#212121";
  // Color de relleno
  pincel.fillStyle = "blue";
  // Nos movemos a la esquina superior izquierda
  pincel.moveTo(180, 700);
  // Dibujamos una línea hacia abajo
  pincel.lineTo(60, 760);
  // Desde el fin de esa línea,
  // dibujamos una hacia la derecha
  pincel.lineTo(300, 760);
  // Y dejamos que JS cierre nuestro dibujo
  pincel.closePath();
  // Hacemos que se dibuje
  pincel.stroke();
  // Lo rellenamos
  pincel.fill();
}

function linea(xCursor, yCursor, xDesde, yHasta, color, lineWidth) {
  pincel.beginPath();
  pincel.lineWidth = lineWidth;
  // Color de línea
  pincel.strokeStyle = color;
  pincel.moveTo(xCursor, yCursor);
  pincel.lineTo(xDesde, yHasta);
  pincel.closePath();
  // Hacemos que se dibuje
  pincel.stroke();
}

function circulo(params) {
  let X = 580;
  let Y = 580 / 2;
  let r = 85;
  pincel.beginPath();
  pincel.strokeStyle = "#006400";
  pincel.fillStyle = "#6ab150";
  pincel.lineWidth = 5;
  pincel.arc(X, Y, r, 0, 2 * Math.PI);
  pincel.fill();
  pincel.stroke();
}

function lineaText(letra, xCursor, yCursor) {
  // Create gradient
  let gradient = pincel.createLinearGradient(0, 0, CANVAS.width, 0);
  gradient.addColorStop("0", " magenta");
  gradient.addColorStop("0.5", "blue");
  gradient.addColorStop("1.0", "red");
  // Fill with gradient
  pincel.font = "30px Verdana";
  pincel.fillStyle = gradient;
  pincel.fillText(letra, xCursor, yCursor);
}

function clearPizarra() {
  CANVAS.width = CANVAS.width;
}

function iniciarPizarra() {
  rectangulo(10, 10, 1180, 780, "gray"); //color de fondo del canvas
  contornoTriangular(10, 10, 1180, 780, "green", "round"); //contorno del canvas

  setTimeout(() => {
    base(); //base
  }, 300);
}

iniciarPizarra();
