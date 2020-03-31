/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import Database from '../database/index';
import Order from '../models/Order';
import OrderEvent from '../models/OrderEvent';
import OrderTicket from '../models/OrderTicket';
import AvailabletyCheck from '../helpers/AvailabletyCheck';
import TicketQuantityObjectMapper from '../helpers/TicketQuantityObjectMapper';
import PaymentQueue from '../queue/payment/PaymentQueue';
import OrdersRepository from '../repositories/Orders';

class OrderController {
  /**
   * List of orders of a user
   */
  static async list(req, res) {
    const { id } = req.authUserInfo;
    const orders = await OrdersRepository.findAll({ external_user_id: id });

    return res.json(orders);
  }

  /**
   * Create Order
   */
  static async create(req, res) {
    const { externalEventsData } = req;
    const { body } = req;

    const transaction = await Database.createTranscation();
    const ticketQuantityMap = TicketQuantityObjectMapper(body);

    try {
      const order = await Order.create(
        {
          external_user_id: req.authUserInfo.id
        },
        { transaction }
      );

      for (const externalEventData of externalEventsData) {
        const orderEvent = await OrderEvent.createFromExternalData(
          order,
          externalEventData,
          transaction
        );

        for (const externalTicketData of externalEventData.tickets) {
          const orderTicket = await OrderTicket.createFromExternalData(
            order,
            orderEvent,
            externalTicketData,
            ticketQuantityMap[externalTicketData.id],
            transaction
          );

          AvailabletyCheck(orderTicket, externalTicketData);

          order.calcTaxes(orderEvent, orderTicket);
        }
      }
      await order.save({ transaction });

      await transaction.commit();

      const orderFullData = await OrdersRepository.findOneFullData(order.id);

      /**
       * Sending to RabbitMQ the Order
       * to process payment
       */
      const queue = new PaymentQueue(orderFullData);
      await queue.connectQueue();
      await queue.sendMessage();
      await queue.closeConnection();

      return res.json(orderFullData);
    } catch (e) {
      /**
       * @todo
       * Send a alert with error
       */
      console.error(e);

      transaction.rollback();
      return res.status(400).json(e.message);
    }
  }
}

export default OrderController;
