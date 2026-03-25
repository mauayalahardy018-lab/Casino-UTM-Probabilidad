let fichasLoot = 1000;
let cartasObtenidas = { comun: 0, raro: 0, epico: 0, legendario: 0 };
let totalCartasAbiertas = 0;

function comprarMazo(cantidadMazos) {
    const costo = (cantidadMazos === 10) ? 90 : 10; // Descuento por 10 mazos
    
    if (fichasLoot < costo) {
        alert("No tienes suficientes fichas.");
        return;
    }

    fichasLoot -= costo;
    const cartasPorAbrir = cantidadMazos * 10; // Cada mazo tiene 10 cartas

    for (let i = 0; i < cartasPorAbrir; i++) {
        abrirCarta();
    }
    actualizarInterfazLoot();
}

function abrirCarta() {
    const azar = Math.random() * 100;
    totalCartasAbiertas++;

    // Probabilidades según el PDF
    if (azar < 5) cartasObtenidas.legendario++;      // 5%
    else if (azar < 20) cartasObtenidas.epico++;     // 15% (20-5)
    else if (azar < 50) cartasObtenidas.raro++;      // 30% (50-20)
    else cartasObtenidas.comun++;                    // Resto hasta 80%
}

function actualizarInterfazLoot() {
    document.getElementById('fichas-loot').innerText = fichasLoot;
    document.getElementById('total-cartas').innerText = totalCartasAbiertas;
    
    // Actualizar contadores visuales
    document.getElementById('count-comun').innerText = cartasObtenidas.comun;
    document.getElementById('count-raro').innerText = cartasObtenidas.raro;
    document.getElementById('count-epico').innerText = cartasObtenidas.epico;
    document.getElementById('count-legend').innerText = cartasObtenidas.legendario;

    if (cartasObtenidas.legendario > 0) {
        document.getElementById('mensaje-loot').innerHTML = "<h2 style='color:gold'>¡LEGENDARIO ENCONTRADO!</h2>";
    }

    if (fichasLoot <= 0 && cartasObtenidas.legendario === 0) {
        mostrarConclusionLoot();
    }
}

function mostrarConclusionLoot() {
    document.getElementById('conclusion-loot').innerHTML = `
        <div class="card-casino">
            <h3>🚩 Mito Roto: El Objeto Legendario</h3>
            <p><strong>Mito:</strong> "Si compro muchas cajas, seguro obtengo el legendario"[cite: 170].</p>
            <p><strong>Realidad:</strong> Abriste ${totalCartasAbiertas} cartas y la probabilidad de 5% se mantuvo 
            independiente en cada una[cite: 186, 191]. Gastar más fichas no aumenta tu suerte individual.</p>
        </div>
    `;
}