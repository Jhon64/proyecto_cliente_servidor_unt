import { Entity, PrimaryGeneratedColumn, OneToMany, Column, ManyToMany, JoinColumn, CreateDateColumn, JoinTable, Double } from "typeorm"
import { Empresa } from "./Empresa"
import { ServicioEmpresa } from './ServicioEmpresa';



@Entity()
export class Servicio {

    @PrimaryGeneratedColumn()
    idServicio!: number
    @OneToMany(type => ServicioEmpresa, servicioEmpresa => servicioEmpresa.servicio)
    servicioEmpresa!: ServicioEmpresa

    @Column({ nullable: true })
    nombre!: string

    @Column({ default: 1 })
    estado!: number


    @Column({ nullable: true })
    descripcion!: string

    @Column({ nullable: true, type: "float" })
    tiempo!: string

    @Column({ nullable: true })
    tipoSexo!: string

    @Column({ nullable: true, type: "float" })
    precio!: string
    @CreateDateColumn()
    createdAt!: string


}