import express from "express";
const router = express.Router();
import * as service from '../services/ipService';
import * as middleware from '../middleware/requestsMiddlewares'


router.post('/ip',middleware.validateRequest,middleware.ipValidator,service.addIpService)
router.delete('/ip',middleware.validateRequest,middleware.ipValidator,service.deleteIpService)

export default router;