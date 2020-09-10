import { PropietarioModel } from '../modelos/Propietario.model';
import { PropietarioRequest } from '../dto/request/propietarioRequest';
import { Propietario } from '../entidades/Propietario';
import { Persona } from '../entidades/Persona';
import { Empresa } from '../entidades/Empresa';
import { ServicioModel } from '../modelos/Servicio.model';
import { ServicioRequest } from '../dto/request/servicioRequest';
import { Servicio } from '../entidades/Servicios';


export class ServicioControl {
    private model: ServicioModel
    constructor() {
        this.model = new ServicioModel()
    }
    async listar() {
        let result = await this.model.listar()
        return result;
    }

    async registrar(request: ServicioRequest) {

        let servicio = new Servicio()
        if (request.nombre != undefined) servicio.nombre = request.nombre;
        if (request.descripcion != undefined) servicio.descripcion = request.descripcion;
        if (request.estado != undefined) servicio.estado = request.estado;
        if (request.precio != undefined) servicio.precio = request.precio;
        if (request.tiempo != undefined) servicio.tiempo = request.tiempo;
        if (request.tipoSexo != undefined) servicio.tipoSexo = request.tipoSexo;

        let result = await this.model.registrar(servicio)
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

    async actualizar(request: ServicioRequest, id: number) {

        let servicio = new Servicio()
        if (request.nombre !== undefined) servicio.nombre = request.nombre
        if (request.descripcion !== undefined) servicio.descripcion = request.descripcion
        if (request.tipoSexo !== undefined) servicio.tipoSexo = request.tipoSexo
        if (request.tiempo !== undefined) servicio.tiempo = request.tiempo
        if (request.precio !== undefined) servicio.precio = request.precio
        let result = await this.model.actualizar(servicio, id)

        return result
    }
}