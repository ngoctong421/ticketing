import request from 'supertest';

import { app } from '../../app';

it('fails when a email that does not exist is supplied', async () => {
  return await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.i',
      password: '1234',
    })
    .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.io',
      password: '1234',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.io',
      password: '123',
    })
    .expect(400);
});

it('responds with a cookie when given valid credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.io',
      password: '1234',
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.io',
      password: '1234',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
