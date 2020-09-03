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
        if (request.tipoComercial != undefined) propietario.tipoComercial = request.tipoComercial;
        propietario.persona = persona
        if (request.empresas != undefined) { }
        let result = await this.model.registrar(propietario)
        return result;


    }

    async eliminar(id: number) {


    }
}