import { Router } from 'express';
import V1Router from './v1/index.js';

const router = Router();
router.get('/', (req, res) => res.send('API-Server-Working'));
router.use('/api/v1', V1Router);

export default router;
