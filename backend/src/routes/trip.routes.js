import { Router } from 'express';
import { parseTrip,generateTrip,recoverTrip } from '../controllers/trip.controller.js';
const router=Router();
router.post('/parse-request',parseTrip);router.post('/generate',generateTrip);router.post('/:id/recover',recoverTrip);
router.get('/',(_,res)=>res.json([]));router.get('/:id',(_,res)=>res.json({id:_.params.id,status:'demo'}));
router.post('/:id/start',(_,res)=>res.json({id:_.params.id,status:'active',startedAt:new Date().toISOString()}));
export default router;
