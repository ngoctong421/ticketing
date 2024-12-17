import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  return await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.io',
      password: '1234',
    })
    .expect(201);
});

it('returns a 400 with an invalid email', async () => {
  return await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test',
      password: '1234',
    })
    .expect(400);
});

it('returns a 400 with an invalid password', async () => {
  return await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.io',
      password: '1',
    })
    .expect(400);
});

it('returns a 400 with missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.io' })
    .expect(400);
  await request(app)
    .post('/api/users/signup')
    .send({ password: '1234' })
    .expect(400);
});

it('disallows duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.io',
      password: '1234',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.io',
      password: '1234',
    })
    .expect(400);
});
