const admin = require("firebase-admin");
const express = require("express");
const router = express.Router();

const db = admin.database();
const typesRef = db.ref("types");

const types = [
  {
    name: "Sedan",
  },
  {
    name: "SUV",
  },
  {
    name: "Truck",
  },
  {
    name: "Coupe",
  },
  {
    name: "Convertible",
  },
  {
    name: "Van",
  },
  {
    name: "Wagon",
  },
  {
    name: "Hatchback",
  },
  {
    name: "Crossover",
  },
  {
    name: "Minivan",
  },
];

// add types to database
function seedTypes() {
  types.forEach(async (type) => {
    const snapshot = await typesRef
      .orderByChild("name")
      .equalTo(type.name)
      .once("value");
    if (!snapshot.exists()) {
      typesRef.push(type);
    }
  });
}

module.exports = router;
module.exports.seedTypes = seedTypes;
