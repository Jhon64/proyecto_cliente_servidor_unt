import { DeleteResult } from 'typeorm';
import { PersonaResponse } from '../dto/response/personaResponse';
import { Persona } from '../entidades/Persona';
export interface PersonaRepository {
    listarPersonas(): Promise<Array<PersonaResponse>>;
    registrar(persona: Persona): Promise<PersonaResponse>
    eliminar(id: number): Promise<DeleteResult>
}