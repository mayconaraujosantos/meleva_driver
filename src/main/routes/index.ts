import express from 'express';

import UserRoutes from '@/main/routes/user';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('This is the API root!');
});

router.use('/users', UserRoutes);

export default router;
