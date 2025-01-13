import request from 'supertest';
import mongoose from 'mongoose';

import { app } from '../../app';

it('returns a 404 if the provided id does not exist', async () => {
  const ticketId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${ticketId}`)
    .set('Cookie', global.signin())
    .send({
      title: 'test',
      price: 20,
    })
    .expect(404);
});

it('returns 401 if the user is not authenticated', async () => {
  const ticketId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${ticketId}`)
    .send({ title: 'test', price: 20 })
    .expect(401);
});

it('returns 401 if the user does not own the ticket', async () => {});

it('returns 400 if the user provides a invalid title or price', async () => {});

it('updates the ticket provided valid inputs', async () => {});
