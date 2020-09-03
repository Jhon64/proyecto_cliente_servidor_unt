import typeorm, { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, Table, UpdateDateColumn, JoinColumn, OneToOne, OneToMany } from "typeorm"
import { Persona } from "./Persona"
import { Empresa } from "./Empresa"
@Entity()
export class Propietario {

  @PrimaryGeneratedColumn()
  id!: number

  @OneToOne(type => Persona)
  @JoinColumn()
  persona!: Persona;

  @OneToMany(type => Empresa, empresa => empresa.propietario)
  empresas!: []

  @Column()
  tipoComercial!: string
}