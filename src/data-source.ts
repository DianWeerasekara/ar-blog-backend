import { DataSource } from "typeorm";
import { User } from "./entity/userEntity";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "ar_blog",
    synchronize: true,
    logging: false,
    entities: [User]
})