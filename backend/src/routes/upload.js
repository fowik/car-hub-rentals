const admin = require("firebase-admin");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const multer = require("multer");
const stream = require("stream");

router.use(cors({ origin: true }));

// Configure multer for file upload with memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("image"), async (req, res) => {
  const file = req.file;
  console.log("Uploaded file info:", file);

  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  const bucket = admin.storage().bucket();
  const filename = file.originalname;
  const fileStream = new stream.PassThrough();
  fileStream.end(file.buffer);

  try {
    const fileRef = bucket.file(filename);
    const stream = fileStream.pipe(
      fileRef.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
        resumable: false,
      })
    );

    stream.on("error", (err) => {
      console.error("Error during upload:", err);
      res.status(500).send(err);
    });

    stream.on("finish", () => {
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
        bucket.name
      }/o/${encodeURIComponent(filename)}?alt=media`;
      console.log("File uploaded successfully:", publicUrl);
      res.status(200).send(publicUrl);
    });
  } catch (error) {
    console.error("Error during upload:", error);
    res.status(500).send(error);
  }
});

module.exports = router;
