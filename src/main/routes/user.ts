import express from 'express';

import UserController from '@/presentation/controllers/user';

const router = express.Router();

router.get('/', UserController.getAllUsers);

export default router;
