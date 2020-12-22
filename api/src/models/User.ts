import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm";


@Entity('users')
export default class User {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  token: string;

}
