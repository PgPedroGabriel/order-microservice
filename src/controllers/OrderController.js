import Order from '../models/Order';
import OrderEvent from '../models/OrderEvent';
import OrderTicket from '../models/OrderTicket';

class OrderController {
  /**
   * List of orders of a user
   */
  static async list(req, res) {
    const { id } = req.authUserInfo;
    const orders = await Order.findAndCountAll({
      where: {
        external_user_id: id
      },
      attributes: [
        'id',
        'external_user_id',
        'total_price',
        'tickets_price',
        'convenience_price',
        'createdAt',
        'updatedAt'
      ],
      include: [
        {
          model: OrderTicket,
          as: 'order_tickets',
          attributes: ['id', 'name', 'price', 'external_id']
        },
        {
          model: OrderEvent,
          as: 'order_events',
          attributes: ['id', 'name', 'convenience_tax', 'external_id']
        }
      ]
    });

    return res.json(orders);
  }
}

export default OrderController;
