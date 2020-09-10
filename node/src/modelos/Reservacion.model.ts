import { Reservacion } from '../entidades/Reservacion';
import { getRepository } from 'typeorm';
import { Cliente } from '../entidades/Cliente';
import { Usuario } from '../entidades/Usuario';
export class ReservacionModel {

    async registrar(reservacion: Reservacion) {
        let newReservacion = new Reservacion()
        newReservacion.servicioEmpresa = reservacion.servicioEmpresa
        newReservacion.fechaReservacion = reservacion.fechaReservacion
        let result = await getRepository(Reservacion).save(newReservacion)
        console.log(result)
        return result


    }

    async listar() {
        let result = await getRepository(Reservacion).find({ relations: ["servicioEmpresa"] })
        return result
    }

    buscar() {

    }

    actualizar() {

    }
    async buscarCliente(idUsuario: number) {
        let buscar = await getRepository(Usuario).findOne({ where: { idUsuario: idUsuario }, relations: ["persona"] })
        if (buscar != undefined) {
            let personaId = buscar.persona.id
            let cliente = await getRepository(Cliente).findOne({ relations: ["persona"], where: { persona: { id: personaId } } })
            if (cliente != undefined) {
                return cliente
            } else {
                throw new Error("cliente no encontrado")
            }

        } else {
            throw new Error("cliente no encontrado")
        }
    }

    eliminar(id: number) {

    }
}