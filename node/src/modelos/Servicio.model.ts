import { PropietarioResponse } from '../dto/response/propietarioResponse';

import typeorm, { getRepository } from "typeorm"
import { Propietario } from '../entidades/Propietario';
import { Persona } from '../entidades/Persona';
import { Servicio } from '../entidades/Servicios';


export class ServicioModel {
    async registrar(servicio: Servicio): Promise<Servicio> {
        let resultPersona = await getRepository(Servicio).save(servicio)
        if (resultPersona) {
            return resultPersona
        } else {
            throw new Error("no se pudo registrar servicio")
        }

    }
    async eliminar(id: number): Promise<typeorm.DeleteResult> {
        return await getRepository(Servicio).delete({ idServicio: id })
    }

    async listar() {
        let lista: Array<Servicio> = await getRepository(Servicio).find({ order: { idServicio: "ASC" } })
        let result = lista.map((item: Servicio, index) => {
            //@ts-ignore
            item.Index = index + 1
            return item
        })
        console.log(result)
        return result;
    }

    async buscar(id: number) {
        let result = await getRepository(Servicio).findOne({ idServicio: id })
        if (result !== undefined) {
            return result
        } else {
            throw new Error("no se encontro información")
        }
    }

    async actualizar(servicio: Servicio, id: number) {
        let resultServicio = await getRepository(Servicio).update({ idServicio: id }, servicio)
        if (resultServicio) {
            return resultServicio
        } else {
            throw new Error("no se pudo actualizar propietario")
        }

    }

}