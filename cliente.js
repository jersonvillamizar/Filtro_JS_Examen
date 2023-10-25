class Cliente {
    identificacion
    nombre
    telefono
    correo
    grupo
    puntos

    constructor (identificacion, nombre, telefono, correo, grupo, puntos = 0) {
        this.identificacion = identificacion;
        this.nombre = nombre;
        this.telefono = telefono;
        this.correo = correo;
        this.grupo = grupo;
        this.puntos = puntos;
    }
}

export default Cliente;
