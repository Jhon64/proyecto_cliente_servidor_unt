import { PersonaResponse } from '../dto/response/personaResponse';
import { PersonaRepository } from '../repositorio/PersonaRepository';
import typeorm, { getRepository } from "typeorm"
import { Persona } from '../entidades/Persona';


export class PersonaModel implements PersonaRepository {
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
        return await getRepository(Persona).delete({ id: id })
    }

    async listarPersonas(): Promise<Array<PersonaResponse>> {
        let lista: Array<Persona> = await getRepository(Persona).find({ order: { id: "ASC" } })
        let result = lista.map((persona: Persona, index) => {
            let response = new PersonaResponse()
            response.Index = index + 1
            response.IdPersona = persona.id
            response.Nombre = persona.nombre
            response.Apellido = persona.apellido
            response.CreatedAt = persona.createdAt
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

}