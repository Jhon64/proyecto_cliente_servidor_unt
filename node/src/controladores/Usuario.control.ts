import { UsuarioModel } from "../modelos/usuario.model";
import { Usuario } from '../entidades/Usuario';
import { UsuarioRequest } from "../dto/request/usuarioRequest";
import jwt_token from "../middleware/jwt-token"
import { PersonaRequest } from '../dto/request/personaRequest';
import { Persona } from '../entidades/Persona';

export class UsuarioControl {
    private model: UsuarioModel
    constructor() {
        this.model = new UsuarioModel()
    }
    async listarPersonas() {
        let result = await this.model.listar()
        return result;
    }

    async buscar(request: UsuarioRequest) {
        let usuario = new Usuario()
        if (request.usuario != null) usuario.usuario = request.usuario;
        if (request.clave != null) usuario.clave = request.clave;
        let result = await this.model.buscar(usuario);
        return result
    }

    async registrar(request: UsuarioRequest) {
        let usuario = new Usuario()
        if (request.usuario != null) usuario.usuario = request.usuario;
        if (request.clave != null) usuario.clave = request.clave;
        if (request.rol != null) usuario.rol = request.rol;
        let result = await this.model.registrar(usuario)
        return result;

    }

    async eliminar(id: number) {
        let result = await this.model.eliminar(id)
        return result;

    }

    async verificarCredenciales(request: UsuarioRequest) {
        let usuario = new Usuario()
        if (request.usuario != null) usuario.usuario = request.usuario;
        if (request.clave != null) usuario.clave = request.clave;
        let result = await this.model.verificarCredenciales(usuario);
        //@ts-ignore
        if (result.verificado) {
            //@ts-ignore
            console.log(result.usuario);
            let payload = {
                //@ts-ignore
                usuario: result.usuario.usuario,
                //@ts-ignore
                clave: result.usuario.clave
            }
            let token = jwt_token.generarToken(payload);
            //@ts-ignore
            result.token = token
            return result
        } else {
            return result
        }

    }

    async crearUsuario(personaRequest: PersonaRequest, usuarioRequest: UsuarioRequest) {

        let persona: Persona = new Persona();
        let usuario: Usuario = new Usuario();
        if (usuarioRequest.usuario != null) usuario.usuario = usuarioRequest.usuario;
        if (usuarioRequest.clave != null) usuario.clave = usuarioRequest.clave;
        if (usuarioRequest.rol != null) usuario.rol = usuarioRequest.rol;
        if (personaRequest.nombre != null) persona.nombre = personaRequest.nombre
        if (personaRequest.apellido != null) persona.apellido = personaRequest.apellido
        if (personaRequest.correo != null) persona.correo = personaRequest.correo
        if (personaRequest.fechaNacimiento != null) persona.fechaNacimiento = personaRequest.fechaNacimiento

        let result = await this.model.crearUsuario(persona, usuario);
        return result;

    }
}