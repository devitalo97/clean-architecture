import "reflect-metadata"
import dotenv from 'dotenv'
import { app } from "./app"

dotenv.config()

const port:Number = Number(process.env.API_PORT)

app.listen(port, () => {
    console.log(`SERVER LISTEN PORT ${port}`)
})