import typeorm, { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, Table, UpdateDateColumn, JoinColumn, OneToOne, ManyToOne, OneToMany } from "typeorm"
import { Persona } from "./Persona"
import { Propietario } from "./Propietario"
import { Empleado } from './Empleado';
import { Servicio } from './Servicios';
import { ServicioEmpresa } from './ServicioEmpresa';
@Entity()
export class Empresa {

    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(type => Propietario, propietario => propietario.empresas)
    propietario!: Propietario;

    @OneToMany(type => Empleado, empleado => empleado)
    empleados!: Empleado[]

    @OneToMany(type => ServicioEmpresa, empresaServicio => empresaServicio.empresa)
    empresaServicio!: ServicioEmpresa

    @Column()
    razonSocial!: string

    @Column({ unique: true })
    ruc!: string

    @Column()
    direccion!: string

    @Column()
    telefono!: string

    @Column()
    correo!: string

    @Column({ nullable: true })
    tipoNegocio!: string
}