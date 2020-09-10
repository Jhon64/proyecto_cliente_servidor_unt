import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, ManyToMany, JoinColumn, CreateDateColumn, JoinTable } from "typeorm"
import { Empresa } from "./Empresa"
import { Servicio } from './Servicios';
import { Reservacion } from './Reservacion';


@Entity()
export class ServicioEmpresa {

    @PrimaryGeneratedColumn()
    idServicioEmpresa!: number

    @Column({ default: 1 })
    estado!: number

    @ManyToOne(type => Empresa, empresa => empresa.empresaServicio)
    empresa!: Empresa

    @ManyToOne(type => Servicio, servicio => servicio.servicioEmpresa)
    servicio!: Servicio



    @Column({ nullable: true, type: "float" })
    tiempo!: string

    @Column({ nullable: true })
    descripcion!: string

    @Column({ nullable: true, type: "float" })
    precio!: string

    @Column({ nullable: true })
    imagenServicio!: string


}