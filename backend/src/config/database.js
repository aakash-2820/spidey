import pg from 'pg';
export const pool=process.env.DATABASE_URL?new pg.Pool({connectionString:process.env.DATABASE_URL}):null;
export async function query(text,params=[]){if(!pool)throw Object.assign(new Error('Database is not configured. Demo mode remains available.'),{status:503});return pool.query(text,params)}
