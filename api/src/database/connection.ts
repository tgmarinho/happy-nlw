import { createConnection } from 'typeorm';

import path from 'path'

const extFile = process.env.NODE_ENV == 'prod' ? 'js' : 'ts'

createConnection({
  type: "mongodb",
  url: process.env.MONGODB_URI,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  synchronize: true,
  entities: [path.resolve(__dirname, '..', `models/*.${extFile}`)]
});
