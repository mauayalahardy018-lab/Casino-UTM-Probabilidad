// Configuración inicial de fichas según el instrumento [cite: 93, 95]
let fichas = 100;
const limiteDeuda = -1000;

function girarRuleta() {
    const apuestaInput = document.getElementById('cantidadApuesta');
    const colorSeleccionado = document.getElementById('colorSeleccionado').value;
    const apuesta = parseInt(apuestaInput.value);

    // Validación de límites de deuda [cite: 95]
    if (fichas <= limiteDeuda) {
        alert("Has alcanzado el límite de deuda (-1000). El casino no te permite jugar más.");
        return;
    }

    // Lógica de aleatoriedad (Probabilidad 1/37 debido al 0 verde) [cite: 105, 106]
    const resultado = Math.floor(Math.random() * 37); 
    let colorResultado = (resultado === 0) ? "verde" : (resultado <= 18 ? "rojo" : "negro");

    // Procesar Ganancia/Pérdida [cite: 97]
    if (colorSeleccionado === colorResultado) {
        fichas += apuesta; // Gana el doble de lo apostado
        document.getElementById('mensaje').innerText = `¡Ganaste! Cayó ${colorResultado}.`;
    } else {
        fichas -= apuesta; // Pierde lo apostado
        document.getElementById('mensaje').innerText = `Perdiste. Cayó ${colorResultado}.`;
    }

    actualizarInterfaz();
}

function actualizarInterfaz() {
    document.getElementById('contadorFichas').innerText = `Fichas: ${fichas}`;
    
    // Demostración del mito: si pierde dinero, explicar por qué [cite: 101, 104]
    if (fichas < 100) {
        document.getElementById('explicacion-mito').innerHTML = 
            "<strong>Mito Roto:</strong> A largo plazo, la 'ventaja de la casa' (el 0 verde) asegura que el jugador pierda fichas.";
    }
}