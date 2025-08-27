import express from "express";
const router = express.Router();
import * as service from '../services/portService';
import * as middleware from '../middleware/requestsMiddlewares'

router.post('/port',middleware.validateRequest,middleware.portValidator,service.addPortService)
router.delete('/port',middleware.validateRequest,middleware.portValidator,service.deletePortService)

export default router;