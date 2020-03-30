import Sequelize, { Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import 'dotenv';

class OrderEvent extends Model {
  static init(connection) {
    super.init(
      {
        id: {
          type: Sequelize.STRING,
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING
        },
        convenience_tax: {
          type: Sequelize.DOUBLE,
          defaultValue: 0
        },
        external_id: {
          type: Sequelize.STRING
        }
      },
      {
        sequelize: connection
      }
    );

    this.addHook('beforeCreate', event => {
      // eslint-disable-next-line no-param-reassign
      event.id = uuidv4();
    });

    return this;
  }

  static associete(models) {
    this.hasMany(models.OrderTicket, { as: 'order_tickets' });
    this.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
  }
}

export default OrderEvent;
