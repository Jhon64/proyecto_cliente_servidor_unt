import typeorm, { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, Table, UpdateDateColumn } from "typeorm"

@Entity()
export class Persona {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    nombre!: string

    @Column()
    apellido!: string

    @Column()
    fechaNacimiento!: string

    @Column({ nullable: true })
    correo!: string

    @Column({ nullable: true })
    tipo!: string

    @Column({ nullable: true })
    celular!: string

    @Column({ length: 8 })
    dni!: string

    @Column({ default: 1 })
    estado!: number

    @CreateDateColumn()
    createdAt!: string

    @UpdateDateColumn()
    updatedAt!: string


}