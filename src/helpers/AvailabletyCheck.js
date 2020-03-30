/**
 * Checks avaliablety of quantity in order
 * and quantity avaliable tickets
 */
export default (orderTicket, externalTicketData) => {
  if (externalTicketData.qty_available < orderTicket.quantity) {
    throw new Error(
      `Quantidade de ingressos inválida, fora de estoque ${orderTicket.name}`
    );
  }
};
