import { PropietarioResponse } from '../dto/response/propietarioResponse';

import typeorm, { getRepository } from "typeorm"
import { Propietario } from '../entidades/Propietario';
import { Persona } from '../entidades/Persona';
import { ServicioEmpresa } from '../entidades/ServicioEmpresa';


export class EmpresaServicioModel {


    async registrar(empresaServicio: ServicioEmpresa): Promise<ServicioEmpresa> {
        let result: ServicioEmpresa = await getRepository(ServicioEmpresa).save(empresaServicio)
        if (result) {
            return result
        } else {
            throw new Error("no se pudo registrar propietario")
        }

    }
    async eliminar(id: number): Promise<typeorm.DeleteResult> {
        return await getRepository(Propietario).delete({ id: id })
    }

    async listar(): Promise<Array<ServicioEmpresa>> {
        let lista: Array<ServicioEmpresa> = await getRepository(ServicioEmpresa).find()
        let result = lista.map((item: ServicioEmpresa, index) => {
            //@ts-ignore
            item.Index = index + 1
            return item

        })
        return result;
    }

    async listarCatalogo(empresaId: number, servicioId: number): Promise<Array<ServicioEmpresa>> {
        let lista: Array<ServicioEmpresa> = await getRepository(ServicioEmpresa).find({
            relations: ["empresa", "servicio"], where: {
                empresa: { id: empresaId },
                servicio: { idServicio: servicioId }
            }
        })
        let result = lista.map((item: ServicioEmpresa, index) => {
            //@ts-ignore
            item.Index = index + 1
            return item

        })
        return result;
    }

    async buscar(id: number) {
        let result = getRepository(Propietario).findOne({ id }, { relations: ["persona"] })
        if (result !== undefined) {
            return result
        } else {
            throw new Error("no se encontro información")
        }
    }

    async actualizar(empresaServicio: ServicioEmpresa, id: number) {
        let resultEmpresaServicio = await getRepository(ServicioEmpresa).update({ idServicioEmpresa: id }, empresaServicio)
        if (resultEmpresaServicio) {
            return resultEmpresaServicio
        } else {
            throw new Error("no se pudo actualizar persona")
        }
    }
}