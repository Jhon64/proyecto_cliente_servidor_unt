import { UsuarioModel } from "../modelos/usuario.model";
import { Usuario } from '../entidades/Usuario';
import { UsuarioRequest } from "../dto/request/usuarioRequest";
import jwt_token from "../middleware/jwt-token"
import { PersonaRequest } from '../dto/request/personaRequest';
import { Persona } from '../entidades/Persona';
import { UsuarioResponse } from '../dto/response/usuarioResponse';

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
        if (request.idPersona != null) {
            let persona = new Persona()
            persona.id = request.idPersona
            usuario.persona = persona
        }
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
        if (personaRequest.nombre != null) persona.nombre = personaRequest.nombre
        if (usuarioRequest.rol != null) usuario.rol = usuarioRequest.rol;
        if (personaRequest.dni != null) persona.dni = personaRequest.dni;
        if (personaRequest.apellido != null) persona.apellido = personaRequest.apellido
        if (personaRequest.correo != null) persona.correo = personaRequest.correo
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

    async buscarDni(dni: string) {
        let result = await this.model.buscarDni(dni)
        return result;
    }

    async buscarId(id: number) {
        let result = await this.model.usuarioBuscarId(id)
        return result;

    }

    async actualizar(id: number, usuarioRequest: UsuarioRequest) {
        let usuario = new Usuario()
        if (usuarioRequest.rol !== undefined) usuario.rol = usuarioRequest.rol
        let result = await this.model.actualizarUsuario(usuario, id)
        return result;

    }
}