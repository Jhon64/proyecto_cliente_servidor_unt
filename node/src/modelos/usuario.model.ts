
import typeorm, { getRepository, UpdateResult } from "typeorm"
import { UsuarioResponse } from "../dto/response/usuarioResponse";
import { Persona } from '../entidades/Persona';
import { Usuario } from "../entidades/Usuario";
import { UsuarioRepository } from "../repositorio/UsuarioRepository";
import { Cliente } from '../entidades/Cliente';



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
            usuarioResponse.IdUsuario = result.idUsuario;
            usuarioResponse.Usuario = result.usuario;
            usuarioResponse.Clave = result.clave;
            usuarioResponse.Rol = result.rol;
            if (usuarioResponse.Persona !== null)
                usuarioResponse.Persona = result.persona
            return usuarioResponse
        } else {
            throw new Error("no se pudo registrar")
        }

    }
    async eliminar(id: number): Promise<typeorm.DeleteResult> {
        return await getRepository(Usuario).delete({ idUsuario: id })
    }

    async listar(): Promise<Array<UsuarioResponse>> {
        let lista: Array<Usuario> = await getRepository(Usuario).find({ order: { idUsuario: "ASC" }, relations: ["persona"] })
        let result = lista.map((usuario: Usuario, index) => {
            let response = new UsuarioResponse()
            console.log(usuario)
            response.Index = index + 1
            response.IdUsuario = usuario.idUsuario
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
            let cliente = new Cliente();
            cliente.persona = resultPersona
            let clienteResult = await getRepository(Cliente).save(cliente)
            usuario.persona = resultPersona
            let result: Usuario = await getRepository(Usuario).save(usuario)
            console.log(result)
            if (result.idUsuario !== undefined) {
                let usuarioResponse = new UsuarioResponse();
                usuarioResponse.IdUsuario = result.idUsuario;
                usuarioResponse.Usuario = result.usuario;
                usuarioResponse.Clave = result.clave;
                usuarioResponse.Rol = result.rol;
                usuarioResponse.Persona = result.persona;
                return usuarioResponse
            } else {
                let eliminar = await getRepository(Usuario).delete({ idUsuario: resultPersona.id })
                throw new Error("no se pudo registrar Usuario")
            }
        } else {
            throw new Error("no se pudo registrar Persona")
        }
    }

    async buscarDni(dni: string) {
        let buscar = await getRepository(Usuario)
            .query("select usuario.*,persona.* from usuario " +
                "right join persona on usuario.personaid = persona.id " +
                "where persona.dni = " + dni
            )


        console.log(buscar)
        if (buscar !== undefined) {
            return buscar
        } else {
            throw new Error("no se encontro información")
        }
    }

    async usuarioBuscarId(id: number) {
        let result = await getRepository(Usuario).findOne({ idUsuario: id })
        if (result) {
            let usuarioResponse = new UsuarioResponse();
            usuarioResponse.IdUsuario = result.idUsuario;
            usuarioResponse.Usuario = result.usuario;
            usuarioResponse.Clave = result.clave;
            usuarioResponse.Rol = result.rol;
            if (usuarioResponse.Persona !== null)
                usuarioResponse.Persona = result.persona
            return usuarioResponse
        } else {
            throw new Error("no se pudo registrar")
        }
    }

    async actualizarUsuario(usuario: Usuario, idUsuario: number) {

        let resultUsuarios: UpdateResult = await getRepository(Usuario).update(idUsuario, usuario)
        console.log(resultUsuarios)
        if (resultUsuarios) {
            return resultUsuarios;
        } else {
            throw new Error("No se pudo actualizar Usuario")
        }

    }


}