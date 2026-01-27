import { Router } from 'express'
import { adminDashboard } from '../controller/admin.controller.js';

const router = Router();

router.post('/', adminDashboard)

export default router;