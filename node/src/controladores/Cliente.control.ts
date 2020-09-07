import { ClienteModel } from '../modelos/Cliente.model';
import { PersonaRequest } from '../dto/request/personaRequest';
import { Persona } from '../entidades/Persona';
import { UsuarioRequest } from '../dto/request/usuarioRequest';
import { Usuario } from '../entidades/Usuario';
import { UsuarioResponse } from '../dto/response/usuarioResponse';
import jwt_token from "../middleware/jwt-token"

export class ClienteControl {
    private model: ClienteModel
    constructor() {
        this.model = new ClienteModel()
    }
    async listar() {
        let result = await this.model.listar()
        return result;
    }

    async registrar(request: PersonaRequest) {
        let persona = new Persona()
        if (request.nombre != null) persona.nombre = request.nombre;
        if (request.apellido != null) persona.apellido = request.apellido;
        if (request.dni != null) persona.dni = request.dni;
        let result = await this.model.registrar(persona)
        return result;

    }

    async crearUsuario(personaRequest: PersonaRequest, usuarioRequest: UsuarioRequest) {


        let persona: Persona = new Persona();
        let usuario: Usuario = new Usuario();
        if (usuarioRequest.usuario != null) usuario.usuario = usuarioRequest.usuario;
        if (usuarioRequest.clave != null) usuario.clave = usuarioRequest.clave;
        if (personaRequest.nombre != null) persona.nombre = personaRequest.nombre
        if (usuarioRequest.rol != null) usuario.rol = usuarioRequest.rol;
        if (personaRequest.dni != null) persona.dni = personaRequest.dni;
        if (personaRequest.apellido != null) persona.apellido = personaRequest.apellido
        if (personaRequest.correo != null) persona.correo = personaRequest.correo
        if (personaRequest.celular != null) persona.celular = personaRequest.celular
        if (personaRequest.tipo != null) persona.tipo = personaRequest.tipo
        if (personaRequest.fechaNacimiento != null) persona.fechaNacimiento = personaRequest.fechaNacimiento

        let result: UsuarioResponse = await this.model.crearUsuario(persona, usuario);
        console.log(result)
        if (result.Persona.id !== undefined) {
            let payload = {
                //@ts-ignore
                usuario: result.Usuario,
                //@ts-ignore
                clave: result.Clave
            }
            let token = jwt_token.generarToken(payload);
            return { token: token };
        } else {
            throw new Error("No se pudo crear Usuario");
        }
    }


    async eliminar(id: number) {
        let result = await this.model.eliminar(id)
        return result;

    }

    async buscarDni(dni: string) {
        let result = await this.model.buscarDni(dni)
        return result;

    }
}