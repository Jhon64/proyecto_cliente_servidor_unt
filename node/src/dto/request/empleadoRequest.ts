import { PersonaRequest } from "./personaRequest"
export class EmpleadoRequest extends PersonaRequest {
      tipoEmpleado!: string
      idEmpleado!: number
      areaId!: number
      negocio!: number
}