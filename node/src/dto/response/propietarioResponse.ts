import { PersonaResponse } from "./personaResponse"
import { UsuarioResponse } from "./usuarioResponse"
import { EmpresaResponse } from './empresaResponse';

export class PropietarioResponse extends PersonaResponse {
      Index!: number
      TipoComercial!: string
      Usuario!: UsuarioResponse
      Empresas!: Array<EmpresaResponse>
      IdPropietario!: number

}