import { Router } from 'express';import { places } from '../seed/chennai.places.js';
const router=Router();router.get('/',(_,res)=>res.json(places));router.get('/recommendations',(_,res)=>res.json(places.slice(0,10)));router.get('/:id',(req,res)=>{const p=places.find(x=>x.id===req.params.id);p?res.json(p):res.status(404).json({message:'Place not found'})});export default router;
