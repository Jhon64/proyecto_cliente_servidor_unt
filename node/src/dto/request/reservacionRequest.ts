import { ServicioEmpresa } from '../../entidades/ServicioEmpresa';
export class ReservacionRequest {
    idReservacion!: number
    fechaReservacion!: string
    idUsuario!: number
    listCarrito!: ServicioEmpresa[]
}