import typeorm, { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, Table, UpdateDateColumn, JoinColumn, OneToOne, OneToMany } from "typeorm"
import { Persona } from "./Persona"
import { Reservacion } from './Reservacion';
@Entity()
export class Cliente {
    @PrimaryGeneratedColumn()
    idCliente!: number

    @OneToOne(type => Persona, { onDelete: "CASCADE" })
    @JoinColumn()
    persona!: Persona;

    @Column({ default: 1 })
    estado!: number

    @OneToMany(type => Reservacion, reservacion => reservacion.cliente)
    reservacion!: Reservacion[]

}