import { Router } from 'express';
import { parseTripRequest } from '../services/tripParser.service.js';
import { detectMissingTripInformation,nextClarification } from '../services/missingInfo.service.js';
const router=Router();
router.post('/understand',async(req,res)=>{try{const text=req.body.text??req.body.request??'',trip=await parseTripRequest(text);const summary=trip.destination?`Got it — ${trip.destination}${trip.durationDays?` for ${trip.durationDays} day${trip.durationDays===1?'':'s'}`:''}${trip.budget?` with a ₹${trip.budget.toLocaleString('en-IN')} budget`:''}.`:'';return res.json({...trip,message:summary||'I need one more detail to understand your trip.',nextQuestion:nextClarification(trip)})}catch(error){console.error('Trip understanding error:',{name:error?.name,message:error?.message,stack:process.env.NODE_ENV==='development'?error?.stack:undefined});return res.status(500).json({message:process.env.NODE_ENV==='development'?error?.message||'Trip understanding failed':'TravelMind could not understand that trip right now.'})}});
router.post('/clarify',(req,res)=>{const trip={...req.body.trip,[req.body.field]:req.body.value};const next=nextClarification(trip);res.json({...trip,missingFields:detectMissingTripInformation(trip),nextQuestion:next,complete:!next})});
export default router;
