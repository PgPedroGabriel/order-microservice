import RabbitMQ from '../RabbitMQ';
import OrdersRepository from '../../repositories/Orders';

class UpdateOrderWorker extends RabbitMQ {
  constructor() {
    super();

    this.exchange = process.env.RABBITMQ_EXCHANGE_PAYMENT_STATUS_CHANGED;
  }

  async subscribe() {
    console.log(process.env.RABBITMQ_EXCHANGE_PAYMENT_STATUS_CHANGED);
    await this.channel.assertExchange(this.exchange, 'fanout', {
      durable: false
    });

    const q = await this.channel.assertQueue('', {
      exclusive: true
    }); // Fila exclusiva para este fanout, quando a conexão se encerra ela é deletada

    console.log(
      ' [*] Waiting for messages in %s. To exit press CTRL+C',
      q.queue
    );
    this.channel.bindQueue(q.queue, this.exchange, '');
    this.channel.consume(q.queue, msg => {
      if (msg && msg.content) {
        const json = JSON.parse(msg.content.toString());
        console.log(
          OrdersRepository.updatePaymentStatus(json.order_id, json.status)
        );
      }

      // this.channel.ack(msg); // remove from queue
    });
  }
}

export default UpdateOrderWorker;
