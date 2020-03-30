import Sequelize from 'sequelize';

import Order from '../models/Order';
import OrderEvent from '../models/OrderEvent';
import OrderTicket from '../models/OrderTicket';
import relational from '../configs/databases';

const models = [Order, OrderEvent, OrderTicket];

class Database {
  constructor() {
    this.relationalDatabase();
  }

  relationalDatabase() {
    this.connection = new Sequelize(relational);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associete && model.associete(this.connection.models))
      .map(model => this.connection.sync(model));
  }

  async createTranscation() {
    return this.connection.transaction({ autocommit: false });
  }
}

export default new Database();
