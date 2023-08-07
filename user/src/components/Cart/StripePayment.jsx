import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51NVuKfHnVSiG8gwl0HcIwKoQ4FK7VlPwCy0ixiE99G5EAXqy8F66CGHUppdz3P6RDStjUecH2sLRm3UDVVh0mYRU00d9ymx70h');

const StripePayment = ({ amount }) => {
  const [paymentComplete, setPaymentComplete] = useState(false);

  const handlePayment = async () => {
    const stripe = await stripePromise;
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: amount }),
    });
    const data = await response.json();

    const { error } = await stripe.redirectToCheckout({
      sessionId: data.clientSecret,
    });

    if (error) {
      console.error('An error occurred:', error.message);
    } else {
      setPaymentComplete(true);
    }
  };

  return (
    <>
      {paymentComplete ? (
        <div>Payment Successful!</div>
      ) : (
        <button onClick={handlePayment}>Pay Now</button>
      )}
    </>
  );
};

export default StripePayment;
