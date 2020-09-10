import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { ServicioEmpresa } from './ServicioEmpresa';
import { Cliente } from './Cliente';

@Entity()
export class Reservacion {

    @PrimaryGeneratedColumn()
    idReservacion!: number

    @Column({ default: 1 })
    estado!: number

    @Column({ nullable: true })
    fechaReservacion!: string

    @ManyToOne(type => Cliente, cliente => cliente.reservacion)
    cliente!: Cliente

    @ManyToMany(type => ServicioEmpresa)
    @JoinTable()
    servicioEmpresa!: ServicioEmpresa[]


}