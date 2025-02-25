import knex from 'knex';
import dotenv from "dotenv";
dotenv.config();

const connection = knex({
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    },
    pool: { min: 1, max: 10 }
});

export default connection;