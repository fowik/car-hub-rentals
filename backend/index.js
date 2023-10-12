import { PrismaClient, Prisma } from "@prisma/client";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/api/users/register", async (req, res) => {
  const user = await prisma.users.create({
    data: {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      full_name: req.body.full_name,
    },
  });
  console.log(user);
  res.send(user);
});

app.post("/api/users/login", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await prisma.users.findFirst({
      where: {
        OR: [
          {
            username: username,
          },
          {
            email: email,
          },
        ],
      },
    });

    if (user && user.password === password) {
      // Passwords match, send a success response
      res.status(200).json(user);
    } else {
      // User not found or password doesn't match, send an error response
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    // Handle database errors or other issues
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
