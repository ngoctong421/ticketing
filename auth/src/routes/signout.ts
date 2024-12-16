import express from 'express';

const router = express.Router();

router.post('/api/users/signout', async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Unable to log out');
    } else {
      res.send({});
    }
  });
});

export { router as signoutRouter };
