import "../repository/typeorm/database/connection"
import express, { Express } from "express";
import { router } from "./routes";

export const app: Express = express()

app.use(express.json())

app.use('/api', router)