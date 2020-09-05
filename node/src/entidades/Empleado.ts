import typeorm, { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, Table, UpdateDateColumn, JoinColumn, OneToOne } from "typeorm"
import { Persona } from "./Persona"
@Entity()
export class Empleado {

  @PrimaryGeneratedColumn()
  idEmpleado!: number

  @OneToOne(type => Persona)
  @JoinColumn()
  persona!: Persona;

  @Column({ nullable: true })
  negocio!: number

  @Column({ nullable: true })
  areaId!: number

  @Column({ length: 15 })
  tipoEmpleado!: string
}