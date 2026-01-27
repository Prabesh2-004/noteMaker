import {Router} from 'express';
import { getAllUsers, updateUser, deleteUser, getUserById, getProfile } from '../controller/user.controller.js';
import { adminVerify, tokenVerify } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/me', tokenVerify , getProfile);
router.get('/', adminVerify ,getAllUsers);
router.get('/:id', adminVerify , getUserById);
router.put('/:id', updateUser);
router.delete('/:id', adminVerify , deleteUser);

export default router;
