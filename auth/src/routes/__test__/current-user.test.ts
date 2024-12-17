import request from 'supertest';
import { app } from '../../app';

it('responds with detail about current user', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.io',
      password: '1234',
    })
    .expect(201);

  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200);
});
