import "reflect-metadata"
import { DataSource } from "typeorm"
import CustomerModel from "../customer.model"
import { config } from "../../../../../../config/index"

export const AppDataSource = new DataSource({
    type: "mongodb",
    url: config.MONGO_DATABASE_URL,
    database: config.MONGO_DATABASE_NAME,
    synchronize: true,
    logging: false,
    entities: [CustomerModel],
    migrations: [],
    subscribers: [],
    useUnifiedTopology: true,
})
