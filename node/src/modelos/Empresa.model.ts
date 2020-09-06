import { EmpresaResponse } from '../dto/response/empresaResponse';
import typeorm, { getRepository } from "typeorm"
import { Empresa } from '../entidades/Empresa';
import { Propietario } from '../entidades/Propietario';
import { PropietarioResponse } from '../dto/response/propietarioResponse';
import { PersonaResponse } from '../dto/response/personaResponse';


export class EmpresaModel {
    async registrar(empresa: Empresa): Promise<EmpresaResponse> {

        let resultEmpresa: Empresa = await getRepository(Empresa).save(empresa)
        console.log(resultEmpresa)
        if (resultEmpresa) {
            let empresaResponse = new EmpresaResponse();
            empresaResponse.IdEmpresa = resultEmpresa.id;
            empresaResponse.RazonSocial = resultEmpresa.razonSocial;
            empresaResponse.Ruc = resultEmpresa.ruc;
            empresaResponse.Direccion = resultEmpresa.direccion;
            empresaResponse.Correo = resultEmpresa.correo;
            empresaResponse.Telefono = resultEmpresa.telefono;
            return empresaResponse
        } else {
            throw new Error("no se pudo registrar empresa")
        }

    }
    async eliminar(id: number): Promise<typeorm.DeleteResult> {
        return await getRepository(Empresa).delete({ id: id })
    }

    async buscarId(id: number) {
        return await getRepository(Empresa).findOne({ id: id }, { relations: ["propietario"] })

    }

    async listarEmpresas(): Promise<Array<EmpresaResponse>> {
        let lista: Array<Empresa> = await getRepository(Empresa).find({ order: { id: "ASC" }, relations: ["propietario", "propietario.persona"] })
        console.log(lista)
        let result = lista.map((empresa: Empresa, index) => {
            let response = new EmpresaResponse()
            let propietario = new PropietarioResponse()
            let personaResponse = new PersonaResponse()
            response.Index = index + 1
            response.IdEmpresa = empresa.id;
            response.RazonSocial = empresa.razonSocial;
            response.Ruc = empresa.ruc;
            response.Direccion = empresa.direccion;
            response.Telefono = empresa.telefono;
            response.Correo = empresa.correo;
            propietario.IdPropietario = empresa.propietario.id
            propietario.Nombre = empresa.propietario.persona.nombre
            propietario.Apellido = empresa.propietario.persona.apellido
            response.Propietario = propietario
            return response;
        })
        return result;
    }

    async bucarRuc(ruc: string) {
        let result = await getRepository(Empresa).find({ where: { ruc } })
        console.log(result)
        if (result !== undefined) {
            return result
        } else {
            throw new Error("no se encontró información")
        }
    }

    async actualizar(empresa: Empresa, id: number) {
        console.log(empresa)
        let resultPersona = await getRepository(Empresa).update({ id }, empresa)
        console.log(resultPersona)
        if (resultPersona) {
            return resultPersona
        } else {
            throw new Error("no se pudo actualizar empresa")
        }

    }

}