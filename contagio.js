let fichasContagio = 1000;
let redSocial = Array(9).fill("sano"); // 9 personas
let indicePacienteCero = 4; // El del centro empieza contagiado
redSocial[indicePacienteCero] = "contagiado";

function jugarRonda() {
    const seleccionUsuario = parseInt(document.getElementById('prediccionPersona').value);
    const probConfig = parseFloat(document.getElementById('probRange').value);
    
    // 1. Simular contagio basado en cercanía (Probabilidad Condicional)
    let nuevosContagiados = [];
    
    redSocial.forEach((estado, i) => {
        if (estado === "sano") {
            // Si tiene un vecino contagiado, hay probabilidad de infectarse
            if (tieneVecinoContagiado(i)) {
                if (Math.random() < probConfig) {
                    nuevosContagiados.push(i);
                }
            }
        }
    });

    // 2. Verificar apuesta del usuario
    if (nuevosContagiados.includes(seleccionUsuario)) {
        fichasContagio += 10;
        document.getElementById('feedback').innerText = "¡Acertaste! Esa persona se contagió.";
    } else {
        fichasContagio -= 10;
        document.getElementById('feedback').innerText = "No se contagió en esta ronda.";
    }

    // Actualizar estados
    nuevosContagiados.forEach(i => redSocial[i] = "contagiado");
    dibujarRed();
    actualizarMarcador();
}

function tieneVecinoContagiado(i) {
    const vecinos = [i-1, i+1, i-3, i+3]; // Vecinos en un grid 3x3
    return vecinos.some(v => v >= 0 && v < 9 && redSocial[v] === "contagiado");
}

function dibujarRed() {
    const grid = document.getElementById('grid-contagio');
    grid.innerHTML = "";
    redSocial.forEach((estado, i) => {
        const div = document.createElement('div');
        div.className = `persona ${estado}`;
        div.innerText = i;
        grid.appendChild(div);
    });
}