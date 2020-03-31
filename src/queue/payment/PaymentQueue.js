import RabbitMQ from '../RabbitMQ';
import OrderParserPaymentContract from './OrderParserPaymentContract';

class PaymentQueue extends RabbitMQ {
  constructor(order) {
    super();
    this.order = order;
  }

  async sendMessage() {
    try {
      const queueName = process.env.RABBITMQ_PAYMENT_QUEUE;

      await this.channel.assertQueue(queueName, {
        durable: true
      });
      await this.channel.sendToQueue(
        queueName,
        Buffer.from(JSON.stringify(OrderParserPaymentContract(this.order)), {
          persistent: true
        })
      );
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
