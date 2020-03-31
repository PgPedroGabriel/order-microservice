import Order from '../models/Order';
import OrderEvent from '../models/OrderEvent';
import OrderTicket from '../models/OrderTicket';

const ordersAttr = [
  'id',
  'external_user_id',
  'total_price',
  'tickets_price',
  'convenience_price',
  'payment_status',
  'payment_gateway',
  'createdAt',
  'updatedAt'
];

const ticketsAttr = [
  'id',
  'name',
  'unit_price',
  'total_price',
  'quantity',
  'external_id'
];

const eventsAttr = ['id', 'name', 'convenience_tax', 'external_id'];

const orderIncludes = [
  {
    model: OrderTicket,
    as: 'order_tickets',
    attributes: ticketsAttr
  },
  {
    model: OrderEvent,
    as: 'order_events',
    attributes: eventsAttr
  }
];

class OrdersRepository {
  static async findAll(where) {
    const order = await Order.findAndCountAll({
      attributes: ordersAttr,
      include: orderIncludes,
      where,
      order: [['createdAt', 'DESC']]
    });

    return order;
  }

  static async findOneFullData(id) {
    const order = await Order.findByPk(id, {
      attributes: ordersAttr,
      include: orderIncludes
    });

    return order;
  }

  static async updatePaymentStatus(id, status) {
    const order = await Order.findByPk(id, {
      attributes: ['id', 'payment_status']
    });

    if (order) {
      order.payment_status = status;
      await order.save();
    }

    return order;
  }
}

export default OrdersRepository;
