import { PropietarioModel } from '../modelos/Propietario.model';
import { PropietarioRequest } from '../dto/request/propietarioRequest';
import { Propietario } from '../entidades/Propietario';
import { Persona } from '../entidades/Persona';
import { Empresa } from '../entidades/Empresa';


export class PropietarioControl {
    private model: PropietarioModel
    constructor() {
        this.model = new PropietarioModel()
    }
    async listar() {
        let result = await this.model.listarPropietarios()
        return result;
    }

    async registrar(request: PropietarioRequest) {
        let empeesa = new Empresa()
        let propietario = new Propietario()
        let persona = new Persona()
        if (request.nombre != undefined) persona.nombre = request.nombre;
        if (request.apellido != undefined) persona.apellido = request.apellido;
        if (request.dni != undefined) persona.dni = request.dni;
        if (request.celular != undefined) persona.celular = request.celular;
        if (request.correo != undefined) persona.correo = request.correo;
        if (request.fechaNacimiento != undefined) persona.fechaNacimiento = request.fechaNacimiento;
        if (request.tipo != undefined) persona.tipo = request.tipo;
        propietario.persona = persona
        if (request.empresaId != undefined) { }
        let result = await this.model.registrar(propietario)
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

    async actualizar(request: PropietarioRequest, id: number) {
        let propietario = new Propietario();
        let persona = new Persona()
        if (request.nombre !== undefined) persona.nombre = request.nombre
        if (request.apellido !== undefined) persona.apellido = request.apellido
        if (request.dni !== undefined) persona.dni = request.dni
        if (request.fechaNacimiento !== undefined) persona.fechaNacimiento = request.fechaNacimiento
        if (request.correo !== undefined) persona.correo = request.correo
        if (request.celular !== undefined) persona.celular = request.celular
        if (request.tipo !== undefined) persona.tipo = request.tipo
        if (request.idPersona !== undefined) persona.id = request.idPersona
        persona.estado = 1
        propietario.persona = persona
        console.log(propietario)
        let result = await this.model.actualizar(propietario, id)
        console.log(result)
        return result
    }
}