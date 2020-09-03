import typeorm, { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, Table, UpdateDateColumn, JoinColumn, OneToOne, ManyToOne } from "typeorm"
import { Persona } from "./Persona"
import { Propietario } from "./Propietario"
@Entity()
export class Empresa {

    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(type => Propietario, propietario => propietario.empresas)
    propietario!: Propietario;

    @Column()
    razonSocial!: string

    @Column()
    ruc!: string

    @Column()
    direccion!: string

    @Column()
    telefono!: string

    @Column()
    tipoNegocio!: string
}