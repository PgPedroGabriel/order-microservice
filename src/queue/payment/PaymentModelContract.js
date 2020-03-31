class PaymentModelContract {
  constructor(id, gateway, products = []) {
    this.id = id;
    this.gateway = gateway;
    this.products = products;
  }
}

export default PaymentModelContract;
