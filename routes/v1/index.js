import { Router } from 'express';
import AuthorizationController from '../../controllers/v1/authorization/authController.js';
import income from './income/index.js';
import authorizationV1 from '../../middlewares/v1/authorization/auth.js';

const router = Router();

router.post('/login', AuthorizationController.login);
router.post('/logout', AuthorizationController.logout);

router.use('/income', authorizationV1, income)

router.use((req, res) => {
    res.status(404).send("https://youtube.com/shorts/IWGnnE0S0I0?si=n4qZq6OwLzzfUkil");
});

export default router;
