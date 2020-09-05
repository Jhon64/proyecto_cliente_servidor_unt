import { EmpleadoResponse } from '../dto/response/empleadoResponse';

import typeorm, { DeleteResult, getRepository, UpdateResult } from "typeorm"
import { Empleado } from '../entidades/Empleado';
import { Persona } from '../entidades/Persona';


export class EmpleadoModel {


    async listarEmpleados(): Promise<Array<EmpleadoResponse>> {
        let lista: Array<Empleado> = await getRepository(Empleado).find({ relations: ["persona"] })
        console.log(lista)
        let result = lista.map((empleado: Empleado, index) => {

            let response = new EmpleadoResponse()
            response.Index = index + 1
            response.IdEmpleado = empleado.idEmpleado
            if (empleado.persona !== null) {
                response.Nombre = empleado.persona.nombre
                response.Apellido = empleado.persona.apellido
                response.Dni = empleado.persona.dni
                response.FechaNacimiento = empleado.persona.fechaNacimiento
                response.Correo = empleado.persona.correo
                response.Celular = empleado.persona.celular
                response.Tipo = empleado.persona.tipo
                response.CreatedAt = empleado.persona.createdAt

            }
            return response;
        })
        return result;
    }

    async registrarEmpleado(empleado: Empleado): Promise<EmpleadoResponse> {
        let resultPersona = await getRepository(Persona).save(empleado.persona)

        if (resultPersona) {
            empleado.persona = resultPersona

            let resultEmpleado: Empleado = await getRepository(Empleado).save(empleado)

            console.log(resultEmpleado)
            if (resultEmpleado) {
                let responseEmpleado = new EmpleadoResponse()
                responseEmpleado.IdEmpleado = resultEmpleado.idEmpleado
                responseEmpleado.Dni = resultEmpleado.persona.dni
                responseEmpleado.Nombre = resultEmpleado.persona.nombre
                responseEmpleado.Apellido = resultEmpleado.persona.apellido
                responseEmpleado.FechaNacimiento = resultEmpleado.persona.fechaNacimiento
                responseEmpleado.Estado = resultEmpleado.persona.estado
                responseEmpleado.Correo = resultEmpleado.persona.correo
                responseEmpleado.Celular = resultEmpleado.persona.celular
                responseEmpleado.Tipo = resultEmpleado.persona.tipo
                return responseEmpleado;
            } else {
                console.log("no se pudo registrar empleado")
                let eliminarPersona = await getRepository(Persona).delete({ id: resultPersona.id })
                throw new Error("No se pudo registrar empleado")
            }
        } else {
            throw new Error("No se pudo registrar empleado")
        }
    }
    async eliminar(id: number): Promise<DeleteResult> {
        let result = await getRepository(Empleado).delete({ idEmpleado: id })
        return result;

    }

    async buscar(id: number) {
        let result: Empleado | undefined = await getRepository(Empleado).findOne({ idEmpleado: id }, { relations: ["persona"] })
        if (result !== undefined) {
            let responseEmpleado = new EmpleadoResponse()
            responseEmpleado.IdEmpleado = result.idEmpleado
            responseEmpleado.IdPersona = result.persona.id
            responseEmpleado.Dni = result.persona.dni
            responseEmpleado.Nombre = result.persona.nombre
            responseEmpleado.Apellido = result.persona.apellido
            responseEmpleado.FechaNacimiento = result.persona.fechaNacimiento
            responseEmpleado.Estado = result.persona.estado
            responseEmpleado.Correo = result.persona.correo
            responseEmpleado.Celular = result.persona.celular
            responseEmpleado.Tipo = result.persona.tipo
            return responseEmpleado;
        } else {
            throw new Error("No se encontró empleado")
        }
    }

    async actualizarEmpleado(empleado: Empleado, idEmpleado: number) {
        let persona = new Persona();
        persona = empleado.persona;
        let resultPersona: UpdateResult = await getRepository(Persona).update({ id: persona.id }, persona)

        if (resultPersona) {
            let resultEmpleado: UpdateResult = await getRepository(Empleado).update(idEmpleado, empleado)
            console.log(resultEmpleado)
            if (resultEmpleado) {
                return resultEmpleado;
            } else {
                throw new Error("No se pudo ractualizar empleado")
            }
        } else {
            throw new Error("No se pudo actualizar empleado")
        }
    }
}