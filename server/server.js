const express = require("express");
const app = express();

const env = require("dotenv").config({ path: "./.env"});

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(express.static("public"));
app.use(express.json());


const calculateOrderAmount = (items) => {
    return 1400;
};

app.post("/create-payment-intent", async (res, req) => {

    const { items } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "gbp",
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
})


app.get('/secret', async(req, res) => {
    const intent = // .. create the paymentIntent
    res.json({ client_secret: intent.client_secret});
})




app.get('/config', (req, res) => {
    res.send({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
})



app.listen(5252, () => {
console.log("Running server on port 5252");
});