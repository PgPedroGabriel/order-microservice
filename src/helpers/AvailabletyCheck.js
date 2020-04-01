/**
 * Checks avaliablety of quantity in order
 * and quantity avaliable tickets
 */

class TicketStockError extends Error {}

const checkStock = (orderTicket, externalTicketData) => {
  if (externalTicketData.qty_available < orderTicket.quantity) {
    throw new TicketStockError(
      `Quantidade de ingressos inválida, fora de estoque ${orderTicket.name}`
    );
  }
};

export { checkStock, TicketStockError };
