import typeorm, { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { Persona } from "./Persona"
import { Empresa } from "./Empresa"

@Entity()
export class Servicio {

    @PrimaryGeneratedColumn()
    idServicio!: number

    @ManyToOne(type => Empresa, empresa => empresa.servicios)
    empresa!: Empresa

    @Column({ nullable: true })
    tipoComercial!: string
}