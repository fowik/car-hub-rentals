const admin = require("firebase-admin");
const express = require("express");
const router = express.Router();
const db = admin.database();

router.post("/create", async (req, res) => {
  const { uid, carId, price } = req.body;
  const startTime = new Date().toISOString();

  console.log(uid, carId, price, startTime);
  const reservationsRef = db.ref("reservations");
  const carsRef = db.ref("cars");

  const carSnapshot = await carsRef.child(carId).once("value");
  const carStatus = carSnapshot.val().status;

  if (carStatus !== "Available" && carStatus !== "Maintenance") {
    res.status(400).send({ error: "Car is not available for reservation!" });
    return;
  }

  const userReservationsSnapshot = await reservationsRef
    .orderByChild("uid")
    .equalTo(uid)
    .once("value");
  const userReservations = userReservationsSnapshot.val();

  if (userReservations) {
    const activeReservation = Object.values(userReservations).find(
      (reservation) => reservation.endTime === ""
    );
    if (activeReservation) {
      res
        .status(400)
        .send({ error: "You already have an active reservation!" });
      return;
    }
  }

  // check if user has enough balance
  const userSnapshot = await db.ref("users").child(uid).once("value");
  const user = userSnapshot.val();

  if (user.balance < 0) {
    res.status(400).send({ error: "Insufficient balance!" });
    return;
  }

  reservationsRef.push({
    uid,
    carId,
    startTime: startTime,
    endTime: "",
    price: price,
    totalPrice: 0,
    status: "Ongoing",
  });

  // Обновляем статус машины
  carsRef.child(carId).update({ status: "Reserved" });

  res.status(200).send("Reservation created successfully");
});

router.put("/end/:id", async (req, res) => {
  const { id, carId, endTime, totalPrice, status } = req.body;

  console.log(id, carId, endTime, totalPrice, status);

  const reservationsRef = db.ref("reservations");
  const carsRef = db.ref("cars");

  const reservationSnapshot = await reservationsRef.child(id).once("value");
  const reservation = reservationSnapshot.val();

  if (!reservation) {
    res.status(404).send({ error: "Reservation not found!" });
    return;
  }

  if (reservation.endTime !== "") {
    res.status(400).send({ error: "Reservation already ended!" });
    return;
  }

  // Update user balance to reflect the reservation and custom claim
  const usersRef = db.ref("users");
  const userSnapshot = await usersRef.child(reservation.uid).once("value");
  const user = userSnapshot.val();

  const newBalance = user.balance - totalPrice;

  console.log("New balance:", newBalance);

  // Проверяем, достаточно ли у пользователя средств для оплаты резервации
  if (newBalance >= 0.01) {
    // Если у пользователя достаточно средств, обновляем его баланс и статус резервации
    usersRef.child(reservation.uid).update({ balance: newBalance });

    // Устанавливаем статус резервации в "Paid"
    reservationsRef.child(id).update({ endTime, totalPrice, status: "Paid" });

    try {
      const user = await admin.auth().getUser(reservation.uid);
      const customClaims = user.customClaims || {};
      customClaims.balance = newBalance;

      await admin.auth().setCustomUserClaims(reservation.uid, customClaims);
    } catch (error) {
      console.error("Error updating custom claim:", error);
      res.status(500).send({ error: "Failed to update custom claim" });
      return;
    }
  } else {
    // Если у пользователя недостаточно средств, обновляем баланс и отнимаем баланс от стоимости резервации
    usersRef.child(reservation.uid).update({ balance: 0 });

    console.log(newBalance, totalPrice, totalPrice - newBalance);

    reservationsRef.child(id).update({ endTime, totalPrice, status: "Paid" });

    try {
      const user = await admin.auth().getUser(reservation.uid);
      const customClaims = user.customClaims || {};
      customClaims.balance = newBalance;

      await admin.auth().setCustomUserClaims(reservation.uid, customClaims);

      // Обновить пользовательский баланс в базе данных
      await usersRef.child(reservation.uid).update({ balance: newBalance });
    } catch (error) {
      console.error("Error updating custom claim:", error);
      res.status(500).send({ error: "Failed to update custom claim" });
      return;
    }
  }

  carsRef.child(carId).update({ status: "Available" });

  res.status(200).send("Reservation ended successfully");
});

router.put("/update/status", async (req, res) => {
  const { rentalId, status } = req.body;

  try {
    const reservationRef = db.ref("reservations/" + rentalId);
    await reservationRef.update({ status });

    res.json({ message: "Reservation status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

module.exports = router;

module.exports = router;
