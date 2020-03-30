/**
 * Checks avaliablety of quantity in order
 * and quantity avaliable tickets
 */
export default reqBody => {
  return reqBody.reduce((accumulator, event) => {
    event.tickets.forEach(ticket => {
      accumulator[ticket.ticket_id] = ticket.ticket_qty;
    });

    return accumulator;
  }, {});
};
