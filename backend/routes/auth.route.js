import { Router } from 'express'
import { loginUser, registerUser, logoutUser, refreshToken } from '../controller/auth.controller.js'

const router = Router();

router.post('/login', loginUser)
router.post('/register', registerUser)
router.post('/logout', logoutUser)
router.get('/refresh', refreshToken)

export default router;