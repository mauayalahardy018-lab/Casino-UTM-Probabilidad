let fichasPatron = 1000;
let aciertosPatron = 0;
let erroresPatron = 0;
let historialNumeros = [];

function predecirNumero() {
    const seleccion = parseInt(document.getElementById('numeroInput').value);
    
    if (fichasPatron < 10) {
        alert("Sin fichas suficientes.");
        return;
    }

    fichasPatron -= 10; // Costo por tiro [cite: 204]
    
    // Generar número aleatorio del 1 al 10 [cite: 198]
    const resultado = Math.floor(Math.random() * 10) + 1;
    historialNumeros.push(resultado);

    if (seleccion === resultado) {
        fichasPatron += 10; // Devuelve la apuesta si acierta [cite: 205]
        aciertosPatron++;
        document.getElementById('status').innerText = `¡Acertaste! Salió el ${resultado}`;
    } else {
        erroresPatron++;
        document.getElementById('status').innerText = `Fallaste. Salió el ${resultado}`;
    }

    actualizarTablero();
}

function actualizarTablero() {
    document.getElementById('fichas-p').innerText = fichasPatron;
    document.getElementById('aciertos-p').innerText = aciertosPatron;
    document.getElementById('errores-p').innerText = erroresPatron;
    document.getElementById('historial-p').innerText = historialNumeros.slice(-10).join(', ');

    // Mostrar conclusión si se detecta que el usuario intenta buscar patrones
    if (historialNumeros.length > 15) {
        document.getElementById('conclusion-p').innerHTML = `
            <div class="card-casino">
                <h3>🚩 Mito Roto: Patrones Numéricos</h3>
                <p><strong>Mito:</strong> "Los números tienen patrones y puedo predecir el siguiente"[cite: 197].</p>
                <p><strong>Realidad:</strong> Aunque veas que el 7 salió dos veces, la probabilidad de que salga en el tercer tiro sigue siendo 1/10. Los patrones que percibes son solo coincidencias en una secuencia aleatoria[cite: 199, 208].</p>
            </div>
        `;
    }
}