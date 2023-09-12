import React, { useEffect, useState } from 'react';
import {
    PaymentElement,
    LinkAuthenticationElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js'



function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        
        if(!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if(!clientSecret){
            return;
        }
    
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status){
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful. please try again.");
                    break;
                    default: 
                    setMessage("Something went wrong.");
                    break;
            
            }
        });
    
     }, [stripe]);

     // handle the logic on submit
     const handleSubmit = async (e) => {
        
        if(!stripe || !elements) {
            // Stripe.js hasn't yet loaded 
            // submission is disabled until stripe has been loaded
            return;
        }
       setIsLoading(true);

       // redirect user to completed page
       const { error } = await stripeConfirmPayment({
        elements,
        confirmParams: {
            return_url: "h"
        }
       });
     }



  return (
    <div>Checkout Form</div>
  )
}

export default CheckoutForm