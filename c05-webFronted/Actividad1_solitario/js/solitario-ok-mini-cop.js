/***** INICIO DECLARACIÓN DE VARIABLES GLOBALES *****/

// Palos y números
let palos = ["viu", "cua", "hex", "cir"];
let numeros = [9, 10, 11, 12];

// Paso en px entre cartas
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

// Contadores
let contInicial     = document.getElementById("contador_inicial");
let contSobrantes   = document.getElementById("contador_sobrantes");
let contReceptor1   = document.getElementById("contador_receptor1");
let contReceptor2   = document.getElementById("contador_receptor2");
let contReceptor3   = document.getElementById("contador_receptor3");
let contReceptor4   = document.getElementById("contador_receptor4");
let contMovimientos = document.getElementById("contador_movimientos");

// Tiempo
let contTiempo  = document.getElementById("contador_tiempo");
let segundos    = 0;
let temporizador = null;

/***** FIN DECLARACIÓN DE VARIABLES GLOBALES *****/


// ===================== INICIO JUEGO =====================
function comenzarJuego() {
    // Construir mazo inicial
    mazoInicial = [];
    for (let palo of palos) {
        for (let num of numeros) {
            let carta = document.createElement("img");
            carta.src = `imagenes/baraja/${num}-${palo}.png`;
            carta.setAttribute("data-palo", palo);
            carta.setAttribute("data-numero", num);
            carta.classList.add("carta");
            mazoInicial.push(carta);
        }
    }

    // Barajar y renderizar
    barajar(mazoInicial);
    cargarTapeteInicial(mazoInicial);

    // Reset de contadores
    setContador(contSobrantes, 0);
    setContador(contReceptor1, 0);
    setContador(contReceptor2, 0);
    setContador(contReceptor3, 0);
    setContador(contReceptor4, 0);
    setContador(contMovimientos, 0);

    // Tiempo
    arrancarTiempo();

    // Limpiar estado receptores y sobrantes
    mazoSobrantes = [];
    mazoReceptor1 = []; tapeteReceptor1.innerHTML = "";
    mazoReceptor2 = []; tapeteReceptor2.innerHTML = "";
    mazoReceptor3 = []; tapeteReceptor3.innerHTML = "";
    mazoReceptor4 = []; tapeteReceptor4.innerHTML = "";
    tapeteSobrantes.innerHTML = "";
}


// ===================== TIEMPO =====================
function arrancarTiempo(){
    if (temporizador) clearInterval(temporizador);
    segundos = 0;
    let hms = function (){
        let seg = Math.trunc(segundos % 60);
        let min = Math.trunc((segundos % 3600) / 60);
        let hor = Math.trunc((segundos % 86400) / 3600);
        let tiempo = `${hor.toString().padStart(2,"0")}:${min.toString().padStart(2,"0")}:${seg.toString().padStart(2,"0")}`;
        setContador(contTiempo, tiempo);
        segundos++;
    }
    hms();
    temporizador = setInterval(hms, 1000);
}


// ===================== UTILITARIOS =====================
function barajar(mazo) {
    for (let i = mazo.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [mazo[i], mazo[j]] = [mazo[j], mazo[i]];
    }
}

function cargarTapeteInicial(mazo) {
    tapeteInicial.innerHTML = "";
    for (let i = 0; i < mazo.length; i++) {
        let carta = mazo[i];
        carta.style.position = "absolute";
        carta.style.width = "66px";
        carta.style.top = (i * paso) + "px";
        carta.style.left = (i * paso) + "px";
        carta.draggable = (i === mazo.length - 1);
        if (i === mazo.length - 1) carta.ondragstart = al_mover;
        tapeteInicial.appendChild(carta);
    }
    setContador(contInicial, mazo.length);
}

function incContador(contador){ contador.textContent = (parseInt(contador.textContent) || 0) + 1; }
function decContador(contador){ contador.textContent = (parseInt(contador.textContent) || 0) - 1; }
function setContador(contador, valor){ contador.textContent = valor; }

function estilizarCartaCentro(carta) {
    carta.style.position = "absolute";
    carta.style.top = "50%";
    carta.style.left = "50%";
    carta.style.transform = "translate(-50%, -50%)";
    carta.style.width = "66px";
}

function getColor(palo) {
    return (palo === "viu" || palo === "cua") ? "naranja" : "gris";
}


// ===================== LÓGICA DE JUEGO =====================
function sacarCartaInicial() {
    if (mazoInicial.length === 0) { 
        reciclarMazos(); 
        return; 
    }

    // Mover última carta del inicial a sobrantes
    let carta = mazoInicial.pop();
    mazoSobrantes.push(carta);

    // Render inicial y sobrantes
    cargarTapeteInicial(mazoInicial);
    tapeteSobrantes.innerHTML = "";
    estilizarCartaCentro(carta);
    carta.draggable = true;
    carta.ondragstart = al_mover;
    tapeteSobrantes.appendChild(carta);

    // Contadores y movimiento
    setContador(contInicial, mazoInicial.length);
    setContador(contSobrantes, mazoSobrantes.length);
    incContador(contMovimientos);

    // Reciclaje automático si aplica
    reciclarMazos();
}

function reciclarMazos() {
    if (mazoInicial.length === 0 && mazoSobrantes.length > 0) { 
        mazoInicial = mazoSobrantes.slice();
        barajar(mazoInicial);
        mazoSobrantes = [];
        tapeteSobrantes.innerHTML = "";
        setContador(contSobrantes, 0);
        cargarTapeteInicial(mazoInicial);
        incContador(contMovimientos);
    }
}

function al_mover(e) {
    e.dataTransfer.setData("text/plain/numero", e.target.dataset.numero);
    e.dataTransfer.setData("text/plain/palo", e.target.dataset.palo);
}

function soltar(e) {
    e.preventDefault();

    // Datos de la carta arrastrada
    let numero = parseInt(e.dataTransfer.getData("text/plain/numero"));
    let palo = e.dataTransfer.getData("text/plain/palo");

    // Detectar origen
    let origenMazo = null, origenContador = null, carta = null;
    if (mazoInicial.length > 0 &&
        parseInt(mazoInicial[mazoInicial.length - 1].dataset.numero) === numero &&
        mazoInicial[mazoInicial.length - 1].dataset.palo === palo) {
        origenMazo = mazoInicial; origenContador = contInicial; carta = mazoInicial.pop();
    } else if (mazoSobrantes.length > 0 &&
        parseInt(mazoSobrantes[mazoSobrantes.length - 1].dataset.numero) === numero &&
        mazoSobrantes[mazoSobrantes.length - 1].dataset.palo === palo) {
        origenMazo = mazoSobrantes; origenContador = contSobrantes; carta = mazoSobrantes.pop();
    }
    if (!carta) return;

    // Detectar destino
    let destinoTapete = e.currentTarget;
    let destinoMazo = null, destinoContador = null;
    switch(destinoTapete.id) {
        case "receptor1": destinoMazo = mazoReceptor1; destinoContador = contReceptor1; break;
        case "receptor2": destinoMazo = mazoReceptor2; destinoContador = contReceptor2; break;
        case "receptor3": destinoMazo = mazoReceptor3; destinoContador = contReceptor3; break;
        case "receptor4": destinoMazo = mazoReceptor4; destinoContador = contReceptor4; break;
        default: 
            // No receptor válido: devolver al origen
            origenMazo.push(carta);
            if (origenMazo === mazoInicial) {
                cargarTapeteInicial(mazoInicial);
            } else {
                tapeteSobrantes.innerHTML = "";
                if (mazoSobrantes.length > 0) {
                    let ult = mazoSobrantes[mazoSobrantes.length - 1];
                    estilizarCartaCentro(ult);
                    ult.draggable = true;
                    ult.ondragstart = al_mover;
                    tapeteSobrantes.appendChild(ult);
                }
            }
            return;
    }

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

    // Movimiento inválido: devolver al origen y re-render
    if (!puedeColocar) {
        origenMazo.push(carta);
        if (origenMazo === mazoInicial) {
            cargarTapeteInicial(mazoInicial);
        } else {
            tapeteSobrantes.innerHTML = "";
            if (mazoSobrantes.length > 0) {
                let ult = mazoSobrantes[mazoSobrantes.length - 1];
                estilizarCartaCentro(ult);
                ult.draggable = true;
                ult.ondragstart = al_mover;
                tapeteSobrantes.appendChild(ult);
            }
        }
        return;
    }

    // Colocar en receptor
    destinoMazo.push(carta);
    destinoTapete.innerHTML = "";
    estilizarCartaCentro(carta);
    carta.draggable = false;
    destinoTapete.appendChild(carta);

    // Actualizar origen visual
    if (origenMazo === mazoInicial) {
        cargarTapeteInicial(mazoInicial);
    } else {
        tapeteSobrantes.innerHTML = "";
        if (mazoSobrantes.length > 0) {
            let ult = mazoSobrantes[mazoSobrantes.length - 1];
            estilizarCartaCentro(ult);
            ult.draggable = true;
            ult.ondragstart = al_mover;
            tapeteSobrantes.appendChild(ult);
        }
    }

    // Contadores y movimientos
    decContador(origenContador);
    incContador(destinoContador);
    incContador(contMovimientos);

    // Fin de juego
    if (mazoInicial.length === 0 && mazoSobrantes.length === 0) {
        clearInterval(temporizador);
        alert(`¡Fin del juego!\nTiempo: ${contTiempo.textContent}\nMovimientos: ${contMovimientos.textContent}`);
    }

    // Reciclaje automático si aplica
    reciclarMazos();
}


// ===================== ARRANQUE Y EVENTOS =====================
window.onload = function() {
    comenzarJuego();

    // Click para sacar carta del inicial
    tapeteInicial.addEventListener("click", sacarCartaInicial);

    // Eventos DnD en receptores
    [tapeteReceptor1, tapeteReceptor2, tapeteReceptor3, tapeteReceptor4].forEach(tapete => {
        tapete.ondragenter = e => e.preventDefault();
        tapete.ondragover  = e => e.preventDefault();
        tapete.ondragleave = e => e.preventDefault();
        tapete.ondrop      = soltar;
    });

    // Reset
    document.getElementById("reset").addEventListener("click", comenzarJuego);
};
