import Sequelize, { Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import 'dotenv';

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
        }
      },
      {
        sequelize: connection
      }
    );

    this.addHook('beforeCreate', order => {
      // eslint-disable-next-line no-param-reassign
      order.id = uuidv4();
    });

    return this;
  }

  static associete(models) {
    this.hasMany(models.OrderEvent, { as: 'order_events' });
    this.hasMany(models.OrderTicket, { as: 'order_tickets' });
  }
}

export default Order;
