const admin = require("firebase-admin");
const express = require("express");
const router = express.Router();

router.put("/update", async (req, res) => {
  const { uid, email, displayName, isAdmin, phoneNumber } = req.body;

  try {
    let userByEmail;
    try {
      userByEmail = await admin.auth().getUserByEmail(email);
    } catch (error) {
      if (error.code !== "auth/user-not-found") {
        throw error;
      }
    }

    if (userByEmail && userByEmail.uid !== uid) {
      return res.status(400).json({ error: "Email already in use" });
    }

    let userByPhoneNumber;
    try {
      userByPhoneNumber = await admin.auth().getUserByPhoneNumber(phoneNumber);
    } catch (error) {
      if (error.code !== "auth/user-not-found") {
        throw error;
      }
    }

    if (userByPhoneNumber && userByPhoneNumber.uid !== uid) {
      return res.status(400).json({ error: "Phone number already in use" });
    }

    await admin.auth().updateUser(uid, {
      email,
      displayName,
      phoneNumber,
    });

    console.log("isAdmin", isAdmin);

    await admin.auth().setCustomUserClaims(uid, { admin: isAdmin });

    const db = admin.database();
    const ref = db.ref("users/" + uid);
    await ref.update({
      email,
      displayName,
      phoneNumber,
      isAdmin,
    });

    res.status(200).json({ message: "User data updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.toString() });
  }
});

router.delete("/delete", async (req, res) => {
  const { uid } = req.body;

  try {
    await admin.auth().deleteUser(uid);

    const db = admin.database();
    const ref = db.ref("users/" + uid);
    await ref.remove();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.toString() });
  }
});

module.exports = router;
