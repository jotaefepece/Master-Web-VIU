/***** INICIO DECLARACIÓN DE VARIABLES GLOBALES *****/

// Array de palos
let palos = ["kir", "wdo", "hex", "cir"];
// Array de número de cartas
let numeros = [1, 2, 3, 4, 5, 6, 7];
// En las pruebas iniciales solo se trabajará con cuatro cartas por palo:
//let numeros = [9, 10];
// paso (top y left) en pixeles de una carta a la siguiente en un mazo
let paso = 5;
let juegoTerminado = false;

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

/***** Funciones de funcionamiento *****/
function reiniciarJuego() {
// Parar temporizador
	juegoTerminado = false;
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

/***** Funciones de funcionamiento *****/
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

/***** Funciones para contadores *****/
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

/***** Funciones de inicio de juego *****/
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

/***** Funciones de movimiento carta *****/
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
        puedeColocar = (numero === 7); //ajuste mazo total cartas
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
    const scoreFinal = parseInt(contMovimientos.textContent, 10);
if (!juegoTerminado && mazoInicial.length === 0 && mazoSobrantes.length === 0) {
		juegoTerminado = true;
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
		
		fetch("ranking-api/get_ranking.php")
	  .then(res => res.json())
	  .then(ranking => {

		// Si hay menos de 27 entradas, entra directo
		if (ranking.length < 27) {
		  pedirNickYGuardar(scoreFinal);
		  return;
		}

		// Peor score actual (última posición)
		const peorScore = ranking[ranking.length - 1].score;

		// Entra solo si hizo MENOS movimientos
		if (scoreFinal < peorScore) {
		  pedirNickYGuardar(scoreFinal);
		}

		// Si no mejora, no se guarda
		})
		.catch(err => console.error("Error evaluando ranking:", err));


    }
	// Verificación automática
	reciclarMazos(); 
}

/***** Funciones de limpieza Tapates *****/
function limpiarTapete(tapete) {
    // Elimina solo las cartas (<img>), no los <span>
    Array.from(tapete.querySelectorAll("img")).forEach(img => img.remove());
}

/***** Funciones de animación cartas *****/
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

/***** Funciones de uso botones *****/
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
          <li>Organiza las cartas en orden descendente: 7,6,5,4,3,2,1.</li>
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

document.addEventListener("DOMContentLoaded", function () {
  const btnRanking = document.getElementById("btn_ranking");

  btnRanking.addEventListener("click", function () {
    // ¿Ya existe el popup?
    let popup = document.getElementById("popup_ranking");

    if (popup) {
      popup.remove();
      return;
    }

    // Crear popup
    popup = document.createElement("div");
    popup.id = "popup_ranking";
    popup.className = "popup-reglas";

    popup.innerHTML = `
      <h3>🏆 Ranking</h3>
      <ul id="ranking_list">
        <li>Cargando ranking...</li>
      </ul>
      <button id="cerrar_ranking">Cerrar</button>
    `;

    document.body.appendChild(popup);

    // Botón cerrar
    document
      .getElementById("cerrar_ranking")
      .addEventListener("click", function () {
        popup.remove();
      });
      
       // Solo para mostrar un ranking de ejemplo
      fetch("ranking-api/get_ranking.php")
  .then(res => {
    if (!res.ok) throw new Error("API no disponible");
    return res.json();
  })
  .then(data => {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Ranking vacío");
    }
    renderRanking(data);
  })
  .catch(() => {
    console.warn("Usando ranking ficticio local");
    renderRanking(rankingFicticio);
  });

/* ********** función sólo si está conectado a database
    fetch("ranking-api/get_ranking.php")
      .then(res => res.json())
      .then(data => {
        const list = document.getElementById("ranking_list");
        list.innerHTML = "";

        if (!Array.isArray(data) || data.length === 0) {
          list.innerHTML = "<li>No hay puntajes aún</li>";
          return;
        }

        data.forEach((row, index) => {
        const li = document.createElement("li");
		const fecha = new Date(row.created_at).toLocaleDateString();

		li.innerHTML = `
		  <strong>${index + 1}: ${row.nick}</strong><br>
		  <small> ${row.score} movimientos — ${fecha}</small>
		`;
        list.appendChild(li);
        });
      })
      .catch(err => {
        const list = document.getElementById("ranking_list");
        list.innerHTML = "<li>Error cargando ranking</li>";
        console.error(err);
      });   *********************************                */
  });           
});

/***** Funciones para uso de comodín *****/
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

/***** Funciones para uso de ranking *****/
function pedirNickYGuardar(scoreFinal) {
  // Crear overlay
  const overlay = document.createElement("div");
  overlay.id = "nick_overlay";
  overlay.innerHTML = `
    <div id="nick_popup">
      <h3>🏆 ¡Entraste al ranking!</h3>
      <p>Ingresa tu nickname:</p>
      <input type="text" id="nick_input" maxlength="12" placeholder="Tu nick..." />
      <div class="popup-buttons">
        <button id="nick_ok">Guardar</button>
        <button id="nick_cancel">Cancelar</button>
      </div>
      <p id="nick_error" style="display:none; color:red; font-size:14px; margin-top:8px;">
        Debes ingresar un nickname válido
      </p>
    </div>
  `;
  document.body.appendChild(overlay);

  // Botón Guardar
  document.getElementById("nick_ok").addEventListener("click", () => {
    let nick = document.getElementById("nick_input").value.trim();

    // 👇 recorta a máximo 12 caracteres
    nick = nick.substring(0, 12);

    if (!nick) {
      document.getElementById("nick_error").style.display = "block";
      return;
    }

    fetch("ranking-api/submit_score.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nick: nick, score: scoreFinal })
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === "saved") {
        mostrarMensajeRanking("🏆 Puntaje guardado");
      } else {
        mostrarMensajeRanking("No se pudo guardar");
      }
      overlay.remove();
    })
    .catch(err => {
      console.error(err);
      mostrarMensajeRanking("Error guardando ranking");
      overlay.remove();
    });
  });

  // Botón Cancelar
  document.getElementById("nick_cancel").addEventListener("click", () => {
    mostrarMensajeRanking("Ranking cancelado");
    overlay.remove();
  });
}



function mostrarMensajeRanking(texto) {
  const msg = document.createElement("div");
  msg.className = "mensaje-ranking";
  msg.textContent = texto;

  document.body.appendChild(msg);

  setTimeout(() => {
    msg.remove();
  }, 3000);
}

/***** Funciones para uso de ranking ficticio*****/

const rankingFicticio = [
  { nick: "Yoshi", score: 278, created_at: "2026-10-30" },
  { nick: "Roy", score: 333, created_at: "2026-03-09" },
  { nick: "Link", score: 345, created_at: "2026-07-19" },
  { nick: "Pichu", score: 376, created_at: "2026-09-29" },
  { nick: "Ness", score: 401, created_at: "2026-12-18" },
  { nick: "Falco", score: 488, created_at: "2026-01-22" },
  { nick: "Sheik", score: 498, created_at: "2026-06-11" },
  { nick: "IceClimb", score: 527, created_at: "2026-04-27" },
  { nick: "Jigglypf", score: 544, created_at: "2026-08-08" },
  { nick: "Fox", score: 552, created_at: "2026-05-10" },
  { nick: "Dedede", score: 555, created_at: "2026-04-05" },
  { nick: "Donkey", score: 577, created_at: "2026-12-03" },
  { nick: "Kirby", score: 612, created_at: "2026-02-03" },
  { nick: "Bowser", score: 612, created_at: "2026-11-26" },
  { nick: "Duckula", score: 621, created_at: "2026-07-23" },
  { nick: "MetaKnt", score: 643, created_at: "2026-03-15" },
  { nick: "Sonic", score: 699, created_at: "2026-03-20" },
  { nick: "Mewtwo", score: 711, created_at: "2026-10-14" },
  { nick: "Luigi", score: 712, created_at: "2026-11-05" },
  { nick: "Mario", score: 776, created_at: "2026-06-07" },
  { nick: "Zelda", score: 802, created_at: "2026-05-16" },
  { nick: "Peach", score: 805, created_at: "2026-01-17" },
  { nick: "Samus", score: 821, created_at: "2026-08-25" },
  { nick: "Pikachu", score: 824, created_at: "2026-09-12" },
  { nick: "Snake", score: 873, created_at: "2026-02-28" },
  { nick: "Marth", score: 915, created_at: "2026-02-14" },
  { nick: "KingDed", score: 989, created_at: "2026-04-21" }
];


function renderRanking(data) {
  const list = document.getElementById("ranking_list");
  list.innerHTML = "";

  data.forEach((row, index) => {
    const li = document.createElement("li");
    const fecha = new Date(row.created_at).toLocaleDateString();

    li.innerHTML = `
      <strong>${index + 1}. ${row.nick}</strong> — ${row.score} movimientos<br>
      <small>${fecha}</small>
    `;
    list.appendChild(li);
  });
}
