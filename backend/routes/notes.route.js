import { Router } from 'express';
import { getUserNotes, createNote, updateNote, deleteNote } from '../controller/notes.controller.js';
import { tokenVerify } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', tokenVerify ,getUserNotes);
router.post('/', tokenVerify, createNote);
router.put('/:noteId', tokenVerify, updateNote);
router.delete('/:noteId', tokenVerify, deleteNote);

export default router;