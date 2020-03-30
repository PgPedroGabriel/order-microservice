import Order from '../models/Order';
import OrderEvent from '../models/OrderEvent';
import OrderTicket from '../models/OrderTicket';

class OrdersRepository {
  static async findOneFullData(id) {
    const order = await Order.findByPk(id, {
      attributes: [
        'id',
        'external_user_id',
        'total_price',
        'tickets_price',
        'convenience_price',
        'payment_status',
        'payment_gateway',
        'createdAt',
        'updatedAt'
      ],
      include: [
        {
          model: OrderTicket,
          as: 'order_tickets',
          attributes: [
            'id',
            'name',
            'unit_price',
            'total_price',
            'quantity',
            'external_id'
          ]
        },
        {
          model: OrderEvent,
          as: 'order_events',
          attributes: ['id', 'name', 'convenience_tax', 'external_id']
        }
      ]
    });

    return order;
  }
}

export default OrdersRepository;
