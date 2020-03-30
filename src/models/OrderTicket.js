import Sequelize, { Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import 'dotenv';

class OrderTicket extends Model {
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
        unit_price: {
          type: Sequelize.DOUBLE,
          defaultValue: 0
        },
        quantity: {
          type: Sequelize.INTEGER
        },
        total_price: {
          type: Sequelize.DOUBLE
        },
        external_id: {
          type: Sequelize.STRING
        }
      },
      {
        sequelize: connection
      }
    );

    this.addHook('beforeCreate', ticket => {
      // eslint-disable-next-line no-param-reassign
      ticket.id = uuidv4();
    });

    this.addHook('beforeSave', ticket => {
      // eslint-disable-next-line no-param-reassign
      ticket.total_price = ticket.quantity * ticket.unit_price;
    });

    return this;
  }

  static associete(models) {
    this.belongsTo(models.OrderEvent, {
      foreignKey: 'order_event_id',
      as: 'order_event'
    });
    this.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
  }

  static createFromExternalData(
    order,
    orderEvent,
    externalData,
    quantity,
    transaction
  ) {
    return this.create(
      {
        external_id: externalData.id,
        unit_price: externalData.price,
        name: externalData.name,
        quantity,
        order_id: order.id,
        order_event_id: orderEvent.id
      },
      {
        transaction
      }
    );
  }
}

export default OrderTicket;
