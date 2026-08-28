import 'dotenv/config';
import pg from 'pg';
const configured=['DB_HOST','DB_PORT','DB_USER','DB_PASSWORD','DB_NAME'].every(key=>process.env[key]);
export const pool=configured?new pg.Pool({host:process.env.DB_HOST,port:Number(process.env.DB_PORT),user:process.env.DB_USER,password:process.env.DB_PASSWORD,database:process.env.DB_NAME,connectionTimeoutMillis:10_000,idleTimeoutMillis:30_000,max:10}):null;
export async function query(text,params=[]){if(!pool)throw Object.assign(new Error('PostgreSQL is not configured with DB_* variables.'),{status:503});return pool.query(text,params)}
export async function testConnection(){if(!pool)return{connected:false,type:'configuration',message:'DB_* configuration is incomplete'};try{await pool.query('SELECT NOW()');return{connected:true}}catch(error){const code=error.code;const type=code==='28P01'?'authentication':code==='3D000'?'database_not_found':code==='42501'?'permission':code==='ECONNREFUSED'?'connection_refused':code==='ENOTFOUND'?'dns_network':/timeout/i.test(error.message)?'connection_timeout':'connection_error';return{connected:false,type,message:error.message,code}}}
