require("dotenv").config();
const express = require("express");
const app = express();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const cors = require("cors");
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    allowedOrigins: ["http://localhost:5000"],
  })
);
app.use("/stripe", express.raw({ type: "*/*" }));

app.post("/payment", async (req, res) => {
  try {
    let { amount, name } = req.body;
    if (!amount || !name)
      return res
        .status(400)
        .json({ message: "Vous n'avez pas entré votre nom" });
    amount = parseInt(amount);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "EUR",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: { name },
    });
    const clientSecret = paymentIntent.client_secret;
    res.json({ message: "Payment initiated", clientSecret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/stripe", async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = await stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
  if (event.type === "payment_intent.created") {
    console.log(`${event.data.object.metadata.name} initated payment!`);
  }
  if (event.type === "payment_intent.succeeded") {
    console.log(`${event.data.object.metadata.name} succeeded payment!`);
  }
  res.json({ ok: true });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
