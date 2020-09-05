import { EmpleadoModel } from '../modelos/Empleado.model';
import { EmpleadoRequest } from '../dto/request/empleadoRequest';
import { Empleado } from '../entidades/Empleado';
import { Persona } from '../entidades/Persona';


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
        let empleado = new Empleado();
        let persona = new Persona();
        if (request.nombre !== undefined) persona.nombre = request.nombre
        if (request.apellido !== undefined) persona.apellido = request.apellido
        if (request.dni !== undefined) persona.dni = request.dni
        if (request.fechaNacimiento !== undefined) persona.fechaNacimiento = request.fechaNacimiento
        if (request.correo !== undefined) persona.correo = request.correo
        if (request.celular !== undefined) persona.celular = request.celular
        if (request.areaId !== undefined) empleado.areaId = request.areaId || 1
        if (request.tipoEmpleado !== undefined) empleado.tipoEmpleado = request.tipoEmpleado
        persona.estado = 1
        empleado.persona = persona
        console.log(empleado)
        let result = await this.model.registrarEmpleado(empleado)
        console.log(result)
        return result

    }

    async eliminar(id: number) {


    }
}