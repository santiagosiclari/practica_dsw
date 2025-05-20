import { UsuarioModel } from "../schemas/usuarioSchema.js";

export class UserRepository {
    
    constructor() {
        this.model = UsuarioModel;
    }
    
    async save(usuario) {
        const query = usuario.id ? { _id: usuario.id } : { _id: new this.model()._id };
        return await this.model.findOneAndUpdate(
            query,
            usuario,
            { 
                new: true, 
                runValidators: true,
                upsert: true
            }
        );
    }

    async findAll() {
        const usuarios = await this.model.find()
        return usuarios
    }

    async findById(id) {
        return await this.model.findById(id);
    }

    async deleteById(id) {
        const resultado = await this.model.findByIdAndDelete(id);
        return resultado !== null;
    }
}