/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
import Sequelize, { Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import 'dotenv';
import OrderEvent from './OrderEvent';
import OrderTicket from './OrderTicket';

class Order extends Model {
  static init(connection) {
    super.init(
      {
        id: {
          type: Sequelize.STRING,
          primaryKey: true
        },
        total_price: {
          type: Sequelize.DOUBLE,
          defaultValue: 0
        },
        tickets_price: {
          type: Sequelize.DOUBLE,
          defaultValue: 0
        },
        convenience_price: {
          type: Sequelize.DOUBLE,
          defaultValue: 0
        },
        external_user_id: {
          type: Sequelize.STRING
        },
        payment_status: {
          type: Sequelize.STRING
        },
        payment_gateway: {
          type: Sequelize.STRING
        }
      },
      {
        sequelize: connection
      }
    );

    this.addHook('beforeCreate', order => {
      order.id = uuidv4();
    });

    return this;
  }

  async calcTaxes(save = true) {
    // Calculate all prices

    const orderEvents = await OrderEvent.findAll({
      where: {
        order_id: this.id
      },
      attributes: ['id', 'convenience_tax'],
      include: [
        {
          model: OrderTicket,
          as: 'order_tickets',
          attributes: ['id', 'total_price']
        }
      ]
    });

    this.tickets_price = 0;
    this.convenience_price = 0;
    this.total_price = 0;

    for (const orderEvent of orderEvents) {
      for (const orderTicket of orderEvent.order_tickets) {
        const convenience =
          (orderTicket.total_price * orderEvent.convenience_tax) / 100;
        this.tickets_price += orderTicket.total_price;
        this.convenience_price += convenience;
        this.total_price += orderTicket.total_price + convenience;
      }
    }

    console.log(
      save,
      this.tickets_price,
      this.convenience_price,
      this.total_price
    );

    if (save) this.save();
  }

  static associete(models) {
    this.hasMany(models.OrderEvent, { as: 'order_events' });
    this.hasMany(models.OrderTicket, { as: 'order_tickets' });
  }
}

export default Order;
