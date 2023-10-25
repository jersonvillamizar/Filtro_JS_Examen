export {alerta, comprarJuego};

function alerta(msg, type, funcion_ejecutar = () => {}, duracion = 10000){
    const types = {
        1: {
            background: "red",
            color: "white"
        },
        2: {
            background: "green",
            color: "white"
        },
        3: {
            background: "blue",
            color: "white"
        }
    }
    Toastify({
        text: msg,
        duration: duracion,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        onClick: funcion_ejecutar, // Callback after click
        style: types[type]
      }).showToast();
}

// Función para realizar la compra
function comprarJuego(clienteId, juegoId, clientes, juegos) {
    // Buscar el cliente y el juego por sus respectivos IDs
    const cliente = clientes.find(cliente => cliente.identificacion === clienteId);
    const juego = juegos.find(juego => juego.id_juego === juegoId);
  
    if (!cliente || !juego) {
      console.log("Cliente o juego no encontrado. Compra cancelada.");
      return;
    }


    cliente.puntos += parseInt(juego.puntos_juego); 
    const resumen_compra = `Proceso realizado con exito! 
        - Identificacion:  ${cliente.identificacion}
        - Camper: ${cliente.nombre}
        - Concepto: ${juego.nombre_juego}
        - $CamperCoins: ${juego.puntos_juego}

        - Puntos de fidelización acumulados: ${cliente.puntos}`
    

    return resumen_compra;
  }