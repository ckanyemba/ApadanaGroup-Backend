const express = require("express");
const Stripe = require("stripe");
const { Order } = require("../models/order");

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY);
const router = express.Router();

// Create a checkout session
router.post("/create-checkout-session", async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      metadata: {
        userId: req.body.userId,
      },
    });

    const line_items = req.body.cartItems.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.image.url],
            description: item.desc,
            metadata: {
              id: item.id,
            },
          },
          unit_amount: item.price * 100,
        },
        quantity: item.cartQuantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "KE"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "usd",
            },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1500,
              currency: "usd",
            },
            display_name: "Next day air",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
      customer: customer.id,
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    res.status(201).json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while creating the checkout session.");
  }
});

// Create an order function
const createOrder = async (customer, data, lineItems) => {
  try {
    const newOrder = new Order({
      userId: customer.metadata.userId,
      customerId: data.customer,
      paymentIntentId: data.payment_intent,
      products: lineItems.data,
      subtotal: data.amount_subtotal,
      total: data.amount_total,
      shipping: data.customer_details,
      payment_status: data.payment_status,
    });

    const savedOrder = await newOrder.save();
    console.log("Processed Order:", savedOrder);
  } catch (err) {
    console.error(err);
  }
};

// Stripe webhook
router.post("/webhook", express.json({ type: "application/json" }), async (req, res) => {
  try {
    let data;
    let eventType;

    // Check if webhook signing is configured.
    let webhookSecret = process.env.STRIPE_WEB_HOOK;

    if (webhookSecret) {
      // Verify the signature and retrieve the event.
      const signature = req.headers["stripe-signature"];
      const event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
      data = event.data.object;
      eventType = event.type;
    } else {
      // Retrieve the event data directly from the request body.
      data = req.body.data.object;
      eventType = req.body.type;
    }

    if (eventType === "checkout.session.completed") {
      const customer = await stripe.customers.retrieve(data.customer);
      const lineItems = await stripe.checkout.sessions.listLineItems(data.id, {});
      createOrder(customer, data, lineItems);
    }

    res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while processing the Stripe webhook.");
  }
});

module.exports = router;
