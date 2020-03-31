/* eslint-disable no-restricted-syntax */
import PaymentModelContract from './PaymentModelContract';
import PaymentProductContract from './PaymentProductContract';

const parseTicketToProduct = orderTicket => {
  const product = new PaymentProductContract(
    orderTicket.external_id,
    orderTicket.name,
    orderTicket.unit_price,
    orderTicket.quantity
  );

  return product;
};

const parseConvenienceTaxToProduct = order => {
  const product = new PaymentProductContract(
    order.id,
    'Taxa de conveniência',
    order.convenience_price,
    1
  );

  return product;
};

export default orderWithFullData => {
  const products = [];

  for (const orderTicket of orderWithFullData.order_tickets) {
    products.push(parseTicketToProduct(orderTicket));
  }

  products.push(parseConvenienceTaxToProduct(orderWithFullData));

  const paymentModelContract = new PaymentModelContract(
    orderWithFullData.id,
    orderWithFullData.payment_gateway,
    products
  );

  return paymentModelContract;
};
