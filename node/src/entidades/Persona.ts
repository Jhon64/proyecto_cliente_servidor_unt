import typeorm, { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, Table, UpdateDateColumn } from "typeorm"

@Entity()
export class Persona {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    nombre!: string

    @Column()
    apellido!: string

    @CreateDateColumn()
    createdAt!: string

    @UpdateDateColumn()
    updatedAt!: string
}