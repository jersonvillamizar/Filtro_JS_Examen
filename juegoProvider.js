import { alerta } from "./funciones_export.js";

class JuegoProvider{  
    juegos = [];
    constructor(juegos =[]) {
        const lista_guardada = JSON.parse(localStorage.getItem("juegos"));
        this.juegos = juegos;
        if (lista_guardada){
            this.juegos = lista_guardada;
        }
    }   

    registrarJuego(nuevoJuego){
        const usuario_existe = this.buscarJuego(nuevoJuego.id_juego);
        if (usuario_existe != undefined){
            alerta("Ya hiciste un Concepto con este id_juego", 1);
            return
        }
        this.juegos.push(nuevoJuego);
        this.guardarLocal();
        alerta("Concepto guardado", 2);
    }

    listarjuegos(lista_juegos = this.juegos){
        const validarListaTotal = lista_juegos == this.juegos
        console.log(validarListaTotal)
        if (lista_juegos.length == 0){
            if (validarListaTotal) alerta("No hay Conceptos para mostrar");
            return "No hay Conceptos para mostrar"
        }
        const listado = lista_juegos.map(Juego => {
            return `<section class="listado_juegos">
            <div class="listado_Juego">
                <p><strong> ID: </strong> ${Juego.id_juego}</p>
                <p><strong> Descripción: </strong> ${Juego.nombre_juego}</p>
                <p><strong> $CampCoins: </strong> ${Juego.puntos_juego}</p>
            </div>
            <div class="listado_botones">
                <button onclick="borrar_juego(${Juego.id_juego})">Eliminar</button>
            </div>
        </section>`
        })

        return listado.join("")
    }

    listarJuegosNombre(lista_juegos = this.juegos){
        const validarListaTotal = lista_juegos == this.juegos
        if (lista_juegos.length == 0){
            if (validarListaTotal) alerta("No hay Conceptos para mostrar");
            return `<option value="id">No hay Conceptos para mostrar</option>`
        }
        const listado = lista_juegos.map(Juego => {
            return `<option value="${Juego.id_juego}">${Juego.nombre_juego}</option>`
        })

        return listado.join("")
    }

    buscarJuego(codigo){
        for(let i in this.juegos){
            if(this.juegos[i].id_juego == codigo){
                return i;
            }
        }
    }

    eliminarJuego(codigo){
        const Juego_eliminado = this.buscarJuego(codigo);

        if (Juego_eliminado != undefined){
            const juegosFiltrados = this.juegos.filter((elemento) => elemento.id_juego != codigo);
            this.juegos = juegosFiltrados;
            this.guardarLocal();
            return
        }

        alert("El Concepto no existe");
    }

    modificarJuego(codigo, nuevoJuego){
        const Juego_modificado = this.buscarJuego(codigo);
        
        if (Juego_modificado != undefined){
            nuevoJuego.id_juego = codigo
            this.juegos[Juego_modificado] = nuevoJuego
            this.guardarLocal();
            return
        }

        alert("El Concepto no existe");
    }

    obtenerJuego(codigo){
        const i = this.buscarJuego(codigo);
        return this.juegos[i];
    }

    guardarLocal(){
        localStorage.setItem("juegos", JSON.stringify(this.juegos));
    }

    filtrarJuegoPor(texto){
        const regExpBusqueda = new RegExp(`.*${texto.toLowerCase()}.*`)
        const listaFiltrada = this.juegos.filter((elemento) => regExpBusqueda.test(elemento.id_juego) || regExpBusqueda.test(elemento.nombre_juego.toLowerCase()) || regExpBusqueda.test(elemento.puntos_juego.toLowerCase()));
        return this.listarjuegos(listaFiltrada);
    }

}

export default JuegoProvider;

