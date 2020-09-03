
import typeorm, { getRepository } from "typeorm"
import { UsuarioResponse } from "../dto/response/usuarioResponse";
import { Persona } from '../entidades/Persona';
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
        let lista: Array<Usuario> = await getRepository(Usuario).find({ order: { id: "ASC" }, relations: ["persona"] })
        let result = lista.map((usuario: Usuario, index) => {
            let response = new UsuarioResponse()
            console.log(usuario)
            response.Index = index + 1
            response.Id = usuario.id
            response.Usuario = usuario.usuario
            response.Clave = usuario.clave
            response.Rol = usuario.rol
            response.Persona = usuario.persona
            return response;
        })
        return result;
    }

    async crearUsuario(persona: Persona, usuario: Usuario): Promise<UsuarioResponse> {
        let resultPersona: Persona = await getRepository(Persona).save(persona)
        if (resultPersona.id !== undefined) {
            usuario.persona = resultPersona
            let result: Usuario = await getRepository(Usuario).save(usuario)
            console.log(result)
            if (result.id !== undefined) {
                let usuarioResponse = new UsuarioResponse();
                usuarioResponse.Id = result.id;
                usuarioResponse.Usuario = result.usuario;
                usuarioResponse.Clave = result.clave;
                usuarioResponse.Rol = result.rol;
                usuarioResponse.Persona = result.persona;
                return usuarioResponse
            } else {
                let eliminar = await getRepository(Usuario).delete({ id: resultPersona.id })
                throw new Error("no se pudo registrar Usuario")
            }
        } else {
            throw new Error("no se pudo registrar Persona")
        }
    }




}