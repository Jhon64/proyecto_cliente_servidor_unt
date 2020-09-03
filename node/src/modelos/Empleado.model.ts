import { EmpleadoResponse } from '../dto/response/empleadoResponse';

import typeorm, { getRepository } from "typeorm"
import { Empleado } from '../entidades/Empleado';


export class EmpleadoModel {
   
    
    async listarEmpleados(): Promise<Array<EmpleadoResponse>> {
        let lista: Array<Empleado> = await getRepository(Empleado).find( )
        let result = lista.map((empleado: Empleado, index) => {
            let response = new EmpleadoResponse()
            response.Index = index + 1
            response.IdEmpleado = empleado.idEmpleado
            response.Nombre = empleado.persona.nombre
            response.Apellido = empleado.persona.apellido
            response.CreatedAt = empleado.persona.createdAt
            return response;
        })
        return result;
    }

}