import { PersonaModel } from '../modelos/Persona.model';
import { PersonaRequest } from '../dto/request/personaRequest';
import { Persona } from '../entidades/Persona';


export class PersonaControl {
    private model: PersonaModel
    constructor() {
        this.model = new PersonaModel()
    }
    async listarPersonas() {
        let result = await this.model.listarPersonas()
        return result;
    }

    async registrar(request: PersonaRequest) {
        let persona = new Persona()
        if (request.nombre != null) persona.nombre = request.nombre;
        if (request.apellido != null) persona.apellido = request.apellido;
        let result = await this.model.registrar(persona)
        return result;

    }

    async eliminar(id: number) {
        let result = await this.model.eliminar(id)
        return result;

    }
}