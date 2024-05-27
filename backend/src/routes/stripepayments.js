const express = require("express");
const admin = require("firebase-admin");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51PGKSY2MtXT11OOiWK1J8ZXlJp1dgjkyiZxIGYyMDF0U7ppZSKc57C7JAIl7HVFLKdEQexEf0E58C2QRvxmypTjM00P2e7S93B"
);

// Create checkout session and change custom claims for current user
router.post("/create-checkout-session", async (req, res) => {
  const { addFunds } = req.body;
  let moneyAdd = 0;

  const line_items = [
    {
      price_data: {
        currency: "usd",
        product_data: {
          name: "Add funds to balance",
        },
        unit_amount: Math.round(addFunds.amount * 100),
      },
      quantity: 1,
    },
  ];

  if (addFunds.moneyAdded === true) {
    moneyAdd = 0.5;
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: line_items,
      // success_url: `http://localhost:8080/profile?success=true&amount=${addFunds.amount}&amountAdded=${moneyAdd}`,
      // cancel_url: `http://localhost:8080/profile?cancelled=true`,
      success_url: `https://car-hub-130b6.web.app/profile?success=true&amount=${addFunds.amount}&amountAdded=${moneyAdd}`,
      cancel_url: `https://car-hub-130b6.web.app/profile?cancelled=true`,
    });

    console.log(line_items);

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error adding funds:", error);
    res.status(500).json({ error: "Failed to add funds" });
  }
});
// Update user balance to reflect the reservation and custom claim

router.put("/update-balance", async (req, res) => {
  const { uid, balance, moneyAdded } = req.body;

  const user = await admin.auth().getUser(uid);
  const customClaims = user.customClaims || {};

  // Ensure the values are numbers
  const oldBalance = Number(customClaims.balance) || 0;
  const newBalance = Number(balance) || 0;
  const newMoneyAdded = Number(moneyAdded) || 0;

  if (newMoneyAdded === 0) {
    updatedBalance = oldBalance + newBalance;
    console.log("Updated balance:", updatedBalance);
  } else {
    updatedBalance = oldBalance + newBalance - newMoneyAdded;
  }

  try {
    // Update the user's balance in the custom claims
    customClaims.balance = updatedBalance;
    await admin.auth().setCustomUserClaims(uid, customClaims);

    const usersRef = admin.database().ref("users");
    await usersRef.child(uid).update({ balance: updatedBalance });

    const reservationsRef = admin.database().ref("reservations");
    const snapshot = await reservationsRef
      .orderByChild("uid")
      .equalTo(uid)
      .get();

    if (snapshot.exists()) {
      const reservations = snapshot.val();

      for (const key in reservations) {
        if (reservations[key].status === "Cancelled") {
          await reservationsRef.child(key).update({ status: "Paid" });
        }
      }
    }

    console.log("Custom claim updated successfully");
    res.status(200).send("Custom claim updated successfully");
  } catch (error) {
    console.error("Error updating custom claim:", error);
    res.status(500).send({ error: "Failed to update custom claim" });
  }
});

module.exports = router;
