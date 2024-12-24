import express from 'express';
import { currentUser } from 'tickets-common';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, async (req, res) => {
  res.send(req.currentUser ?? {});
});

export { router as currentUserRouter };
