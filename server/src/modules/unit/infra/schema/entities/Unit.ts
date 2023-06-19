import { Entity, ObjectIdColumn, Column, ManyToOne, OneToMany, ObjectId } from 'typeorm';
import { Company } from '@company/infra/schema/entities/Company';
import { Active } from '@active/infra/schema/entities/Active';

@Entity()
export class Unit {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @ManyToOne(() => Company, company => company.units)
  company: Company;

  @OneToMany(() => Active, active => active.unit)
  active: Active[];
}
