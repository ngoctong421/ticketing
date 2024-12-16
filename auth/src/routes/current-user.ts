import express from 'express';
import jwt from 'jsonwebtoken';

import { currentUser } from '../middlewares/current-user';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, async (req, res) => {
  res.send(req.currentUser);
});

export { router as currentUserRouter };
