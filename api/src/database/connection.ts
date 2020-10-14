import { createConnection } from 'typeorm';
// console.log(process.env.MONGODB_URI)
// createConnection({
//   type: "mongodb",
//   url: process.env.MONGODB_URI,
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
//   synchronize: true,
//   migrations: ["./migrations/*.ts"],
//   entities: ["../../models/*.ts"],
//   cli: {
//     "migrationsDir": "./migrations"
//   }
// });


createConnection();