# Order Microservice

## Features

* List orders of a user
* Using User Auth JWT microservice Sync comunication
* Create a order of N events to N tickets
* Check ticket availablety with sync request to events microservice
* Search order by Id
* Send Payment Contract to RabbitMQ to payment worker queue
* (Sentry to trace error logs)[https://sentry.io/]
* Morgan to trace requests

### Checks

- [ ] make sure that .env file is created
- [ ] make sure if you will use docker

### Using docker

1. To build:

``` docker-compose up --build -d ```

2. Make sure that you can see all networks to comunicate with microservices, sample:

``` docker network ls ```

``` docker network connect authenticate-microservice_auth-microservice-network orders-microservice ```

``` docker network connect events-tickets-microservice_events-microservice-network orders-microservice ```

3. Install RabbitMQ container and make sure that container is in order-network, sample:

3.1 - install RabbitMQ container

``` docker run -d --hostname my-rabbit --name some-rabbit -p 8080:15672 rabbitmq:3-management ```

3.2 - Add rabbitmq container order network

``` docker network ls ```

``` docker network connect order-microservice_orders-microservice-network some-rabbit ```


### Using your local machine

1. download yarn
2. yarn install
3. yarn dev

To build to production

``` yarn run build ```

the dist folder will be generated


To test

``` yarn test ```


### Deploy using a docker image

Build your own docker image, remember to change .env vars

``` docker build -f .\Dockerfile.prod -t orders-microservice-prod . ```

### Trick to vscode devolopment

Install plugins

1. ESLINT
2. Prettier
3. REST Client (to run requests inside vscode on requests file in root folder)
4. Editorconfig
5. Docker

### Development pending tasks

- [ ] Add client data to send to payment contract (queue)
- [ ] Add Type of Payment (card/boleto/débito) data to send to payment contract (queue)
- [ ] Add client Address to send to payment contract (queue)
- [ ] Code coverge > 80%
- [x] Add Logging traces
- [x] Add ALARM when errors occur
- [ ] Revison of production dockerfile builder
- [ ] Create CI/CD pipelines with docker-compose to GCP Cloud Builder
- [ ] Send pod to Kubernets Cluster
