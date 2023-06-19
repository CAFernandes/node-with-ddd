import { Entity, ObjectIdColumn, Column, ManyToOne, ObjectId } from 'typeorm';
import { Unit } from '@unit/infra/schema/entities/Unit';

@Entity('active')
export class Active {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  image: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  model: string;

  @Column()
  proprietary: string;

  @Column()
  status: string;

  @Column({ type: 'float' })
  healthLevel: number;

  @ManyToOne(() => Unit, unit => unit.active)
  unit: Unit;
}
