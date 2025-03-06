import { useEffect, useRef, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import CheckoutForm from '../../components/checkout-form';

const stripePromise = loadStripe(
  'pk_test_51QyqFtE9JZKqKWiD19vdhctPjqV5OdjI0jYETLQVvVlBwTOLYGO3dHTfcVkmHHR2b5SU51PB3WAPRIZU7Wtk5jJr000tHaf5FX'
);

const OrderShow = ({ order }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    intervalRef.timeId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(intervalRef.timeId);
    };
  }, [order]);

  if (timeLeft < 0) {
    clearInterval(intervalRef.timerId);
    return <div>Order Expired</div>;
  }

  const options = {
    mode: 'payment',
    amount: order.ticket.price * 100,
    currency: 'usd',
  };

  return (
    <div>
      Time left to pay: {timeLeft}
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm order={order} />
      </Elements>
    </div>
  );
};

OrderShow.getInitialProps = async (context, client, currentUser) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
