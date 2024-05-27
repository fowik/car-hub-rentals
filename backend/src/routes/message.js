const admin = require("firebase-admin");
const express = require("express");
const router = express.Router();

const db = admin.database();
const messagesRef = db.ref("messages");

router.post("/create", async (req, res) => {
  const { uid, carId, message } = req.body;

  let messageFromBody = message;
  if (messageFromBody === "") {
    messageFromBody = "No message about car provided!:(";
  }

  try {
    const newMessageRef = messagesRef.push();
    await newMessageRef.set({
      uid,
      carId,
      message: messageFromBody,
      date: new Date().toISOString(),
      status: "Active",
    });

    res.json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

router.put("/update/status", async (req, res) => {
  const { messageId, status } = req.body;

  try {
    const messageRef = db.ref("messages/" + messageId);
    await messageRef.update({ status });

    res.json({ message: "Message status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

module.exports = router;
