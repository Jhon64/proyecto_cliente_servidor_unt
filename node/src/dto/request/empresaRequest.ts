import { PropietarioRequest } from "./propietarioRequest"
export class EmpresaRequest {
    razonSocial!: string
    ruc!: string
    direccion!: string
    telefono!: string
    tipoNegocio!: string
    propietario!: PropietarioRequest
}