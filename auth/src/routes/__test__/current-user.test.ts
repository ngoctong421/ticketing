import request from 'supertest';
import { app } from '../../app';

it('responds with detail about current user', async () => {
  const authResponse = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.io',
      password: '1234',
    })
    .expect(201);
  const cookie = authResponse.get('Set-Cookie');

  if (!cookie) {
    throw new Error('Cookie not set after signup');
  }

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.email).toEqual('test@test.io');
});
