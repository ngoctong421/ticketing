import axios from 'axios';

import buildClient from '../api/build-client';

const LandingPage = ({ id, email }) => {
  return email ? <h1>Hello {email}</h1> : <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);

  const { data } = await client.get('/api/users/currentuser');

  return data;
};

export default LandingPage;
