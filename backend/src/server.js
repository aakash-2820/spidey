import dotenv from 'dotenv';
dotenv.config();
import { app } from './app.js';
import { testConnection } from './config/database.js';
const port=Number(process.env.PORT||5000);
app.listen(port,async()=>{console.log(`TravelMind API ready on http://localhost:${port}`);const result=await testConnection();if(result.connected)console.log('PostgreSQL connected successfully');else console.error(`PostgreSQL connection failed [${result.type}]: ${result.message}`)});
