# Order Microservice

## Features

* List orders of a user
* Using User Auth JWT microservice Sync comunication
* Create a order of 1 event to N tickets
* Check ticket availablety with sync request to events microservice
* Custom fallback of create order without ticket availablety
* Search order by Id
* Create Payment stack to RabitMQ to generate a payment comunication

### Checks

- [ ] make sure that .env file is created
- [ ] make sure if you will use docker

### Using docker

1. To test:

``` docker-compose -p tests run -p 3002 orders-microservice yarn test ```

2. To build:

``` docker-compose up --build -d ```

3. Make sure that you can see all networks to comunicate with microservices, sample:

``` docker network ls ```

``` docker network connect authenticate-microservice_auth-microservice-network [AUTH_CONTAINER_ID] ```

``` docker network connect events-tickets-microservice_events-microservice-network [EVENT_CONTAINER_ID] ```

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
3. REST Client
4. Editorconfig
5. Docker
