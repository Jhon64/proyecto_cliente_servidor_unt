import { EmpleadoModel } from '../modelos/Empleado.model';
import { EmpleadoRequest } from '../dto/request/empleadoRequest';
import { Empleado } from '../entidades/Empleado';


export class EmpleadoControl {
    private model: EmpleadoModel
    constructor() {
        this.model = new EmpleadoModel()
    }
    async listarEmpleados() {
        let result = await this.model.listarEmpleados()
        return result;
    }

    async registrar(request: EmpleadoRequest) {
       

    }

    async eliminar(id: number) {
       

    }
}