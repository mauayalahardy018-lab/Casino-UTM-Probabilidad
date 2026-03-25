let fichasTombola = 1000;
let intentosRealizados = 0;
const costoIntento = 10;
const probabilidadExito = 0.05; // 5% según el PDF

function girarTombola() {
    if (fichasTombola < costoIntento) {
        alert("Fichas insuficientes.");
        return;
    }

    fichasTombola -= costoIntento;
    intentosRealizados++;
    
    // Simulación del azar
    const resultado = Math.random();
    const gano = resultado < probabilidadExito;

    actualizarPantalla(gano);
}

function actualizarPantalla(gano) {
    document.getElementById('fichas-count').innerText = fichasTombola;
    document.getElementById('intentos-count').innerText = intentosRealizados;
    
    const mensaje = document.getElementById('resultado-mensaje');
    const barra = document.getElementById('progreso-barra');
    
    // Actualizar barra de progreso visual (opcional)
    barra.style.width = `${Math.min(intentosRealizados * 2, 100)}%`;

    if (gano) {
        mensaje.innerHTML = "<h2 style='color: #ffd700;'>¡GANASTE EL PREMIO RARO! 🏆</h2>";
        mostrarConclusion(true);
    } else {
        mensaje.innerText = "Sigue intentando... la suerte no cambia.";
        if (fichasTombola <= 0) {
            mostrarConclusion(false);
        }
    }
}

function mostrarConclusion(gano) {
    const conclusionDiv = document.getElementById('conclusion-juego');
    conclusionDiv.innerHTML = `
        <div class="card-casino">
            <h3>🚩 Mito Roto: La suerte y los intentos</h3>
            <p><strong>El Mito:</strong> "Si lo intento muchas veces, seguro lo logro"[cite: 153].</p>
            <p><strong>La Realidad:</strong> Cada intento tiene exactamente un 5% de probabilidad. 
            Haber fallado 50 veces no hace que el intento 51 sea más probable. 
            La probabilidad es <strong>constante</strong> y no acumulativa[cite: 164, 167].</p>
        </div>
    `;
}