import dotenv from 'dotenv';
dotenv.config();
import { app } from './app.js';
import { testConnection } from './config/database.js';
const port=5000;
app.listen(port,async()=>{console.log(`TravelMind API ready on http://localhost:${port}`);console.log(`Google Places configured: ${Boolean(process.env.GOOGLE_MAPS_API_KEY)}`);const result=await testConnection();if(result.connected)console.log('PostgreSQL connected successfully');else console.error(`PostgreSQL connection failed [${result.type}]: ${result.message}`)});
