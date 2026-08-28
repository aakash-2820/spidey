import { Router } from 'express';import { recommend } from '../services/recommendation.service.js';import { discoverPlaces } from '../services/placeDiscovery.service.js';import { searchPlaces } from '../services/geocoding.service.js';
const router=Router();
router.get('/discover',async(req,res,next)=>{try{res.json(await discoverPlaces({city:String(req.query.city||''),interests:String(req.query.interests||'').split(',').filter(Boolean)}))}catch(e){next(e)}});
router.get('/search',async(req,res,next)=>{try{if(!req.query.q||!req.query.city)return res.status(400).json({message:'q and city are required'});res.json(await searchPlaces(String(req.query.q),String(req.query.city)))}catch(e){next(e)}});
router.post('/recommend',async(req,res,next)=>{try{const discovery=await discoverPlaces({city:req.body.destination||req.body.city,interests:req.body.interests||[]});res.json({destination:discovery.destination,places:recommend(discovery.places,{...req.body,destination:discovery.destination})})}catch(e){next(e)}});
export default router;
