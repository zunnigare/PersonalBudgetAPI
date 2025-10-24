import { Router } from 'express';
import AuthorizationController from '../../controllers/v1/authorization/authController.js';

//import authorizationV1 from '../../middlewares/v1/authorization/auth.js';

const router = Router();

router.post('/login', AuthorizationController.login);
router.post('/logout', AuthorizationController.logout);

export default router;
