/***** INICIO DECLARACIÓN DE VARIABLES GLOBALES *****/

// Array de palos
let palos = ["viu", "cua", "hex", "cir"];
// Array de número de cartas
//let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
// En las pruebas iniciales solo se trabajará con cuatro cartas por palo:
let numeros = [10, 11, 12];

// paso (top y left) en pixeles de una carta a la siguiente en un mazo
let paso = 5;

// Tapetes				
let tapeteInicial   = document.getElementById("inicial");
let tapeteSobrantes = document.getElementById("sobrantes");
let tapeteReceptor1 = document.getElementById("receptor1");
let tapeteReceptor2 = document.getElementById("receptor2");
let tapeteReceptor3 = document.getElementById("receptor3"); 
let tapeteReceptor4 = document.getElementById("receptor4");

// Mazos
let mazoInicial   = [];
let mazoSobrantes = [];
let mazoReceptor1 = [];
let mazoReceptor2 = [];
let mazoReceptor3 = [];
let mazoReceptor4 = [];

// Contadores de cartas
let contInicial     = document.getElementById("contador_inicial");
let contSobrantes   = document.getElementById("contador_sobrantes");
let contReceptor1   = document.getElementById("contador_receptor1");
let contReceptor2   = document.getElementById("contador_receptor2");
let contReceptor3   = document.getElementById("contador_receptor3");
let contReceptor4   = document.getElementById("contador_receptor4");
let contMovimientos = document.getElementById("contador_movimientos");

// Tiempo
let contTiempo  = document.getElementById("contador_tiempo"); // span cuenta tiempo
let segundos 	 = 0;    // cuenta de segundos
let temporizador = null; // manejador del temporizador

/***** FIN DECLARACIÓN DE VARIABLES GLOBALES *****/

 
// Rutina asociada a boton reset
/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/


// El juego arranca ya al cargar la página: no se espera a reiniciar
/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/

// *** Paso 02: Crear el mazo Inicial ***
function comenzarJuego() {
/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
    mazoInicial = []; // Limpiamos por si acaso
    for (let i = 0; i < palos.length; i++) {
        for (let j = 0; j < numeros.length; j++) {
            let carta = document.createElement("img");
            // Ruta a la imagen (carpeta imagenes/baraja/)
            let nombreArchivo = numeros[j] + "-" + palos[i] + ".png";
            carta.src = "imagenes/baraja/" + nombreArchivo;
            // Atributos para identificar la carta
            carta.setAttribute("data-palo", palos[i]);
            carta.setAttribute("data-numero", numeros[j]);
            // Clase común (opcional, para CSS futuro)
            carta.classList.add("carta");
            // Añadimos al mazo inicial
            mazoInicial.push(carta);
        }
    }
/*** FIN CODIGO ***/

// *** Paso 05: Inicializando registros ***
// Barajar y dejar mazoInicial en tapete inicial
/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
    barajar(mazoInicial);
    cargarTapeteInicial(mazoInicial);
// Puesta a cero de contadores de mazos
    setContador(contSobrantes, 0);
    setContador(contReceptor1, 0);
    setContador(contReceptor2, 0);
    setContador(contReceptor3, 0);
    setContador(contReceptor4, 0);
    setContador(contMovimientos, 0);
// Arrancar el conteo de tiempo
    arrancarTiempo();
// *** Paso 18: Agregado limpiar tapetes para reinicio ***
/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/    
     // Limpiar visualmente los tapetes 
     limpiarTapete(tapeteSobrantes); 
     limpiarTapete(tapeteReceptor1); 
     limpiarTapete(tapeteReceptor2); 
     limpiarTapete(tapeteReceptor3); 
     limpiarTapete(tapeteReceptor4);
/*** FIN CODIGO ***/   
/*** FIN CODIGO ***/ 
} // comenzarJuego


/**
	Se debe encargar de arrancar el temporizador: cada 1000 ms se
	debe ejecutar una función que a partir de la cuenta autoincrementada
	de los segundos (segundos totales) visualice el tiempo oportunamente con el 
	format hh:mm:ss en el contador adecuado.

	Para descomponer los segundos en horas, minutos y segundos pueden emplearse
	las siguientes igualdades:

	segundos = truncar (   segundos_totales % (60)                 )
	minutos  = truncar ( ( segundos_totales % (60*60) )     / 60   )
	horas    = truncar ( ( segundos_totales % (60*60*24)) ) / 3600 )

	donde % denota la operación módulo (resto de la división entre los operadores)

	Así, por ejemplo, si la cuenta de segundos totales es de 134 s, entonces será:
	   00:02:14

	Como existe la posibilidad de "resetear" el juego en cualquier momento, hay que 
	evitar que exista más de un temporizador simultáneo, por lo que debería guardarse
	el resultado de la llamada a setInterval en alguna variable para llamar oportunamente
	a clearInterval en su caso.   
*/

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
    hms(); // Primera visualización 00:00:00
	temporizador = setInterval(hms, 1000);
    	
} // arrancarTiempo


/**
	Si mazo es un array de elementos <img>, en esta rutina debe ser
	reordenado aleatoriamente. Al ser un array un objeto, se pasa
	por referencia, de modo que si se altera el orden de dicho array
	dentro de la rutina, esto aparecerá reflejado fuera de la misma.
*/

// *** Paso 03: barajar mazo ***
function barajar(mazo) {
/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
    for (let i = mazo.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = mazo[i];
        mazo[i] = mazo[j];
        mazo[j] = temp;
    }
/*** FIN CODIGO ***/
} // barajar

/**
 	En el elemento HTML que representa el tapete inicial (variable tapeteInicial)
	se deben añadir como hijos todos los elementos <img> del array mazo.
	Antes de añadirlos, se deberían fijar propiedades como la anchura, la posición,
	coordenadas top y left, algun atributo de tipo data-...
	Al final se debe ajustar el contador de cartas a la cantidad oportuna
*/

// *** Paso 04: cargar tapete inicial ***
function cargarTapeteInicial(mazo) {
/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
    // Limpiar el tapete
    //tapeteInicial.innerHTML = ""; // *** cambiado en Paso 17 ***
    limpiarTapete(tapeteInicial);   // *** cambiado en Paso 17 ***
    for (let i = 0; i < mazo.length; i++) {
        let carta = mazo[i];
        // Posición absoluta dentro del tapete 
        carta.style.position = "absolute";
        // Tamaño de la carta 
        carta.style.width = "66px";
        // Escalera: desplazamiento diagonal
        carta.style.top = (i * paso) + "px";
        carta.style.left = (i * paso) + "px";
        carta.style.transform = "translate(1%, 1%)";
        // Solo carta superior es arrastrable
        carta.draggable = (i === mazo.length - 1);
// *** Paso 12: condicional agregado para mover cartas ***
/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
		if (i === mazo.length - 1) {
		carta.ondragstart = al_mover;
		}
/*** FIN CODIGO ***/
        // Añadir al tapete
        tapeteInicial.appendChild(carta);   
}    // Actualizar contador del inicial
    setContador(contInicial, mazo.length);
/*** FIN CODIGO ***/
} // cargarTapeteInicial


/**
 	Esta función debe incrementar el número correspondiente al contenido textual
   	del elemento que actúa de contador
*/

// *** Paso 06: Funciones de contadores ***
function incContador(contador){
/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
    let valor = parseInt(contador.textContent) || 0;
    contador.textContent = valor + 1;
} // incContador
function decContador(contador){
    let valor = parseInt(contador.textContent) || 0;
    contador.textContent = valor - 1;
} // decContador
function setContador(contador, valor) {
    contador.textContent = valor;
/*** FIN CODIGO ***/
} // setContador


// *** Paso 07: Sacar carta del inicial al tapete de sobrantes ***
function sacarCartaInicial() {
/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
    // Si el mazo inicial está vacío, se reciclará
	if (mazoInicial.length === 0) { 
		reciclarMazos(); 
		return; 
	}
    // Sacar la carta superior del inicial
    let carta = mazoInicial.pop();
    // Añadiendo al mazo de sobrantes
    mazoSobrantes.push(carta);
    // Actualizar visual del tapete inicial
    cargarTapeteInicial(mazoInicial);
    // Visual en sobrantes: limpiar y colocar la nueva carta centrada
    //tapeteSobrantes.innerHTML = "";// *** cambiado en Paso 17 ***
    limpiarTapete(tapeteSobrantes);  // *** cambiado en Paso 17 ***
    carta.style.position = "absolute";
    carta.style.top = "50%";
    carta.style.left = "50%";
    carta.style.transform = "translate(-50%, -50%)";
    carta.style.width = "66px";
    carta.draggable = true;  // En sobrantes siempre es arrastrable
/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
// *** Paso 14: Línea agregada ***
    carta.ondragstart = al_mover;
/*** FIN CODIGO ***/
	//
	tapeteSobrantes.appendChild(carta);
    // Actualizar contadores
    //setContador(contInicial, mazoInicial.length);
    setContador(contSobrantes, mazoSobrantes.length);
    // Contar como movimiento
    incContador(contMovimientos);
	// Verificación automática 
	reciclarMazos(); 
 }
/*** FIN CODIGO ***/

/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
// *** Paso 15: Reciclaje de mazo ***
function reciclarMazos() {
 if (mazoInicial.length === 0 && mazoSobrantes.length > 0) { 
	mazoInicial = mazoSobrantes.slice(); // Copia 
	barajar(mazoInicial); 
	mazoSobrantes = []; 
	//tapeteSobrantes.innerHTML = ""; // *** cambiado en Paso 17 ***
    limpiarTapete(tapeteSobrantes);   // *** cambiado en Paso 17 ***
	setContador(contSobrantes, 0); 
	cargarTapeteInicial(mazoInicial); 
	}
}   
/*** FIN CODIGO ***/

/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
// *** Paso 09: Función para color de palo ***
function getColor(palo) {
    if (palo === "viu" || palo === "cua") return "naranja";
    return "gris";  // hex y cir
}
// *** Paso 10: Evento dragstart - guardar datos de la carta ***
function al_mover(e) {
    e.dataTransfer.setData("text/plain/numero", e.target.dataset.numero);
    e.dataTransfer.setData("text/plain/palo", e.target.dataset.palo);
}
// *** Paso 11: Evento drop - validar y mover carta ***
function soltar(e) {
    e.preventDefault();
    let numero = parseInt(e.dataTransfer.getData("text/plain/numero"));
    let palo = e.dataTransfer.getData("text/plain/palo");
    // Encontrar origen (inicial o sobrantes)
    let origenMazo = null;
    let origenContador = null;
    let carta = null;
    if (mazoInicial.length > 0 &&
        parseInt(mazoInicial[mazoInicial.length - 1].dataset.numero) === numero &&
        mazoInicial[mazoInicial.length - 1].dataset.palo === palo) {
        origenMazo = mazoInicial;
        origenContador = contInicial;
        carta = mazoInicial.pop();
    } else if (mazoSobrantes.length > 0 &&
        parseInt(mazoSobrantes[mazoSobrantes.length - 1].dataset.numero) === numero &&
        mazoSobrantes[mazoSobrantes.length - 1].dataset.palo === palo) {
        origenMazo = mazoSobrantes;
        origenContador = contSobrantes;
        carta = mazoSobrantes.pop();
    }
    if (!carta) return;
    let destinoTapete = e.currentTarget;
    let destinoMazo = null;
    let destinoContador = null;
    if (destinoTapete.id === "receptor1") { destinoMazo = mazoReceptor1; destinoContador = contReceptor1; }
    else if (destinoTapete.id === "receptor2") { destinoMazo = mazoReceptor2; destinoContador = contReceptor2; }
    else if (destinoTapete.id === "receptor3") { destinoMazo = mazoReceptor3; destinoContador = contReceptor3; }
    else if (destinoTapete.id === "receptor4") { destinoMazo = mazoReceptor4; destinoContador = contReceptor4; }
    else return; // No es receptor válido
    // Validar reglas
    let puedeColocar = false;
    if (destinoMazo.length === 0) {
        puedeColocar = (numero === 12);
    } else {
        let ultima = destinoMazo[destinoMazo.length - 1];
        let ultimaNumero = parseInt(ultima.dataset.numero);
        let ultimaColor = getColor(ultima.dataset.palo);
        let esteColor = getColor(palo);
        puedeColocar = (numero === ultimaNumero - 1) && (esteColor !== ultimaColor);
    }
if (!puedeColocar) {
        // Devolver al origen
        origenMazo.push(carta);
        if (origenMazo === mazoInicial) {
            cargarTapeteInicial(mazoInicial);
        } else {
            //tapeteSobrantes.innerHTML = ""; // *** cambiado en Paso 17 ***
            limpiarTapete(tapeteSobrantes);   // *** cambiado en Paso 17 ***
            if (mazoSobrantes.length > 0) {
                let ult = mazoSobrantes[mazoSobrantes.length - 1];
                ult.style.position = "absolute";
                ult.style.top = "50%";
                ult.style.left = "50%";
                ult.style.transform = "translate(-50%, -50%)";
                ult.style.width = "66px";
                ult.draggable = true;
                ult.ondragstart = al_mover;
                tapeteSobrantes.appendChild(ult);
            }
        }
        return;
    }
    // Colocar en receptor
    destinoMazo.push(carta);
    //destinoTapete.innerHTML = ""; // *** cambiado en Paso 17 ***
    limpiarTapete(destinoTapete);   // *** cambiado en Paso 17 ***
    carta.style.position = "absolute";
    carta.style.top = "50%";
    carta.style.left = "50%";
    carta.style.transform = "translate(-50%, -50%)";
    carta.style.width = "66px";
    carta.draggable = false;
    destinoTapete.appendChild(carta);
    // Actualizar origen visual
if (origenMazo === mazoInicial) {
        cargarTapeteInicial(mazoInicial);
    } else if (origenMazo === mazoSobrantes) {
        //tapeteSobrantes.innerHTML = ""; // *** cambiado en Paso 17 ***
        limpiarTapete(tapeteSobrantes);   // *** cambiado en Paso 17 ***
        if (mazoSobrantes.length > 0) {
            let ult = mazoSobrantes[mazoSobrantes.length - 1];
            ult.style.position = "absolute";
            ult.style.top = "50%";
            ult.style.left = "50%";
            ult.style.transform = "translate(-50%, -50%)";
            ult.style.width = "66px";
            ult.draggable = true;
            ult.ondragstart = al_mover;
            tapeteSobrantes.appendChild(ult);
        }
    }
    // Contadores y movimientos
	setContador(origenContador, origenMazo.length);
	setContador(destinoContador, destinoMazo.length);
	incContador(contMovimientos);

    //setContador(origenContador, origenMazo.length);
	//setContador(destinoContador, destinoMazo.length);
    // Fin de juego
    if (mazoInicial.length === 0 && mazoSobrantes.length === 0) {
        clearInterval(temporizador);
        alert(`¡Fin del juego!\nTiempo: ${contTiempo.textContent}\nMovimientos: ${contMovimientos.textContent}`);
    }
	// Verificación automática
	reciclarMazos(); 
}
/*** FIN CODIGO ***/

// *** Paso 17: Para actualizar imágenes en los tapetes ***
/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
function limpiarTapete(tapete) {
    // Elimina solo las cartas (<img>), no los <span>
    Array.from(tapete.querySelectorAll("img")).forEach(img => img.remove());
}
/*** FIN CODIGO ***/

// *** Paso 01: El juego arranca automáticamente al cargar la página ***
/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
window.onload = function() {
    comenzarJuego();
}
/*** FIN CODIGO ***/

// *** Paso 08: Asignar Clic para llamar a función***
/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
tapeteInicial.addEventListener("click", sacarCartaInicial);
/*** FIN CODIGO ***/

// *** Paso 13: Asignar eventos drag & drop a los receptores ***
/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
[tapeteReceptor1, tapeteReceptor2, tapeteReceptor3, tapeteReceptor4].forEach(tapete => {
    tapete.ondragenter = e => e.preventDefault();
    tapete.ondragover = e => e.preventDefault();
    tapete.ondragleave = e => e.preventDefault();
    tapete.ondrop = soltar;
});
/*** FIN CODIGO ***/

// *** Paso 16: Reinicio completo ***
/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
document.getElementById("reset").addEventListener("click", comenzarJuego);
// Reciclaje automático 
reciclarMazos();
/*** FIN CODIGO ***/
