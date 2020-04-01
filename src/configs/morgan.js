import morgan from 'morgan';
import json from 'morgan-json';

const format = json({
  date: ':date[iso]',
  short: ':method :url :status',
  length: ':res[content-length]',
  time: ':response-time ms'
});

export default morgan(format);
