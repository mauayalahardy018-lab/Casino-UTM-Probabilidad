let fichasSlots = 1000;
const simbolos = ['7', '🍒', '💎', '🔔', '⭐', '🍀'];

function jugarSlots() {
    if (fichasSlots < 10) {
        alert("Fichas insuficientes para apostar.");
        return;
    }

    fichasSlots -= 10;
    
    // Generar 3 resultados independientes
    const r1 = simbolos[Math.floor(Math.random() * simbolos.length)];
    const r2 = simbolos[Math.floor(Math.random() * simbolos.length)];
    const r3 = simbolos[Math.floor(Math.random() * simbolos.length)];

    actualizarVisual(r1, r2, r3);
    verificarPremio(r1, r2, r3);
}

function actualizarVisual(r1, r2, r3) {
    document.getElementById('slot1').innerText = r1;
    document.getElementById('slot2').innerText = r2;
    document.getElementById('slot3').innerText = r3;
    document.getElementById('fichas-s').innerText = fichasSlots;
}

function verificarPremio(r1, r2, r3) {
    const mensaje = document.getElementById('mensaje-s');
    
    if (r1 === r2 && r2 === r3) {
        fichasSlots += 500; // Premio mayor
        mensaje.innerHTML = "<span style='color:gold'>¡JACKPOT! +500 fichas</span>";
    } else if (r1 === r2 || r2 === r3 || r1 === r3) {
        // El "Casi ganas" que menciona el PDF [cite: 214, 215]
        mensaje.innerHTML = "<span style='color:orange'>¡Casi! La ilusión de la precisión te hace creer que estás cerca.</span>";
        mostrarConclusionSlots();
    } else {
        mensaje.innerText = "Sigue intentando.";
    }
}

function mostrarConclusionSlots() {
    document.getElementById('conclusion-s').innerHTML = `
        <div class="card-casino">
            <h3>🚩 Mito Roto: La Ilusión de la Precisión</h3>
            <p><strong>Mito:</strong> "Si salen dos símbolos iguales, estoy a punto de ganar". [cite: 211, 212]</p>
            <p><strong>Realidad:</strong> Cada rodillo es independiente. Estar "cerca" es una percepción visual; matemáticamente, tus probabilidades para el próximo giro siguen siendo exactamente las mismas. [cite: 218, 220]</p>
        </div>
    `;
}