import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

export type Database = ReturnType<typeof drizzle>

let db : Database  = null!

function initialize() {
    const sql = neon(process.env.POSTGRES_URL!);
    db = drizzle(sql);
}


export default () => {
    initialize()
    return ({
        database: db,
    });
}