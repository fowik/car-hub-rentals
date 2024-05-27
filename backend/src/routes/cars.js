const admin = require("firebase-admin");
const express = require("express");
const router = express.Router();

const db = admin.database();
const carsRef = db.ref("cars");

router.get("/:key", async (req, res) => {
  try {
    const snapshot = await carsRef.child(req.params.key).once("value");
    const car = snapshot.val();

    if (car) {
      res.json(car);
    } else {
      res.status(404).json({ error: "Car not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

router.post("/create", async (req, res) => {
  try {
    const {
      registration,
      brand,
      model,
      year,
      type,
      capacity,
      pricePerMinute,
      carLatitude,
      carLongitude,
    } = req.body;

    const newCarRef = carsRef.push();
    await newCarRef.set({
      registration,
      brand,
      model,
      year,
      type,
      capacity,
      pricePerMinute,
      carLatitude,
      carLongitude,
      imageUrl: "",
      status: "Maintenance",
    });

    const carId = newCarRef.key;
    // send new car key to the client
    res.status(201).send(carId);
  } catch (error) {
    console.error("Error adding car:", error);
    console.error("Detailed error information:", error.stack); // More detailed logging
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

router.put("/update-image/:id", async (req, res) => {
  const { id } = req.params;
  const { imageUrl } = req.body;

  try {
    const carRef = carsRef.child(id);

    // Update car details in the database
    await carRef.update({
      imageUrl,
    });

    res.json({ message: "Car updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const {
    registration,
    brand,
    model,
    year,
    type,
    capacity,
    carLatitude,
    carLongitude,
    pricePerMinute,
    status,
  } = req.body;

  try {
    const carRef = carsRef.child(id);

    // Get the existing car data
    const snapshot = await carRef.once("value");
    const existingCarData = snapshot.val();

    if (!existingCarData) {
      return res.status(404).json({ error: "Car not found" });
    }

    // Update car details in the database
    await carRef.update({
      registration,
      brand,
      model,
      year,
      type,
      capacity,
      status,
      pricePerMinute,
      carLatitude,
      carLongitude,
    });

    res.json({ message: "Car updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/delete", async (req, res) => {
  const { key, imageUrl } = req.body;

  console.log(req.body); // Log the request body

  try {
    const db = admin.database();
    const ref = db.ref("cars/" + key);
    await ref.remove();
  } catch (error) {
    console.error("Error removing from database:", error);
    return res
      .status(500)
      .json({ error: "Error removing from database: " + error.toString() });
  }

  try {
    // delete image
    if (imageUrl) {
      console.log(imageUrl);
      const filename = imageUrl
        .split("https://storage.googleapis.com/car-hub-130b6.appspot.com/")[1]
        .split("?")[0];
      const file = bucket.file(filename);
      await file.delete();
    } else {
      console.error("imageUrl is undefined");
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    return res
      .status(500)
      .json({ error: "Error deleting image: " + error.toString() });
  }
  res.json({ message: "Car deleted" });
});

module.exports = router;
