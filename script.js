const canvas = document.getElementById('coinCanvas');
const ctx = canvas.getContext('2d');
const launchButton = document.getElementById('launchButton');
const resultList = document.getElementById('resultList');
const successCountDisplay = document.getElementById('successCount');
const messageDisplay = document.getElementById('message');

let successCount = 0;
let launches = 0;

function drawCoin(result) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = result === 'Cara' ? '#f1c40f' : '#2980b9';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ecf0f1';
    ctx.stroke();
    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = '#ecf0f1';
    ctx.fillText(result, canvas.width / 2 - 25, canvas.height / 2 + 7);
}

launchButton.addEventListener('click', () => {
    if (launches < 20) {
        launches++;
        const result = Math.random() < 0.5 ? 'Cara' : 'Cruz';
        if (result === 'Cara') successCount++;
        
        const li = document.createElement('li');
        li.textContent = result;
        resultList.appendChild(li);
        
        successCountDisplay.textContent = successCount;
        drawCoin(result);

        if (launches === 20) {
            messageDisplay.textContent = "La probabilidad siempre es 50/50, ¡la falacia del jugador es falsa!";
        }
    }
});
// Configuración inicial [cite: 93, 95]
let fichas = 100;
const limiteDeuda = -1000;

function girarRuleta() {
    const apuestaInput = document.getElementById('cantidadApuesta');
    const colorSeleccionado = document.getElementById('colorSeleccionado').value;
    const apuesta = parseInt(apuestaInput.value);

    // Validación de límites [cite: 94, 95]
    if (fichas <= limiteDeuda) {
        alert("Has alcanzado el límite de deuda con el casino (-1000).");
        return;
    }

    // Lógica de aleatoriedad (Probabilidad y ventaja de la casa) [cite: 105, 106]
    // 0 = Verde (Casa), 1-18 = Rojo, 19-36 = Negro
    const resultado = Math.floor(Math.random() * 37); 
    let colorResultado = "";

    if (resultado === 0) colorResultado = "verde";
    else if (resultado <= 18) colorResultado = "rojo";
    else colorResultado = "negro";

    // Procesar Ganancia/Pérdida [cite: 97, 104]
    if (colorSeleccionado === colorResultado) {
        fichas += apuesta; // Gana el doble (recupera lo suyo + gana lo mismo del casino)
        document.getElementById('mensaje').innerText = `¡Ganaste! Cayó ${colorResultado}.`;
    } else {
        fichas -= apuesta; // Pierde lo apostado
        document.getElementById('mensaje').innerText = `Perdiste. Cayó ${colorResultado}.`;
    }

    actualizarInterfaz();
}

function actualizarInterfaz() {
    document.getElementById('contadorFichas').innerText = `Fichas: ${fichas}`;
    // Si las fichas son negativas, mostrar en rojo para enfatizar la pérdida [cite: 104]
    if (fichas < 0) {
        document.getElementById('contadorFichas').style.color = "#ff4b2b";
    }
}
function verificarMito() {
    const mensajeMito = document.getElementById('explicacion-mito');
    
    if (fichas < 100) {
        mensajeMito.innerHTML = `
            <div style="border: 2px solid #ffd700; padding: 15px; margin-top: 20px; background: rgba(0,0,0,0.5);">
                <h3>🚩 Mito Roto: "¿Puedes ganarle al casino?"</h3>
                <p><strong>El Mito:</strong> "Si juegas suficiente tiempo, terminarás ganando"[cite: 89].</p>
                <p><strong>La Realidad:</strong> Has empezado con 100 fichas y ahora tienes ${fichas}[cite: 102, 103]. 
                Esto sucede por la <strong>Ventaja de la Casa</strong>: el número 0 (Verde) hace que las 
                probabilidades no sean realmente 50/50, asegurando que el casino gane a largo plazo.</p>
            </div>
        `;
    }
}
