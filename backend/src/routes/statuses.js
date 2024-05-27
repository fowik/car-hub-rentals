const admin = require("firebase-admin");
const express = require("express");
const router = express.Router();

const db = admin.database();
const statusesRef = db.ref("statuses");

const statuses = [
  {
    name: "Available",
  },
  {
    name: "Maintenance",
  },
  {
    name: "Reserved",
  },
];

function seedStatuses() {
  statuses.forEach(async (status) => {
    const snapshot = await statusesRef
      .orderByChild("name")
      .equalTo(status.name)
      .once("value");
    if (!snapshot.exists()) {
      statusesRef.push(status);
    }
  });
}

module.exports = router;
module.exports.seedStatuses = seedStatuses;
