import { Router, Request, Response } from 'express';
import { registerUserController } from '../dependencies';

const router = Router();

router.post('/', registerUserController.run.bind(registerUserController));

router.put('/:token/activate', (req:Request, res:Response) => {

});

router.post('/auth/login', (req:Request, res:Response) => {

});

router.post('/auth/logout', (req:Request, res:Response) => {

});

export default router;