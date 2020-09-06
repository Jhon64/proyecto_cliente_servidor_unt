import { Persona } from '../../entidades/Persona';
export class UsuarioResponse {
    Index!: number
    IdUsuario!: number
    Usuario!: string
    Clave!: string
    Rol!: number
    Persona!: Persona
}