import axios from 'axios';
import EventsTicketsInfoParser from './EventsTicketsInfoParser';

/**
 * Sending SYNC comunication to
 * events microservice
 *
 * @todo
 * ON catch scope, send a alert
 * of out comunication with events
 * microservices, or make a numbers
 * of retries
 */
export default async (req, res, next) => {
  try {
    const payload = EventsTicketsInfoParser(req.body);

    const response = await axios.post(
      process.env.GET_EVENTS_TICKETS_INFO_URL,
      JSON.stringify(payload),
      {
        headers: {
          'Content-type': 'application/json'
        }
      }
    );

    req.externalEventsData = response.data;

    return next();
  } catch (err) {
    if (err && err.response && err.response.status === 401) {
      return res.status(401).send();
    }

    /**
     * @todo
     * Send a alert
     */
    return res.status(500).send();
  }
};
