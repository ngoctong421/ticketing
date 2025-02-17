import cookieSession from 'cookie-session';
import express from 'express';
import { errorHandler, NotFoundError, currentUser } from 'tickets-common';

import { createOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';
import { indexOrderRouter } from './routes';
import { deleteOrderRouter } from './routes/delete';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('trust proxy', 1);
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV === 'production',
  })
);

app.use(currentUser);

app.use(createOrderRouter);
app.use(showOrderRouter);
app.use(indexOrderRouter);
app.use(deleteOrderRouter);

app.all('*', async (req, res, next) => {
  next(new NotFoundError());
});

app.use(errorHandler);

export { app };
