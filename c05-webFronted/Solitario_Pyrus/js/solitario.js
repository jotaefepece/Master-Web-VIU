/***** INICIO DECLARACIÓN DE VARIABLES GLOBALES *****/

// Array de palos
let palos = ["kir", "wdo", "hex", "cir"];
// Array de número de cartas
let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// En las pruebas iniciales solo se trabajará con cuatro cartas por palo:
//let numeros = [8, 9, 10];
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

function reiniciarJuego() {
// Parar temporizador
    if (temporizador) clearInterval(temporizador);
    // Limpiar todos los mazos y tapetes
    mazoSobrantes = [];
    mazoReceptor1 = [];
    mazoReceptor2 = [];
    mazoReceptor3 = [];
    mazoReceptor4 = [];
    limpiarTapete(tapeteSobrantes);
    limpiarTapete(tapeteReceptor1);
    limpiarTapete(tapeteReceptor2);
    limpiarTapete(tapeteReceptor3);
    limpiarTapete(tapeteReceptor4);
    // Quitar efectos de fin de juego si existen
    const mensajeFin = document.querySelector(".mensaje-fin");
    if (mensajeFin) mensajeFin.remove();
    document.getElementById("mesa").classList.remove("fin-juego");
    document.getElementById("marcadores").classList.remove("fin-juego");
    // Volver a iniciar el juego
    comenzarJuego();
}

function comenzarJuego() {
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
     // Limpiar visualmente los tapetes 
     limpiarTapete(tapeteSobrantes); 
     limpiarTapete(tapeteReceptor1); 
     limpiarTapete(tapeteReceptor2); 
     limpiarTapete(tapeteReceptor3); 
     limpiarTapete(tapeteReceptor4);
      // Limpiar tapete sobrantes y créditos 
      limpiarTapete(tapeteSobrantes); 
      const creditosFin = document.querySelector("#sobrantes .creditos"); 
      if (creditosFin) creditosFin.remove();  
} // comenzarJuego

function arrancarTiempo(){
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

function barajar(mazo) {
    for (let i = mazo.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = mazo[i];
        mazo[i] = mazo[j];
        mazo[j] = temp;
    }
} // barajar


function cargarTapeteInicial(mazo) {
    limpiarTapete(tapeteInicial);   
    for (let i = 0; i < mazo.length; i++) {
        let carta = mazo[i];
        // Posición absoluta dentro del tapete 
        carta.style.position = "absolute";
        // Tamaño de la carta 
        carta.style.width = "86px";
        // Escalera: desplazamiento diagonal
        carta.style.top = (i * paso) + "px";
        carta.style.left = (i * paso) + "px";
        carta.style.transform = "translate(1%, 1%)";
        carta.classList.remove("flip"); 
        // Solo carta superior es arrastrable
        carta.draggable = (i === mazo.length - 1);
		if (i === mazo.length - 1) {
			carta.ondragstart = iniciarArrastre;
		}
		carta.addEventListener("click", () => animarCarta(carta)); 
        // Añadir al tapete
        tapeteInicial.appendChild(carta);   
}    // Actualizar contador del inicial
    setContador(contInicial, mazo.length);
} // cargarTapeteInicial

function incContador(contador){
    let valor = parseInt(contador.textContent) || 0;
    contador.textContent = valor + 1;
} // incContador
function decContador(contador){
    let valor = parseInt(contador.textContent) || 0;
    contador.textContent = valor - 1;
} // decContador
function setContador(contador, valor) {
    contador.textContent = valor;
} // setContador

function sacarCartaInicial() {
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
    limpiarTapete(tapeteSobrantes); 
    carta.style.position = "absolute";
    carta.style.top = "50%";
    carta.style.left = "50%";
    carta.style.transform = "translate(-50%, -50%)";
    carta.style.width = "90px";
    carta.draggable = true; 
    carta.ondragstart = iniciarArrastre;
	tapeteSobrantes.appendChild(carta);
    // Actualizar contadores
    //setContador(contInicial, mazoInicial.length);
    setContador(contSobrantes, mazoSobrantes.length);
    // Contar como movimiento
    incContador(contMovimientos);
	// Verificación automática 
	reciclarMazos(); 
 }

function reciclarMazos() {
 if (mazoInicial.length === 0 && mazoSobrantes.length > 0) { 
	mazoInicial = mazoSobrantes.slice(); // Copia 
	barajar(mazoInicial); 
	mazoSobrantes = []; 
    limpiarTapete(tapeteSobrantes); 
	setContador(contSobrantes, 0); 
	cargarTapeteInicial(mazoInicial); 
	}
}   

function obtenerColorPalo(palo) {
    if (palo === "kir" || palo === "wdo") return "rosa";
    return "gris";  // hex y cir
}

function iniciarArrastre(e) {
    e.dataTransfer.setData("text/plain/numero", e.target.dataset.numero);
    e.dataTransfer.setData("text/plain/palo", e.target.dataset.palo);
}

function colocarCarta(e) {
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
        puedeColocar = (numero === 10);
    } else {
        let ultima = destinoMazo[destinoMazo.length - 1];
        let ultimaNumero = parseInt(ultima.dataset.numero);
        let ultimaColor = obtenerColorPalo(ultima.dataset.palo);
        let esteColor = obtenerColorPalo(palo);
        puedeColocar = (numero === ultimaNumero - 1) && (esteColor !== ultimaColor);
    }
if (!puedeColocar) {
        // Devolver al origen
        origenMazo.push(carta);
        if (origenMazo === mazoInicial) {
            cargarTapeteInicial(mazoInicial);
        } else {
            limpiarTapete(tapeteSobrantes); 
            if (mazoSobrantes.length > 0) {
                let ult = mazoSobrantes[mazoSobrantes.length - 1];
                ult.style.position = "absolute";
                ult.style.top = "50%";
                ult.style.left = "50%";
                ult.style.transform = "translate(-50%, -50%)";
                ult.style.width = "77px";
                ult.draggable = true;
                ult.ondragstart = iniciarArrastre;
                tapeteSobrantes.appendChild(ult);
            }
        }
        return;
    }
    // Colocar en receptor
    destinoMazo.push(carta);
    limpiarTapete(destinoTapete);  
    carta.style.position = "absolute";
    carta.style.top = "50%";
    carta.style.left = "50%";
    carta.style.transform = "translate(-50%, -50%)";
    carta.style.width = "77px";
    carta.draggable = false;
	carta.classList.add("golpe");
	carta.addEventListener("animationend", () => {
    carta.classList.remove("golpe"); // limpiar clase para futuros usos
	}, { once: true });
/*** FIN CODIGO ***/
    destinoTapete.appendChild(carta);
    // Actualizar origen visual
if (origenMazo === mazoInicial) {
        cargarTapeteInicial(mazoInicial);
    } else if (origenMazo === mazoSobrantes) {
        limpiarTapete(tapeteSobrantes);  
        if (mazoSobrantes.length > 0) {
            let ult = mazoSobrantes[mazoSobrantes.length - 1];
            ult.style.position = "absolute";
            ult.style.top = "50%";
            ult.style.left = "50%";
            ult.style.transform = "translate(-50%, -50%)";
            ult.style.width = "77px";
            ult.draggable = true;
            ult.ondragstart = iniciarArrastre;
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
		document.getElementById("marcadores").classList.add("fin-juego");
		document.getElementById("mesa").classList.add("fin-juego");
		const inicial = document.getElementById("inicial");
		// Crear mensaje
		const mensaje = document.createElement("div");
		mensaje.classList.add("mensaje-fin");
		mensaje.innerHTML = `¡Fin del juego!<br>
        Tiempo: ${contTiempo.textContent}<br>
        Movimientos: ${contMovimientos.textContent}`;
		inicial.appendChild(mensaje);
		const sobrantes = document.getElementById("sobrantes");
		const creditos = document.createElement("div");
		creditos.classList.add("creditos");
		creditos.innerHTML = `
		Diseños: <br>Pyrusuchitus
		`;
sobrantes.appendChild(creditos);
    }
	// Verificación automática
	reciclarMazos(); 
}

function limpiarTapete(tapete) {
    // Elimina solo las cartas (<img>), no los <span>
    Array.from(tapete.querySelectorAll("img")).forEach(img => img.remove());
}

function animarCarta(carta) {
    carta.classList.add("flip");
    carta.addEventListener("animationend", () => {
        carta.classList.remove("flip");
    }, { once: true });
}

window.onload = function() {
    comenzarJuego();
}

tapeteInicial.addEventListener("click", sacarCartaInicial);

[tapeteReceptor1, tapeteReceptor2, tapeteReceptor3, tapeteReceptor4].forEach(tapete => {
    tapete.ondragenter = e => e.preventDefault();
    tapete.ondragover = e => e.preventDefault();
    tapete.ondragleave = e => e.preventDefault();
    tapete.ondrop = colocarCarta;
});

document.getElementById("reset").addEventListener("click", reiniciarJuego);
// Reciclaje automático 
reciclarMazos();


document.addEventListener("DOMContentLoaded", function () {
  const btnReglas = document.getElementById("btn_reglas");

  btnReglas.addEventListener("click", function () {
    // ¿Ya existe el popup?
    let reglasDiv = document.getElementById("popup_reglas");

    if (reglasDiv) {
      // Si existe, lo quitamos (cerrar)
      reglasDiv.remove();
    } else {
      // Si no existe, lo creamos (abrir)
      reglasDiv = document.createElement("div");
      reglasDiv.id = "popup_reglas";   // 👈 ID para poder encontrarlo después
      reglasDiv.className = "popup-reglas";
      reglasDiv.innerHTML = `
        <h3>📜 Reglas del juego</h3>
        <ul>
          <li>Mueve la carta visible a los Tapetes verdes.</li>
          <li>Organiza las cartas en orden descendente.</li>
          <li>Se debe ir alternando colores dentro de cada Tapete.</li>
          <li>Usa la menor cantidad de movimientos posible.</li>
          <li>👾👾 Meta Knight puede aparecer en los bordes de la ventana. </li>
          <li>👾👾 Si lo atrapas, te descontará 3 movimientos.</li>
        </ul>
        <button id="cerrar_reglas">Cerrar</button>
      `;
      document.body.appendChild(reglasDiv);

      // Botón de cerrar dentro del popup
      document.getElementById("cerrar_reglas").addEventListener("click", function () {
        reglasDiv.remove();
      });
    }
  });
});


function spawnMetaKnight() {
    const container = document.getElementById("meta-knight-container");
    container.innerHTML = ""; // Limpia cualquier instancia anterior

    const img = document.createElement("img");
    img.src = "imagenes/meta-knight.png";
    img.alt = "¡Meta Knight!";

    // Tamaño de la ventana
    const anchoVentana = window.innerWidth;
    const altoVentana = window.innerHeight;

    // Tamaño aproximado de la imagen
    const tamanoImg = 80;

    // Selecciona borde aleatorio: 0=izq, 1=der, 2=arriba, 3=abajo
    const borde = Math.floor(Math.random() * 4);
    let x, y;

    switch (borde) {
        case 0: // Izquierda
            x = 0;
            y = Math.random() * (altoVentana - tamanoImg);
            break;
        case 1: // Derecha
            x = anchoVentana - tamanoImg;
            y = Math.random() * (altoVentana - tamanoImg);
            break;
        case 2: // Arriba
            x = Math.random() * (anchoVentana - tamanoImg);
            y = 0;
            break;
        case 3: // Abajo
            x = Math.random() * (anchoVentana - tamanoImg);
            y = altoVentana - tamanoImg;
            break;
    }

    // Posiciona la imagen
    img.style.left = x + "px";
    img.style.top = y + "px";

    // Acción al clickear
img.onclick = function() {
        const movimientosActuales = parseInt(contMovimientos.textContent) || 0;
        if (movimientosActuales > 3) {
            for (let i = 0; i < 3; i++) {
                decContador(contMovimientos);
            }

            img.classList.add("meta-knight-clicked");

            // Popup
            const popup = document.createElement("div");
            popup.style.cssText = `
                position: fixed;
                top: 20%;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(45deg, #ffeb3b, #ffc107);
                color: #333;
                padding: 20px;
                border-radius: 15px;
                font-size: 24px;
                font-weight: bold;
                z-index: 10001;
                box-shadow: 0 0 30px rgba(255,215,0,0.8);
            `;
            popup.innerHTML = "¡Meta Knight te ayuda!<br> Ya tienes -3 Movimientos!";
            document.body.appendChild(popup);
            setTimeout(() => popup.remove(), 2000);
        } else {
            alert("¡No hay suficientes movimientos para descontar!");
        }

        container.removeChild(img);
    };

    container.appendChild(img);
    container.style.display = "block";

    // Desaparece en 0,999 segundos
    setTimeout(() => {
        if (container.contains(img)) container.removeChild(img);
        container.style.display = "none";
    }, 999);
}

// Inicia el spawn aleatorio cada 800–1500 ms
function iniciarMetaKnight() {
    spawnMetaKnight();
    const tiempo = Math.random() * 9999 + 9999;
    metaKnightTimer = setTimeout(iniciarMetaKnight, tiempo);
}

// Inicia después de 13 segundos
window.addEventListener("load", () => {
    setTimeout(iniciarMetaKnight, 9999+3333);
});
