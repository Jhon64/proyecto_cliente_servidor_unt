
import { EmpresaModel } from '../modelos/Empresa.model';
import { EmpresaRequest } from '../dto/request/EmpresaRequest';
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

        let empresa = new Empresa()
        if (request.razonSocial != null) empresa.razonSocial = request.razonSocial;
        if (request.ruc != null) empresa.ruc = request.ruc;
        if (request.direccion != null) empresa.direccion = request.direccion;
        if (request.telefono != null) empresa.telefono = request.telefono;
        if (request.tipoNegocio != null) empresa.tipoNegocio = request.tipoNegocio;
        if (request.propietario != null) {
            let propietario = new Propietario()
            propietario.id = request.propietario.idPropietario;
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
}