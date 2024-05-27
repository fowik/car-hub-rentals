const admin = require("firebase-admin");
const express = require("express");
const router = express.Router();
const phoneUtil =
  require("google-libphonenumber").PhoneNumberUtil.getInstance();

// Register with email and password
router.post("/register", async (req, res) => {
  const { email, phoneNumber, password, displayName } = req.body;
  try {
    let parsedPhoneNumber;
    let userExists = false;

    try {
      parsedPhoneNumber = phoneUtil.parseAndKeepRawInput(phoneNumber);
      if (!phoneUtil.isValidNumber(parsedPhoneNumber)) {
        return res.status(400).json({ error: "Invalid phone number" });
      }
    } catch (error) {
      return res.status(400).json({ error: "Invalid phone number" });
    }

    // Check if phone number exists
    try {
      await admin.auth().getUserByPhoneNumber(phoneNumber);
      userExists = true;
    } catch (error) {
      userExists = false;
    }

    if (userExists) {
      return res.status(400).json({ error: "Phone number already exists" });
    }

    // Get region code
    const regionCode = phoneUtil.getRegionCodeForNumber(parsedPhoneNumber);

    // Check if email exists
    try {
      await admin.auth().getUserByEmail(email);
      userExists = true;
    } catch (error) {
      userExists = false;
    }

    if (userExists) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const userRecord = await admin.auth().createUser({ email, password });

    // Update user profile
    await admin.auth().updateUser(userRecord.uid, {
      displayName,
      phoneNumber,
    });

    // Check if it's the first user
    const listUsersResult = await admin.auth().listUsers();
    const isFirstUser = listUsersResult.users.length === 1;

    // Set custom claims
    if (isFirstUser) {
      await admin
        .auth()
        .setCustomUserClaims(userRecord.uid, { admin: true, balance: 0 });
    }

    const db = admin.database();
    const ref = db.ref("users/" + userRecord.uid);
    await ref.set({
      email,
      displayName,
      phoneNumber,
      isAdmin: isFirstUser,
      isVerified: userRecord.emailVerified,
      registrationDate: new Date().toISOString(),
      balance: 0,
    });

    res.json(userRecord);
  } catch (error) {
    switch (error.code) {
      case "auth/email-already-exists":
        res.status(400).json({ error: "Email already exists" });
        break;
      case "auth/invalid-email":
        res.status(400).json({ error: "Invalid email" });
        break;
      case "auth/invalid-password":
        res.status(400).json({ error: "Invalid password" });
        break;
      case "auth/operation-not-allowed":
        res.status(400).json({ error: "Operation not allowed" });
        break;
      default:
        res.status(500).json({ error: error.toString() });
        break;
    }
  }
});

router.post("/verifyEmail", async (req, res) => {
  const { uid } = req.body;
  try {
    const userRecord = await admin.auth().getUser(uid);
    const db = admin.database();
    const ref = db.ref("users/" + uid);
    await ref.update({
      isVerified: userRecord.emailVerified,
    });
    res.json({ message: "Email verification status updated" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

module.exports = router;
