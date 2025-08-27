import express from "express";
const router = express.Router();
import * as service from '../services/rulesService'

router.get("/rules",service.getAllRules);
router.put('/rules',service.toggleActive);
export default router;