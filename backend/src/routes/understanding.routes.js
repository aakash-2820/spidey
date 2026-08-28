import { Router } from 'express';
import { parseTripRequest } from '../services/tripParser.service.js';
import { detectMissingTripInformation,nextClarification } from '../services/missingInfo.service.js';
const router=Router();
router.post('/understand',async(req,res,next)=>{try{const text=req.body.text??req.body.request??'',trip=await parseTripRequest(text);const summary=trip.destination?`Got it — ${trip.destination}${trip.durationDays?` for ${trip.durationDays} day${trip.durationDays===1?'':'s'}`:''}${trip.budget?` with a ₹${trip.budget.toLocaleString('en-IN')} budget`:''}.`:'';res.json({...trip,message:summary||'I need one more detail to understand your trip.',nextQuestion:nextClarification(trip)})}catch(error){next(error)}});
router.post('/clarify',(req,res)=>{const trip={...req.body.trip,[req.body.field]:req.body.value};const next=nextClarification(trip);res.json({...trip,missingFields:detectMissingTripInformation(trip),nextQuestion:next,complete:!next})});
export default router;
