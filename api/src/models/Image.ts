import {Column} from "typeorm";

export default class Image {

  @Column()
  path: string;

  constructor(path: string) {
    this.path = path;
  }

}
