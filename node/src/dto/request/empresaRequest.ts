import { PropietarioRequest } from "./propietarioRequest"
export class EmpresaRequest {
    razonSocial!: string
    ruc!: string
    direccion!: string
    telefono!: string
    correo!: string
    tipoNegocio!: string
    propietario!: PropietarioRequest
    idPropietario!: number

}