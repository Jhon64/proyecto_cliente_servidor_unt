import { ReservacionModel } from '../modelos/Reservacion.model';
import { ReservacionRequest } from '../dto/request/reservacionRequest';
import { Reservacion } from '../entidades/Reservacion';
import { Cliente } from '../entidades/Cliente';
import { Usuario } from '../entidades/Usuario';
import { ServicioEmpresa } from '../entidades/ServicioEmpresa';



export class ReservacionControl {
    private model: ReservacionModel
    constructor() {
        this.model = new ReservacionModel()
    }
    async listar() {
        let result = await this.model.listar()
        return result;
    }




    async registrar(request: ReservacionRequest) {

        let servicio = new Reservacion()
        if (request.idUsuario != undefined) {
            let cliente: Cliente = await this.model.buscarCliente(request.idUsuario)
            servicio.cliente = cliente
        }
        if (request.fechaReservacion != undefined) servicio.fechaReservacion = request.fechaReservacion
        if (request.listCarrito != undefined) {
            let servicios: ServicioEmpresa[] = []
            let listaRequest: ServicioEmpresa[] = request.listCarrito;
            servicios = listaRequest.map(item => {
                let itemServicio = new ServicioEmpresa()
                itemServicio.idServicioEmpresa = item.idServicioEmpresa
                return itemServicio

            })
            servicio.servicioEmpresa = servicios


        }
        let result = await this.model.registrar(servicio)
        console.log(result)
        return result
    }

    async eliminar(id: number) {
        let result = this.model.eliminar(id)
        return result
    }


}