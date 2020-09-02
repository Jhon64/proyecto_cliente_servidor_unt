import typeorm, { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, Table, UpdateDateColumn } from "typeorm"

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    usuario!: string

    @Column()
    clave!: string

    @Column()
    rol!: number

    @CreateDateColumn()
    createdAt!: string

    @UpdateDateColumn()
    updatedAt!: string
}