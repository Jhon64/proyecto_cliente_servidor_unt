import { Persona } from '../../entidades/Persona';
export class UsuarioResponse {
    Index!: number
    Id!: number
    Usuario!: string
    Clave!: string
    Rol!: number
    Persona!: Persona
}