import {Entity, ObjectID, ObjectIdColumn, Column} from "typeorm";

import Image from './Image';

@Entity('orphanages')
export default class Orphanage {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  about: string;

  @Column()
  instructions: string;

  @Column()
  opening_hours: string;

  @Column()
  open_on_weekends: boolean;

  @Column(type => Image)
  images: Image[];

  @Column()
  is_pending: boolean;

  @Column()
  whatsapp: string;
}
