import dotenv from 'dotenv'
dotenv.config()

export const config = {
    MONGO_DATABASE_URL: process.env.MONGO_DATABASE_URL || '',
    MONGO_DATABASE_NAME: process.env.MONGO_DATABASE_NAME || '',
    API_PORT: process.env.API_PORT || '',
}
