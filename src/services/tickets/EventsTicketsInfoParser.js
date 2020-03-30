/**
 * Receives a INPUT request body
 * returns a json to call events microservice
 * with correct contract
 * Events Microservice Contract is:
 * [
 *  {
 *    event_id:'...',
 *    tickets: ['...', '...', '...'] / tickets ids /
 *  },
 *  ...
 * ]
 */
export default input => {
  return input.reduce((accumulator, el) => {
    const data = { event_id: '', tickets: [] };

    data.event_id = el.event_id;
    el.tickets.forEach(ticket => data.tickets.push(ticket.ticket_id));

    accumulator.push(data);

    return accumulator;
  }, []);
};
