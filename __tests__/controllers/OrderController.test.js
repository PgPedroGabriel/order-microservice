import request from 'supertest';
import '../../src/bootstrap';
import server from '../../src/app';

describe('OrderController', () => {
  test('Creating Order test', done => {
    const authToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY3MWNkOGU0LWRhNmUtNGI1Mi1iN2QzLTQzZjc1YjEwODcxZSIsInVzZXJuYW1lIjoiZGV2cGVkcm9nYWJyaWVsQGdtYWlsLmNvbSIsIm5hbWUiOiJQZWRybyBHYWJyaWVsIiwiZW1haWwiOiJkZXZwZWRyb2dhYnJpZWxAZ21haWwuY29tIiwiaWF0IjoxNTg1NTMwMDY1LCJleHAiOjE1ODYxMzQ4NjV9.gqbPESCOp5QEFWz_VTvSgpmwqmBg_rSqMjHbPBpyVxA';

    const payload = [
      {
        event_id: '123',
        tickets: [
          {
            ticket_id: '123',
            ticket_qty: 2
          }
        ]
      }
    ];

    return request(server)
      .post('/')
      .send(payload)
      .set('Authorization', authToken)
      .expect(200)
      .then(response => {
        done();
      });
  });
});
