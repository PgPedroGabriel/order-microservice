import { Router } from 'express';

import OrderController from './controllers/OrderController';
import UserAuthMiddleware from './services/authentication/UserAuthMiddleware';
import OrderCreateValidation from './services/validations/OrderCreateValidation';
import EventsTicketsInforMiddleware from './services/tickets/EventsTicketsInfoMiddleware';

const routes = new Router();

routes.get('/', UserAuthMiddleware, OrderController.list);
// routes.get('/:id', OrderController.read);

routes.post(
  '/',
  UserAuthMiddleware,
  OrderCreateValidation,
  EventsTicketsInforMiddleware,
  OrderController.create
);

export default routes;
