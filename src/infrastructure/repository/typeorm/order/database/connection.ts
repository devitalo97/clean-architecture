import { AppDataSource } from "./data-source";

AppDataSource.initialize()
    .then((res) => console.log('DB CONECTED'))
    .catch((e) => console.log('ERROR IN DB CONECTED'))