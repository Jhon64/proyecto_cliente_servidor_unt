import { EmpresaResponse } from '../dto/response/empresaResponse';
import typeorm, { getRepository } from "typeorm"
import { Empresa } from '../entidades/Empresa';
import { Propietario } from '../entidades/Propietario';


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
            empresaResponse.Telefono = resultEmpresa.telefono;
            return empresaResponse
        } else {
            throw new Error("no se pudo registrar empresa")
        }

    }
    async eliminar(id: number): Promise<typeorm.DeleteResult> {
        return await getRepository(Empresa).delete({ id: id })
    }

    async listarEmpresas(): Promise<Array<EmpresaResponse>> {
        let lista: Array<Empresa> = await getRepository(Empresa).find({ order: { id: "ASC" }, relations: ["propietario"] })
        let result = lista.map((empresa: Empresa, index) => {
            let response = new EmpresaResponse()
            let propetario = new Propietario()
            response.Index = index + 1
            response.IdEmpresa = empresa.id;
            response.RazonSocial = empresa.razonSocial;
            response.Ruc = empresa.ruc;
            response.Direccion = empresa.direccion;
            response.Telefono = empresa.telefono;
            response.Propietario.IdPropietario = empresa.propietario.id
            response.Propietario.Nombre = empresa.propietario.persona.nombre
            return response;
        })
        return result;
    }

}