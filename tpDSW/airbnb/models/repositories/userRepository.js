import { TipoUsuario, Usuario } from "../domain/usuario.js";

export class UserRepository {
    usuario = new Usuario("Jorge", "jorge@gmail.com", TipoUsuario.HUESPED, "1")
    usuarios = [this.usuario];

    agregarUser(usuario) {
        usuario.id = this.obtenerSiguienteId()
        this.usuarios.push(usuario)
    }

    findAll() {
        return this.usuarios
    }

    findById(id) {
        const usuario = this.usuarios.find(u => u.id === id)
        if(!usuario) {
            throw new Error("No existe el usuario")
        }
        return usuario
    }
    obtenerSiguienteId() {
        return this.usuarios.length() + 1
        //return (this.reservas[this.platos.length - 1]?.id || 0) + 1;
    }
}