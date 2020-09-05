import { PersonaRequest } from "./personaRequest"
export class EmpleadoRequest extends PersonaRequest {
      tipoEmpleado!: string
      areaId!: number
      negocio!: number
}