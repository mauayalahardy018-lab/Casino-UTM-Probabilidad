// Configuración inicial del Juego 1
let lanzamientos = 0;
let aciertosUsuario = 0;
let historial = [];

function lanzarMoneda(esAutomatico = false) {
    // El PDF pide un límite de 20 para demostrar el punto o lanzamientos 1x1 [cite: 81]
    const seleccionUsuario = document.getElementById('seleccionMoneda')?.value; // 'Cara' o 'Cruz'
    
    // Generar resultado aleatorio 50/50 [cite: 76]
    const resultado = Math.random() < 0.5 ? 'Cara' : 'Cruz';
    
    // Guardar en historial 
    historial.push(resultado);
    lanzamientos++;

    // Verificar si el usuario acertó (solo si no es lanzamiento automático masivo)
    if (!esAutomatico && seleccionUsuario === resultado) {
        aciertosUsuario++;
    }

    actualizarPantallaMoneda(resultado);

    // Al llegar a 20 lanzamientos, mostrar la conclusión obligatoria [cite: 81]
    if (lanzamientos >= 20) {
        mostrarConclusionMito();
    }
}

// Función para lanzar 20 veces seguidas como pide el PDF [cite: 81]
function lanzar20Veces() {
    for (let i = 0; i < 20; i++) {
        lanzarMoneda(true);
    }
}

function actualizarPantallaMoneda(ultimoResultado) {
    // Actualizar contadores en el HTML [cite: 79, 80]
    document.getElementById('totalLanzamientos').innerText = lanzamientos;
    document.getElementById('totalAciertos').innerText = aciertosUsuario;
    document.getElementById('ultimoResultado').innerText = ultimoResultado;

    // Mostrar historial visual 
    const listaHistorial = document.getElementById('historialLista');
    const nuevoElemento = document.createElement('li');
    nuevoElemento.innerText = ultimoResultado;
    listaHistorial.prepend(nuevoElemento); // Poner el más reciente arriba
}

function mostrarConclusionMito() {
    const cuadroConclusion = document.getElementById('conclusion-moneda');
    cuadroConclusion.innerHTML = `
        <div style="background: rgba(255, 215, 0, 0.2); border: 2px solid #ffd700; padding: 15px; border-radius: 10px;">
            <h3>✅ Mito Roto: La Falacia del Jugador</h3>
            <p><strong>El Mito:</strong> "Si ha salido Cara muchas veces, ahora es más probable que salga Cruz"[cite: 68].</p>
            <p><strong>La Realidad:</strong> Después de ${lanzamientos} lanzamientos, puedes ver que cada tiro es 
            <strong>independiente</strong>. La moneda no tiene memoria; la probabilidad siempre fue y será 50/50[cite: 76, 84].</p>
        </div>
    `;
}