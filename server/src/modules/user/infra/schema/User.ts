import { Entity, ObjectIdColumn, Column, ManyToOne } from 'typeorm';
import { Company } from '@company/infra/schema/Company';
import { ObjectId } from 'mongodb';

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
  company_id: string;

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

  @Column()
  refresh_token?: string;

  @ManyToOne(() => Company, company => company.users)
  company?: Company;
}