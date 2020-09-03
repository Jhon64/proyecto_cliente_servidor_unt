import { PropietarioResponse } from '../dto/response/propietarioResponse';

import typeorm, { getRepository } from "typeorm"
import { Propietario } from '../entidades/Propietario';
import { Persona } from '../entidades/Persona';


export class PropietarioModel {
    async registrar(propietario: Propietario): Promise<PropietarioResponse> {
        let resultPersona = await getRepository(Persona).save(propietario.persona)

        propietario.persona = resultPersona
        let result: Propietario = await getRepository(Propietario).save(propietario)
        if (result) {
            let propetarioResponse = new PropietarioResponse();
            propetarioResponse.IdPersona = result.persona.id;
            propetarioResponse.IdPropietario = result.id;
            propetarioResponse.Nombre = result.persona.nombre;
            propetarioResponse.Apellido = result.persona.apellido;
            propetarioResponse.Correo = result.persona.correo;
            propetarioResponse.Celular = result.persona.celular;
            propetarioResponse.Estado = result.persona.estado;
            propetarioResponse.FechaNacimiento = result.persona.fechaNacimiento;
            propetarioResponse.TipoComercial = result.tipoComercial;
            propetarioResponse.CreatedAt = result.persona.createdAt;
            return propetarioResponse
        } else {
            throw new Error("no se pudo registrar propietario")
        }

    }
    async eliminar(id: number): Promise<typeorm.DeleteResult> {
        return await getRepository(Propietario).delete({ id: id })
    }

    async listarPropietarios(): Promise<Array<PropietarioResponse>> {
        let lista: Array<Propietario> = await getRepository(Propietario).find({ order: { id: "ASC" }, relations: ["persona"] })
        let result = lista.map((propietario: Propietario, index) => {
            let propetarioResponse = new PropietarioResponse();
            propetarioResponse.Index = index + 1
            propetarioResponse.IdPersona = propietario.persona.id;
            propetarioResponse.IdPropietario = propietario.id;
            propetarioResponse.Nombre = propietario.persona.nombre;
            propetarioResponse.Apellido = propietario.persona.apellido;
            propetarioResponse.Correo = propietario.persona.correo;
            propetarioResponse.Celular = propietario.persona.celular;
            propetarioResponse.Estado = propietario.persona.estado;
            propetarioResponse.FechaNacimiento = propietario.persona.fechaNacimiento;
            propetarioResponse.TipoComercial = propietario.tipoComercial;
            propetarioResponse.CreatedAt = propietario.persona.createdAt;
            return propetarioResponse

        })
        return result;
    }

}