const admin = require("firebase-admin");
const express = require("express");
const router = express.Router();

const db = admin.database();
const brandsRef = db.ref("brands");

const brands = [
  {
    name: "Toyota",
  },
  {
    name: "Honda",
  },
  {
    name: "Ford",
  },
  {
    name: "Chevrolet",
  },
  {
    name: "Volkswagen",
  },
  {
    name: "Nissan",
  },
  {
    name: "Hyundai",
  },
  {
    name: "Mercedes-Benz",
  },
  {
    name: "BMW",
  },
  {
    name: "Audi",
  },
];

function seedBrands() {
  brands.forEach(async (brand) => {
    const snapshot = await brandsRef
      .orderByChild("name")
      .equalTo(brand.name)
      .once("value");
    if (!snapshot.exists()) {
      brandsRef.push(brand);
    }
  });
}

module.exports = router;
module.exports.seedBrands = seedBrands;

