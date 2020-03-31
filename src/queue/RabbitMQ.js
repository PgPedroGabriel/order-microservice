import amqp from 'amqplib';

class RabbitMQ {
  constructor() {
    this.connection = null;
    this.channel = null;
  }

  async connectQueue() {
    try {
      this.connection = await amqp.connect(process.env.RABBITMQ_HOST_URL);
      this.channel = await this.connection.createChannel();
    } catch (e) {
      /**
       * @todo
       * send a alert
       */
      console.error(e);
    }
  }

  async closeConnection() {
    try {
      await this.channel.close();
      await this.connection.close();
    } catch (e) {
      /**
       * @todo
       * send a alert
       */
      console.error(e);
    }
  }
}

export default RabbitMQ;
