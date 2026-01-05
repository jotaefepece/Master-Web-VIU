/***** INICIO DECLARACIÓN DE VARIABLES GLOBALES *****/
// Array de palos
let palos = ["viu", "cua", "hex", "cir"];
// Array de número de cartas
let numeros = [9, 10, 11, 12];
// paso (top y left) en pixeles de una carta a la siguiente en un mazo
let paso = 5;
// Tapetes
let tapeteInicial = document.getElementById("inicial");
let tapeteSobrantes = document.getElementById("sobrantes");
let tapeteReceptor1 = document.getElementById("receptor1");
let tapeteReceptor2 = document.getElementById("receptor2");
let tapeteReceptor3 = document.getElementById("receptor3");
let tapeteReceptor4 = document.getElementById("receptor4");
// Mazos
let mazoInicial = [];
let mazoSobrantes = [];
let mazoReceptor1 = [];
let mazoReceptor2 = [];
let mazoReceptor3 = [];
let mazoReceptor4 = [];
// Contadores de cartas
let contInicial = document.getElementById("contador_inicial");
let contSobrantes = document.getElementById("contador_sobrantes");
let contReceptor1 = document.getElementById("contador_receptor1");
let contReceptor2 = document.getElementById("contador_receptor2");
let contReceptor3 = document.getElementById("contador_receptor3");
let contReceptor4 = document.getElementById("contador_receptor4");
let contMovimientos = document.getElementById("contador_movimientos");
// Tiempo
let contTiempo = document.getElementById("contador_tiempo");
let segundos = 0;
let temporizador = null;
/***** FIN DECLARACIÓN DE VARIABLES GLOBALES *****/

function comenzarJuego() {
    /*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
    mazoInicial = [];

    for (let i = 0; i < palos.length; i++) {
        for (let j = 0; j < numeros.length; j++) {
            let carta = document.createElement("img");
            let nombreArchivo = numeros[j] + "-" + palos[i] + ".png";
            carta.src = "imagenes/baraja/" + nombreArchivo;
            carta.setAttribute("data-palo", palos[i]);
            carta.setAttribute("data-numero", numeros[j]);
            carta.classList.add("carta");
            mazoInicial.push(carta);
        }
    }
    /*** FIN CODIGO ***/

    /*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
    barajar(mazoInicial);
    cargarTapeteInicial(mazoInicial);

    setContador(contSobrantes, 0);
    setContador(contReceptor1, 0);
    setContador(contReceptor2, 0);
    setContador(contReceptor3, 0);
    setContador(contReceptor4, 0);
    setContador(contMovimientos, 0);

    arrancarTiempo();
    /*** FIN CODIGO ***/
}

function arrancarTiempo(){
    /*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
    if (temporizador) clearInterval(temporizador);
    let hms = function (){
        let seg = Math.trunc( segundos % 60 );
        let min = Math.trunc( (segundos % 3600) / 60 );
        let hor = Math.trunc( (segundos % 86400) / 3600 );
        let tiempo = ( (hor<10)? "0"+hor : ""+hor )
            + ":" + ( (min<10)? "0"+min : ""+min )
            + ":" + ( (seg<10)? "0"+seg : ""+seg );
        setContador(contTiempo, tiempo);
        segundos++;
    }
    segundos = 0;
    hms();
    temporizador = setInterval(hms, 1000);
    /*** FIN CODIGO ***/
}

function barajar(mazo) {
    /*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
    for (let i = mazo.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = mazo[i];
        mazo[i] = mazo[j];
        mazo[j] = temp;
    }
    /*** FIN CODIGO ***/
}

function cargarTapeteInicial(mazo) {
    /*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
    tapeteInicial.innerHTML = "";
    for (let i = 0; i < mazo.length; i++) {
        let carta = mazo[i];
        carta.style.position = "absolute";
        carta.style.width = "99px";
        carta.style.top = (i * paso) + "px";
        carta.style.left = (i * paso) + "px";
        carta.draggable = (i === mazo.length - 1);
        if (i === mazo.length - 1) {
            carta.ondragstart = al_mover;
        }
        tapeteInicial.appendChild(carta);
    }
    setContador(contInicial, mazo.length);
    /*** FIN CODIGO ***/
}

function incContador(contador){
    /*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
    let valor = parseInt(contador.textContent) || 0;
    contador.textContent = valor + 1;
    /*** FIN CODIGO ***/
}

function decContador(contador){
    /*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! ***/
    let valor = parseInt(contador.textContent) || 0;
    contador.textContent = valor - 1;
    /*** FIN CODIGO ***/
}

function setContador(contador, valor) {
    /*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
    contador.textContent = valor;
    /*** FIN CODIGO ***/
}

// Preparación para drag & drop
function al_mover(e) {
    e.dataTransfer.setData("text/plain/numero", e.target.dataset.numero);
    e.dataTransfer.setData("text/plain/palo", e.target.dataset.palo);
}

// Sacar carta al sobrantes con clic
function sacarCartaInicial() {
    if (mazoInicial.length === 0) {
        return;
    }

    let carta = mazoInicial.pop();
    mazoSobrantes.push(carta);

    cargarTapeteInicial(mazoInicial);

    tapeteSobrantes.innerHTML = "";
    carta.style.position = "absolute";
    carta.style.top = "50%";
    carta.style.left = "50%";
    carta.style.transform = "translate(-50%, -50%)";
    carta.style.width = "99px";
    carta.draggable = true;
    carta.ondragstart = al_mover;

    tapeteSobrantes.appendChild(carta);

    setContador(contInicial, mazoInicial.length);
    setContador(contSobrantes, mazoSobrantes.length);

    incContador(contMovimientos);
}

// Asignar clic
tapeteInicial.addEventListener("click", sacarCartaInicial);

// Arrancar juego
window.onload = function() {
    comenzarJuego();
};
