import typeorm, { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, Table, UpdateDateColumn, JoinColumn, OneToOne } from "typeorm"
import { Persona } from "./Persona"
@Entity()
export class Cliente {
    @PrimaryGeneratedColumn()
    idCliente!: number

    @OneToOne(type => Persona, { onDelete: "CASCADE" })
    @JoinColumn()
    persona!: Persona;

    @Column({ default: 1 })
    estado!: number

}