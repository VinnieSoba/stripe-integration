import React, { useState, useEffect } from 'react';
import { BrowserRouter as Routes, Route, BrowserRouter } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from './components/checkoutform.jsx/CheckoutForm';
import './App.css';
import Completed from './components/completed/Completed';



// loadStripe 
const stripePromise = loadStripe(process.env.STRIPE_SECRET_KEY);


function App() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("/create-payment-intent", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        body: JSON.stringify({
          items: [
            {
              id: "xl-tshirt"
            }
          ]
        }),

      }
    })
    .then(res => res.json())
    .then((data) => setClientSecret(data.setClientSecret));
  }, []);


  const appearance = {
    theme: 'stripe',
  }


  const options = {
    clientSecret,
    appearance,
  }


  return (
    <div className="App">
      <h1>Welcome to Stripe</h1>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      )}

      <div className="navigation">
        <BrowserRouter>
          <Routes>
            <Route path="/"></Route>
            <Route path="/completed" element={<Completed />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
