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
  const { username, email, password, confirmPassword } = req.body;

  // Check if there are any existing users in the database
  const existingUsers = await prisma.users.findMany();

  if (existingUsers.length === 0) {
    // If there are no existing users, create the first user as an admin
    const newUser = await prisma.users.create({
      data: {
        username: username,
        email: email,
        password: password,
        // Assuming there is a field named full_name in your user schema
        full_name: req.body.full_name,
        // Set the isAdmin field to true for the first user
        isAdmin: true,
      },
    });

    console.log("Created new admin user:", newUser);
    // Return the created admin user with a 201 status code
    return res.status(201).json(newUser);
  } else {
    // Check if a user with the same email or username already exists
    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [
          {
            email: email,
          },
          {
            username: username,
          },
        ],
      },
    });

    if (existingUser) {
      // If a user with the same email or username already exists, return a 409 status code
      const error =
        "Registration failed: user with this username or email already exists";
      return res.status(409).json(error);
    } else {
      // Create a new non-admin user if no existing user found
      const newUser = await prisma.users.create({
        data: {
          username: username,
          email: email,
          password: password,
          // Assuming there is a field named full_name in your user schema
          full_name: req.body.full_name,
        },
      });

      console.log("Created new user:", newUser);
      // Return the created user with a 201 status code
      return res.status(201).json(newUser);
    }
  }
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
      const error = "Login failed: invalid credentials";
      res.status(401).json(error);
    }
  } catch (error) {
    // Handle database errors or other issues
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/cars/add", async (req, res) => {
  const { brand, model, year, type, pricePerMinute, engineCapacity } = req.body;

  try {
    const newCar = await prisma.cars.create({
      data: {
        brand: brand,
        model: model,
        year: year,
        type: type,
        pricePerMinute: pricePerMinute,
        engineCapacity: engineCapacity,
      },
    });

    console.log("Created new car:", newCar);
    // Return the created car with a 201 status code
    return res.status(201).json(newCar);
  } catch (error) {
    // Handle database errors or other issues
    console.error("Error during adding car:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/cars/get", async (req, res) => {
  try {
    const cars = await prisma.cars.findMany();
    return res.status(200).json(cars);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma client after the operation
  }
});

app.get("/api/users/get", async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma client after the operation
  }
});

app.get("/api/cars/get/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const car = await prisma.cars.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (car) {
      return res.status(200).json(car);
    } else {
      return res.status(404).json({ error: "Car not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
});

app.delete("/api/cars/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCar = await prisma.cars.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.status(200).json(deletedCar);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma client after the operation
  }
});

app.put("/api/cars/update/:id", async (req, res) => {
  const { id } = req.params;
  const { brand, model, year, type, pricePerMinute, engineCapacity } = req.body;
  try {
    const existingCar = await prisma.cars.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    const existingCarFields = {
      brand: existingCar.brand,
      model: existingCar.model,
      year: existingCar.year,
      type: existingCar.type,
      pricePerMinute: existingCar.pricePerMinute,
      engineCapacity: existingCar.engineCapacity,
    };

    const updatedCarFields = {
      brand,
      model,
      year,
      type,
      pricePerMinute,
      engineCapacity,
    };

    if (
      existingCarFields.brand === updatedCarFields.brand &&
      existingCarFields.model === updatedCarFields.model &&
      existingCarFields.year === updatedCarFields.year &&
      existingCarFields.type === updatedCarFields.type &&
      existingCarFields.pricePerMinute === updatedCarFields.pricePerMinute &&
      existingCarFields.engineCapacity === updatedCarFields.engineCapacity
    ) {
      return res.status(402).json(existingCar);
    }

    const updatedCar = await prisma.cars.update({
      where: {
        id: parseInt(id),
      },
      data: {
        brand: brand,
        model: model,
        year: year,
        type: type,
        pricePerMinute: pricePerMinute,
        engineCapacity: engineCapacity,
      },
    });
    return res.status(200).json(updatedCar);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma client after the operation
  }
});
