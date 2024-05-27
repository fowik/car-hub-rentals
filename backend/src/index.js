const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const path = require("path");
const portfinder = require("portfinder");
const http = require("http");
const ExcelJS = require("exceljs");
const bodyParser = require("body-parser");
const fs = require("fs");

const serviceAccount = require(path.resolve(
  __dirname,
  "./admin/serviceAccount.json"
));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://car-hub-130b6-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "gs://car-hub-130b6.appspot.com",
});

const app = express();
const server = http.createServer(app);

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: true }));

// Import routes
const usersRoutes = require("./routes/users");
const carsRoutes = require("./routes/cars");
const authRoutes = require("./routes/auth");
const typesRoutes = require("./routes/types");
const brandsRoutes = require("./routes/brands");
const statusesRoutes = require("./routes/statuses");
const reservationsRoutes = require("./routes/reservations");
const paymentsRoutes = require("./routes/stripepayments");
const messageRoutes = require("./routes/message");
const uploadRoutes = require("./routes/upload");

// Use routes
app.use("/users", usersRoutes);
app.use("/cars", carsRoutes);
app.use("/auth", authRoutes);
app.use("/types", typesRoutes);
app.use("/brands", brandsRoutes);
app.use("/statuses", statusesRoutes);
app.use("/reservations", reservationsRoutes);
app.use("/payments", paymentsRoutes);
app.use("/messages", messageRoutes);
app.use("/upload", uploadRoutes);

// Route to export data to CSV
app.post("/export-xlsx", async (req, res) => {
  try {
    // Reference to your Firebase Realtime Database
    const db = admin.database();
    const ref = db.ref(req.body.data);

    // Fetch data from the database
    const snapshot = await ref.once("value");
    const data = snapshot.val();

    // Create a new workbook
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Data");

    // Add headers
    const headers = Object.keys(data[Object.keys(data)[0]]);
    sheet.addRow(headers);

    // Add data rows
    Object.values(data).forEach((item) => {
      const row = [];
      headers.forEach((header) => row.push(item[header]));
      sheet.addRow(row);
    });

    // Send the workbook directly to the client
    res.setHeader("Content-Disposition", "attachment; filename=export.xlsx");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    await workbook.xlsx.write(res);
    res.status(200).end();
  } catch (error) {
    console.error("Error exporting XLSX:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/verify-license", async (req, res) => {
  const db = admin.database();

  const { data } = req.body;

  console.log(data);

  const licenseNo = data.licenseNo;
  const expiry = data.expiry;
  const dob = data.dob;
  const name = data.name;
  const surname = data.surname;
  const uid = data.uid;

  // Ensure uid is defined
  if (!uid) {
    return res.status(400).send("User ID is required");
  }

  const licenseRef = db.ref("licenses");

  const newLicenseRef = licenseRef.push();
  await newLicenseRef.set({
    licenseNo,
    expiry,
    dob,
    name,
    surname,
    uid,
  });

  // Update user name and surname in auth and realtime database
  const userRef = db.ref("users/" + uid);
  await userRef.update({ displayName: `${name} ${surname}` });

  await admin.auth().updateUser(uid, {
    displayName: `${name} ${surname}`,
  });

  res.status(200).send("License verified successfully");
});

// Find an available port and start the server
portfinder.getPort((err, port) => {
  if (err) {
    console.error(err);
    return;
  }

  server.listen(port, () => {
    console.log("Server running on port", port);

    brandsRoutes.seedBrands();
    typesRoutes.seedTypes();
    statusesRoutes.seedStatuses();
  });
});

exports.api = functions.https.onRequest(app);
