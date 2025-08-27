import express from "express";
import * as middleware from "../middleware/requestsMiddlewares";
import * as service from "../services/urlService";
const router = express.Router();


router.post('/url',middleware.validateRequest,middleware.urlValidator,service.addUrlService)
router.delete('/url',middleware.validateRequest,middleware.urlValidator,service.deleteUrlService)

export default router;