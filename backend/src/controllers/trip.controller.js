import { parseNaturalLanguage } from '../services/ai.service.js';
import { recommend } from '../services/recommendation.service.js';
import { optimizeConstraints } from '../services/constraintOptimizer.service.js';
import { optimizeRoute } from '../services/routeOptimizer.service.js';
import { recover } from '../services/tripRecovery.service.js';
import { places } from '../seed/chennai.places.js';
export const parseTrip=async(req,res,next)=>{try{res.json(await parseNaturalLanguage(req.body.request))}catch(e){next(e)}};
export const generateTrip=async(req,res,next)=>{try{const requirements=req.body.requirements||await parseNaturalLanguage(req.body.request);const ranked=recommend(places,requirements);const selected=optimizeConstraints(ranked,requirements);res.status(201).json({id:'demo-chennai',requirements,...optimizeRoute(selected),explanation:'Beaches, food, and photography are prioritized while free places preserve your food budget.'})}catch(e){next(e)}};
export const recoverTrip=async(req,res,next)=>{try{res.json(recover(req.body.trip||{},req.body))}catch(e){next(e)}};
