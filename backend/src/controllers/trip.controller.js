import { parseNaturalLanguage } from '../services/ai.service.js';
import { recommend } from '../services/recommendation.service.js';
import { optimizeConstraints } from '../services/constraintOptimizer.service.js';
import { optimizeRoute } from '../services/routeOptimizer.service.js';
import { recover } from '../services/tripRecovery.service.js';
import { discoverPlaces } from '../services/placeDiscovery.service.js';
export const parseTrip=async(req,res,next)=>{try{res.json(await parseNaturalLanguage(req.body.request))}catch(e){next(e)}};
export const generateTrip=async(req,res,next)=>{try{const requirements=req.body.requirements||await parseNaturalLanguage(req.body.request);const discovery=await discoverPlaces({city:requirements.destination,interests:requirements.interests||[]});const ranked=recommend(discovery.places,{...requirements,destination:discovery.destination});const selected=optimizeConstraints(ranked,requirements);res.status(201).json({requirements,destination:discovery.destination,recommendations:ranked,...optimizeRoute(selected),explanation:'Preference and avoid rules select stops; constraints preserve budget and time; shortest-path costs optimize the route.'})}catch(e){next(e)}};
export const recoverTrip=async(req,res,next)=>{try{res.json(recover(req.body.trip||{},req.body))}catch(e){next(e)}};
