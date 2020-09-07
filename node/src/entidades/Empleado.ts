import typeorm, {
  Column,
  ManyToOne,
  CreateDateColumn,
  Entity, PrimaryColumn, PrimaryGeneratedColumn, Table, UpdateDateColumn, JoinColumn, OneToOne
} from "typeorm"
import { Persona } from "./Persona"

import { Empresa } from './Empresa';
@Entity()
export class Empleado {

  @PrimaryGeneratedColumn()
  idEmpleado!: number

  @OneToOne(type => Persona, { onDelete: "CASCADE" })
  @JoinColumn()
  persona!: Persona;

  @ManyToOne(type => Empresa, empresa => empresa.empleados)
  empresa!: Empresa

  @Column({ nullable: true })
  areaId!: number

  @Column({ length: 15, nullable: true })
  tipoEmpleado!: string
}