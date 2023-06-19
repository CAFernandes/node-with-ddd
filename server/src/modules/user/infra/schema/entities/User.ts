import { Entity, ObjectIdColumn, Column, ManyToOne } from 'typeorm';
import { Company } from '@company/infra/schema/entities/Company';
import { ObjectId } from 'mongodb';
// import { v4 } from 'uuid';


@Entity('users')
export class User {
  constructor(props: Omit<User, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this._id = new ObjectId();
    }
  }

  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  company_id: ObjectId;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  created_at?: Date;

  @Column()
  update_at?: Date;

  @ManyToOne(() => Company, company => company.users)
  company?: Company;
}
