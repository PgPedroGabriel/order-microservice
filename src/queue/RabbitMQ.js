import amqp from 'amqplib';

class RabbitMQ {
  constructor() {
    this.connection = null;
    this.channel = null;
  }

  async connectQueue() {
    this.connection = await amqp.connect(process.env.RABBITMQ_HOST_URL);
    this.channel = await this.connection.createChannel();
  }

  async closeConnection() {
    await this.channel.close();
    await this.connection.close();
  }
}

export default RabbitMQ;
