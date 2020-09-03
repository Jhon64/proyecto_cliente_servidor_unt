import { PropietarioResponse } from "./propietarioResponse"

export class EmpresaResponse {
    Index!: number
    IdEmpresa!: number
    RazonSocial!: string
    Ruc!: string
    Direccion!: string
    Telefono!: string
    TipoNegocio!: string
    PropietarioId!: number
    Propietario!: PropietarioResponse
}