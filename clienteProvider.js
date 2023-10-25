import { alerta } from "./funciones_export.js";

class ClienteProvider{  
    clientes = [];
    constructor(clientes =[]) {
        const lista_guardada = JSON.parse(localStorage.getItem("clientes"));
        this.clientes = clientes;
        if (lista_guardada){
            this.clientes = lista_guardada;
        }
    }   

    registrarCliente(nuevoCliente){
        const usuario_existe = this.buscarCliente(nuevoCliente.identificacion);
        if (usuario_existe != undefined){
            alerta("Ya hiciste un Camper con esta identificacion", 1);
            return
        }
        this.clientes.push(nuevoCliente);
        this.guardarLocal();
        alerta("Camper guardado", 2);
    }


    listarClientes(lista_clientes = this.clientes){
        const validarListaTotal = lista_clientes == this.clientes
        console.log(validarListaTotal)
        if (lista_clientes.length == 0){
            if (validarListaTotal) alerta("No hay Campers para mostrar");
            return "No hay Campers para mostrar"
        }
        const listado = lista_clientes.map(cliente => {
            return `<section class="listado_clientes">
            <div class="listado_cliente">
                <p>Identificacion de Camper: ${cliente.identificacion}</p>
                <p>Nombre de Camper: ${cliente.nombre}</p>
                <p>Telefono de Camper: ${cliente.telefono}</p>
                <p>Correo de Camper: ${cliente.correo}</p>
                <p>Grupo de Camper: ${cliente.grupo}</p>
                <p>Puntos de Camper: ${cliente.puntos}</p>
            </div>
            <div class="listado_botones">
                <button onclick="rellenar(${cliente.identificacion})">Modificar</button>
                <button onclick="borrar(${cliente.identificacion})">Eliminar</button>
            </div>
        </section>`
        })

        return listado.join("")
    }

    listarClientesNombre(lista_clientes = this.clientes){
        const validarListaTotal = lista_clientes == this.clientes
        if (lista_clientes.length == 0){
            if (validarListaTotal) alerta("No hay Campers para mostrar");
            return `<option value="id">No hay Campers para mostrar</option>`
        }
        const listado = lista_clientes.map(cliente => {
            return `<option value="${cliente.identificacion}">${cliente.nombre}</option>`
        })

        return listado.join("")
    }

    buscarCliente(codigo){
        for(let i in this.clientes){
            if(this.clientes[i].identificacion == codigo){
                return i;
            }
        }
    }

    eliminarCliente(codigo){
        const cliente_eliminado = this.buscarCliente(codigo);

        if (cliente_eliminado != undefined){
            const clientesFiltrados = this.clientes.filter((elemento) => elemento.identificacion != codigo);
            this.clientes = clientesFiltrados;
            this.guardarLocal();
            return
        }

        alerta("El Camper no existe", 1);
    }

    modificarCliente(codigo, nuevoCliente){
        const cliente_modificado = this.buscarCliente(codigo);
        
        if (cliente_modificado != undefined){
            nuevoCliente.identificacion = codigo
            this.clientes[cliente_modificado] = nuevoCliente
            this.guardarLocal();
            return
        }

        alerta("El Camper no existe", 1);
    }

    obtenerCliente(codigo){
        const i = this.buscarCliente(codigo);
        return this.clientes[i];
    }

    guardarLocal(){
        localStorage.setItem("clientes", JSON.stringify(this.clientes));
    }

    filtrarClientePor(texto){
        const regExpBusqueda = new RegExp(`.*${texto.toLowerCase()}.*`)
        const listaFiltrada = this.clientes.filter((elemento) => regExpBusqueda.test(elemento.identificacion) || regExpBusqueda.test(elemento.nombre.toLowerCase()));
        return this.listarClientes(listaFiltrada);
    }

}

export default ClienteProvider;

