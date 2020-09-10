import { PropietarioModel } from '../modelos/Propietario.model';
import { PropietarioRequest } from '../dto/request/propietarioRequest';
import { Propietario } from '../entidades/Propietario';
import { Persona } from '../entidades/Persona';
import { Empresa } from '../entidades/Empresa';
import { EmpresaServicioModel } from '../modelos/EmpresaServicio.model';
import { EmpresaServicioRequest } from '../dto/request/empresaServicioRequest';
import { ServicioEmpresa } from '../entidades/ServicioEmpresa';
import { Servicio } from '../entidades/Servicios';


export class EmpresaServicioControl {
    private model: EmpresaServicioModel
    constructor() {
        this.model = new EmpresaServicioModel()
    }
    async listar() {
        let result = await this.model.listar()
        return result;
    }

    async listarCatalogo(empresaId: number, servicioId: number) {
        let result = await this.model.listarCatalogo(empresaId, servicioId)
        return result;
    }

    async registrar(request: EmpresaServicioRequest) {
        let empresaServicio = new ServicioEmpresa()
        if (request.tiempo != undefined) empresaServicio.tiempo = request.tiempo;
        if (request.precio != undefined) empresaServicio.precio = request.precio;
        if (request.descripcion != undefined) empresaServicio.descripcion = request.descripcion;
        if (request.imagen != undefined) empresaServicio.imagenServicio = request.imagen;
        if (request.idEmpresa != undefined) {
            let empresa = new Empresa()
            empresa.id = request.idEmpresa
            empresaServicio.empresa = empresa;
        }
        if (request.idServicio != undefined) {
            let servicio = new Servicio()
            servicio.idServicio = request.idServicio;
            empresaServicio.servicio = servicio
        }

        let result = await this.model.registrar(empresaServicio)
        return result;
    }

    async eliminar(id: number) {
        let result = this.model.eliminar(id)
        return result
    }

    async buscar(id: number) {
        let result = this.model.buscar(id)
        return result
    }

    async actualizar(request: EmpresaServicioRequest, id: number) {
        let empresaServicio = new ServicioEmpresa()
        if (request.idEmpresa != undefined) empresaServicio.estado = request.estado;

        let result = await this.model.actualizar(empresaServicio, id)
        console.log(result)
        return result
    }


}