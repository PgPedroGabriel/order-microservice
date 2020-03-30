import amqp from 'amqplib';
import OrderParserPaymentContract from './OrderParserPaymentContract';

class PaymentQueue {
  constructor(order) {
    this.order = order;
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

  async sendMessage() {
    try {
      this.channel.assertQueue(process.env.RABBITMQ_PAYMENT_QUEUE, {
        durable: true
      });
      this.channel.sendToQueue(
        process.env.RABBITMQ_PAYMENT_QUEUE,
        Buffer.from(JSON.stringify(OrderParserPaymentContract(this.order)))
      );
      console.log(
        `[x] sent message: ${JSON.stringify(
          OrderParserPaymentContract(this.order)
        )}`
      );
    } catch (e) {
      /**
       * @todo
       * send a alert
       */
      console.error(e);
    }
  }

  closeConnection() {
    try {
      setTimeout(() => {
        this.channel.close();
        this.connection.close();
      }, 500);
    } catch (e) {
      /**
       * @todo
       * send a alert
       */
      console.error(e);
    }
  }
}

export default PaymentQueue;
