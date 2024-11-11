import express from 'express';

const router = express.Router();

router.post('/api/users/signup', async (req, res) => {
  res.send('Hi there!');
});

export { router as signupRouter };
