import typeorm, { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Table, UpdateDateColumn } from "typeorm"
import { Persona } from './Persona';

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    idUsuario!: number

    @Column({ unique: true })
    usuario!: string

    @Column()
    clave!: string

    @Column()
    rol!: number

    @CreateDateColumn()
    createdAt!: string

    @UpdateDateColumn()
    updatedAt!: string

    @OneToOne(type => Persona)
    @JoinColumn()
    persona!: Persona;
}