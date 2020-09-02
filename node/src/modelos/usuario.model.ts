
import typeorm, { getRepository } from "typeorm"
import { UsuarioResponse } from "../dto/response/usuarioResponse";
import { Usuario } from "../entidades/Usuario";
import { UsuarioRepository } from "../repositorio/UsuarioRepository";



export class UsuarioModel implements UsuarioRepository {
    async buscar(usuario: Usuario): Promise<Boolean> {
        let result: Usuario | undefined = await getRepository(Usuario)
            .findOne({ where: { usuario: usuario.usuario, clave: usuario.clave } })
        if (result != undefined) {
            return true
        } else {
            return false
        }
    }

    async verificarCredenciales(usuario: Usuario): Promise<Object> {
        let result: Usuario | undefined = await getRepository(Usuario)
            .findOne({ where: { usuario: usuario.usuario, clave: usuario.clave } })
        if (result != undefined) {

            return { verificado: true, usuario: result }
        } else {
            return { verificado: false, usuario: null }
        }
    }
    async registrar(usuario: Usuario): Promise<UsuarioResponse> {
        let result: Usuario = await getRepository(Usuario).save(usuario)
        if (result) {
            let usuarioResponse = new UsuarioResponse();
            usuarioResponse.Id = result.id;
            usuarioResponse.Usuario = result.usuario;
            usuarioResponse.Clave = result.clave;
            usuarioResponse.Rol = result.rol;
            return usuarioResponse
        } else {
            throw new Error("no se pudo registrar")
        }

    }
    async eliminar(id: number): Promise<typeorm.DeleteResult> {
        return await getRepository(Usuario).delete({ id: id })
    }

    async listar(): Promise<Array<UsuarioResponse>> {
        let lista: Array<Usuario> = await getRepository(Usuario).find({ order: { id: "ASC" } })
        let result = lista.map((usuario: Usuario, index) => {
            let response = new UsuarioResponse()
            response.Index = index + 1
            response.Id = usuario.id
            response.Usuario = usuario.usuario
            response.Clave = usuario.clave
            response.Rol = usuario.rol
            return response;
        })
        return result;
    }

}