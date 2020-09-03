import { PersonaRequest } from "./personaRequest"
import { UsuarioRequest } from "./usuarioRequest"
import { EmpresaRequest } from './empresaRequest';
export class PropietarioRequest extends PersonaRequest {
      idPropietario!: number
      tipoComercial!: string
      usuario!: UsuarioRequest
      empresas!: [EmpresaRequest]
}