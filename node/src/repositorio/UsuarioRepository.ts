import { UsuarioResponse } from "../dto/response/usuarioResponse";
import { Usuario } from '../entidades/Usuario';
import { DeleteResult } from 'typeorm';

export interface UsuarioRepository {
    listar(): Promise<Array<UsuarioResponse>>;
    registrar(usuario: Usuario): Promise<UsuarioResponse>
    eliminar(id: number): Promise<DeleteResult>
    buscar(usuario: Usuario): Promise<Boolean>
    verificarCredenciales(usuario: Usuario): Promise<Object>
}