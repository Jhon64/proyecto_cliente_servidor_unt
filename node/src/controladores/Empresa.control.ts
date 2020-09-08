
import { EmpresaModel } from '../modelos/Empresa.model';
import { EmpresaRequest } from '../dto/request/empresaRequest';
import { Empresa } from '../entidades/Empresa';
import { Propietario } from '../entidades/Propietario';


export class EmpresaControl {
    private model: EmpresaModel
    constructor() {
        this.model = new EmpresaModel()
    }
    async listarEmpresas() {
        let result = await this.model.listarEmpresas()
        return result;
    }

    async registrar(request: EmpresaRequest) {
        console.log(request)
        let empresa = new Empresa()
        if (request.razonSocial != null) empresa.razonSocial = request.razonSocial;
        if (request.ruc != null) empresa.ruc = request.ruc;
        if (request.direccion != null) empresa.direccion = request.direccion;
        if (request.telefono != null) empresa.telefono = request.telefono;
        if (request.correo != null) empresa.correo = request.correo;
        if (request.tipoNegocio != null) empresa.tipoNegocio = request.tipoNegocio;
        if (request.idPropietario != null) {
            let propietario = new Propietario()
            propietario.id = request.idPropietario;
            empresa.propietario = propietario
        }

        let result = await this.model.registrar(empresa)
        console.log(result)
        return result;

    }

    async eliminar(id: number) {
        let result = await this.model.eliminar(id)
        return result;
    }

    async buscarRuc(ruc: string) {
        let result = await this.model.bucarRuc(ruc)
        return result
    }

    async buscar(id: number) {
        let result = await this.model.buscarId(id)
        return result
    }


    async actualizar(request: EmpresaRequest, id: number) {
        let empresa = new Empresa();
        let propietario = new Propietario()
        if (request.razonSocial !== undefined) empresa.razonSocial = request.razonSocial
        if (request.ruc !== undefined) empresa.ruc = request.ruc
        if (request.telefono !== undefined) empresa.telefono = request.telefono
        if (request.correo !== undefined) empresa.correo = request.correo

        if (request.direccion !== undefined) empresa.direccion = request.direccion
        if (request.idPropietario !== undefined) {
            propietario.id = request.idPropietario;
            empresa.propietario = propietario
        }
        let result = await this.model.actualizar(empresa, id)
        console.log(result)
        return result
    }
}