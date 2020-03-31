import server from './app';
import './bootstrap';
import UpdateOrderWorker from './queue/workers/UpdateOrderWorker';

server.listen(process.env.PORT || 4000);
console.log(`Running on PORT ${process.env.PORT}`);

(async () => {
  const rabbitmqWorker = new UpdateOrderWorker();
  await rabbitmqWorker.connectQueue();
  rabbitmqWorker.subscribe();
})();
