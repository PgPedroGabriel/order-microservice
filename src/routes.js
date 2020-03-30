import { Router } from 'express';

import OrderController from './controllers/OrderController';
import UserAuthMiddleware from './services/authentication/UserAuthMiddleware';

const routes = new Router();

routes.get('/', UserAuthMiddleware, OrderController.list);
// routes.get('/:id', OrderController.read);

// routes.post('/', OrderController.create);

export default routes;
