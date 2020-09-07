import { PersonaResponse } from '../dto/response/personaResponse';

import typeorm, { getRepository } from "typeorm"
import { Persona } from '../entidades/Persona';
import { Cliente } from '../entidades/Cliente';
import { Usuario } from '../entidades/Usuario';
import { UsuarioResponse } from '../dto/response/usuarioResponse';


export class ClienteModel {
    async registrar(persona: Persona): Promise<PersonaResponse> {
        let result: Persona = await getRepository(Persona).save(persona)
        if (result) {
            let personaResponse = new PersonaResponse();
            personaResponse.IdPersona = result.id;
            personaResponse.Nombre = result.nombre;
            personaResponse.Apellido = result.apellido;
            personaResponse.CreatedAt = result.createdAt;
            return personaResponse
        } else {
            throw new Error("no se pudo registrar")
        }

    }
    async eliminar(id: number): Promise<typeorm.DeleteResult> {
        let resultCliente: Cliente | undefined = await getRepository(Cliente).findOne({ idCliente: id }, { relations: ["persona"] })
        if (resultCliente !== undefined) {
            let eliminarPersona = await getRepository(Persona).delete({ id: resultCliente.persona.id })
            if (eliminarPersona.affected) {
                let eliminarCliente = await getRepository(Cliente).delete({ idCliente: id })
                return eliminarCliente
            } else {
                throw new Error("no se pudo eliminar la informacion")
            }
        } else {
            throw new Error("no se pudo eliminar la informacion")
        }
    }

    async listar(): Promise<Array<PersonaResponse>> {
        let lista: Array<Cliente> = await getRepository(Cliente).find({ order: { idCliente: "ASC" }, relations: ["persona"] })
        let result = lista.map((cliente: Cliente, index) => {
            let response = new PersonaResponse()
            response.Index = index + 1
            //@ts-ignore
            response.IdCliente = cliente.idCliente
            response.IdPersona = cliente.persona.id
            response.Nombre = cliente.persona.nombre
            response.Apellido = cliente.persona.apellido
            response.Dni = cliente.persona.dni
            response.Celular = cliente.persona.celular
            response.Correo = cliente.persona.correo
            response.Tipo = cliente.persona.tipo
            response.CreatedAt = cliente.persona.createdAt
            return response;
        })
        return result;
    }

    async buscarDni(dni: string) {
        let buscar: Persona | undefined = await getRepository(Persona).findOne({ where: { dni } })
        if (buscar !== undefined) {
            return buscar
        } else {
            throw new Error("no se encontro información")
        }
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

}