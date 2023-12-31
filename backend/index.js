import { PrismaClient, Prisma } from "@prisma/client";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { carTypesSeed } from "./prisma/seeds/carTypes.js";
import { carBrandsSeed } from "./prisma/seeds/carBrands.js";
import { carsSeed } from "./prisma/seeds/cars.js";

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Seed car brands
for (const brand of carBrandsSeed) {
  const existingBrand = await prisma.carBrands.findUnique({
    where: { BrandName: brand.BrandName },
  });

  if (!existingBrand) {
    try {
      await prisma.carBrands.create({
        data: {
          BrandName: brand.BrandName,
          // ... other fields if present
        },
      });
      console.log(`Brand ${brand.BrandName} created`);
    } catch (error) {
      console.error(`Error creating brand ${brand.BrandName}:`, error);
    }
  } else {
    // console.log(`Brand ${brand.BrandName} already exists, skipping creation`);
  }
}

// Seed car types
for (const type of carTypesSeed) {
  const existingType = await prisma.carTypes.findUnique({
    where: { typeName: type.typeName },
  });

  if (!existingType) {
    try {
      await prisma.carTypes.create({
        data: {
          typeName: type.typeName,
          // ... other fields if present
        },
      });
      console.log(`Type ${type.typeName} created`);
    } catch (error) {
      console.error(`Error creating type ${type.typeName}:`, error);
    }
  } else {
    // console.log(`Type ${type.typeName} already exists, skipping creation`);
  }
}

// Seed cars
for (const car of carsSeed) {
  const existingCar = await prisma.cars.findUnique({
    where: { registration: car.registration },
  });

  if (!existingCar) {
    try {
      await prisma.cars.create({
        data: {
          brandId: car.brandId,
          model: car.model,
          year: car.year,
          registration: car.registration,
          available: car.available,
          createdAt: car.createdAt,
          updatedAt: car.updatedAt,
          engineCapacity: car.engineCapacity,
          pricePerMinute: car.pricePerMinute,
          typeId: car.typeId,
        },
      });
      console.log(`Car ${car.registration} created`);
    } catch (error) {
      console.error(`Error creating car ${car.registration}:`, error);
    }
  }
}

app.post("/api/users/register", async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  const updatedAt = new Date();
  const existingUsers = await prisma.users.findMany();

  if (existingUsers.length === 0) {
    const newUser = await prisma.users.create({
      data: {
        username: username,
        email: email,
        password: password,
        full_name: req.body.full_name,
        isAdmin: true,
        updatedAt: updatedAt,
      },
    });

    console.log("Created new admin user:", newUser);
    return res.status(201).json(newUser);
  } else {
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
          full_name: req.body.full_name,
          updatedAt: updatedAt,
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
      const date = user.updatedAt.toISOString().split("T")[0];
      const time = user.updatedAt.toTimeString().split(" ")[0];

      user.updatedAt = `${date} ${time}`; // Update the updatedAt field with a formatted string
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
  const { brandId, model, year, typeId, pricePerMinute, engineCapacity } =
    req.body;

  try {
    const newCar = await prisma.cars.create({
      data: {
        brandId: brandId, // Replace 'brand' with 'brandId'
        model: model,
        year: year,
        typeId: typeId, // Assuming 'type' is supposed to be 'typeId'
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
    const cars = await prisma.cars.findMany({
      include: {
        brand: {
          select: {
            BrandName: true,
          },
        },
        type: {
          select: {
            typeName: true,
          },
        },
      },
    });

    // Extracting brandName and typeName
    const formattedCars = cars.map((car) => ({
      id: car.id,
      brandName: car.brand.BrandName, // Getting brandName directly
      typeName: car.type.typeName,
      model: car.model,
      year: car.year,
      registration: car.registration,
      pricePerMinute: car.pricePerMinute,
      engineCapacity: car.engineCapacity,
      available: car.available,
      createdAt: car.createdAt,
      updatedAt: car.updatedAt,
      bookings: car.bookings,
    }));

    return res.status(200).json(formattedCars);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma client after the operation
  }
});

app.get("/api/brands/get", async (req, res) => {
  try {
    const brands = await prisma.carBrands.findMany();
    return res.status(200).json(brands);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma client after the operation
  }
});

app.get("/api/brands/get/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await prisma.carBrands.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (brand) {
      console.log(brand);
      return res.status(200).json(brand);
    } else {
      return res.status(404).json({ error: "Brand not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
});

app.get("/api/types/get", async (req, res) => {
  try {
    const types = await prisma.carTypes.findMany();
    return res.status(200).json(types);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma client after the operation
  }
});

app.get("/api/types/get/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const type = await prisma.carTypes.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (type) {
      console.log(type);
      return res.status(200).json(type);
    } else {
      return res.status(404).json({ error: "Type not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect();
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

app.get("/api/users/get/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.users.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
});

app.get("/api/cars/get/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const car = await prisma.cars.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        brand: {
          select: {
            BrandName: true,
          },
        },
        type: {
          select: {
            typeName: true,
          },
        },
      },
    });

    if (car) {
      const formattedCar = {
        id: car.id,
        brandName: car.brand.BrandName,
        typeName: car.type.typeName,
        model: car.model,
        year: car.year,
        registration: car.registration,
        pricePerMinute: car.pricePerMinute,
        engineCapacity: car.engineCapacity,
        available: car.available,
        createdAt: car.createdAt,
        updatedAt: car.updatedAt,
        bookings: car.bookings,
      };
      return res.status(200).json(formattedCar);
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

app.delete("/api/users/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await prisma.users.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.status(200).json(deletedUser);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma client after the operation
  }
});

app.put("/api/cars/update/:id", async (req, res) => {
  const { id } = req.params;
  const {
    brandName,
    typeName,
    model,
    year,
    registration,
    pricePerMinute,
    engineCapacity,
  } = req.body;

  try {
    // Find the IDs for the provided brand and type names
    const brand = await prisma.carBrands.findUnique({
      where: {
        BrandName: brandName,
      },
    });

    const type = await prisma.carTypes.findUnique({
      where: {
        typeName: typeName,
      },
    });

    const existingCar = await prisma.cars.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        brand: true,
        type: true,
      },
    });

    const existingCarFields = {
      brandId: existingCar.brand.id,
      typeId: existingCar.type.id,
      model: existingCar.model,
      year: existingCar.year,
      registration: existingCar.registration,
      pricePerMinute: existingCar.pricePerMinute,
      engineCapacity: existingCar.engineCapacity,
    };

    const updatedCarFields = {
      brandId: brand ? brand.id : existingCarFields.brandId,
      typeId: type ? type.id : existingCarFields.typeId,
      model,
      year,
      registration,
      pricePerMinute,
      engineCapacity,
    };

    // console.log("Existing Fields:", existingCarFields);
    // console.log("Updated Fields:", updatedCarFields);

    if (
      JSON.stringify(existingCarFields) === JSON.stringify(updatedCarFields)
    ) {
      return res.status(402).json(existingCar);
    }

    const updatedCar = await prisma.cars.update({
      where: {
        id: parseInt(id),
      },
      data: {
        brandId: updatedCarFields.brandId,
        typeId: updatedCarFields.typeId,
        model,
        year,
        registration,
        pricePerMinute,
        engineCapacity,
      },
      include: {
        brand: true,
        type: true,
      },
    });

    return res.status(200).json(updatedCar);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma client after the operation
  }
});

app.put("/api/users/update/:id", async (req, res) => {
  const { id } = req.params;
  const { username, email, password, full_name, isAdmin } = req.body;
  const currentTime = new Date();
  try {
    const existingUser = await prisma.users.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    const existingUserFields = {
      username: existingUser.username,
      email: existingUser.email,
      password: existingUser.password,
      full_name: existingUser.fullName,
      isAdmin: existingUser.isAdmin,
    };

    const updatedUserFields = {
      username,
      email,
      password,
      full_name,
      isAdmin,
    };

    if (
      existingUserFields.username === updatedUserFields.username &&
      existingUserFields.email === updatedUserFields.email &&
      existingUserFields.password === updatedUserFields.password &&
      existingUserFields.full_name === updatedUserFields.full_name &&
      existingUserFields.isAdmin === updatedUserFields.isAdmin
    ) {
      return res.status(402).json(existingUser);
    }

    console.log("Existing Fields:", existingUserFields);
    console.log("Updated Fields:", updatedUserFields);
    const updatedUser = await prisma.users.update({
      where: {
        id: parseInt(id),
      },
      data: {
        username: username,
        email: email,
        password: password,
        fullName: full_name,
        isAdmin: isAdmin,
        updatedAt: currentTime,
      },
    });
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma client after the operation
  }
});

app.get("/api/bookings/get/:userId", async (req, res) => {
  const { userId } = req.params;

  const userIdInt = parseInt(userId, 10);
  try {
    const bookings = await prisma.bookings.findMany({
      where: {
        userId: userIdInt,
      },
      include: {
        cars: {
          include: {
            brand: {
              select: {
                BrandName: true,
              },
            },
            type: {
              select: {
                typeName: true,
              },
            },
          },
        },
      },
    });

    if (bookings && bookings.length > 0) {
      const formattedBookings = bookings.map((booking) => {
        const { startTime, endTime, duration } = booking;

        const startTimeFormatted = `${startTime.toISOString().split("T")[0]} ${
          startTime.toTimeString().split(" ")[0]
        }`;
        const endTimeFormatted = `${endTime.toISOString().split("T")[0]} ${
          endTime.toTimeString().split(" ")[0]
        }`;

        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = Math.floor((duration % 3600) % 60);

        const formattedDuration = `${hours
          .toString()
          .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`;

        return {
          ...booking,
          startTime: startTimeFormatted,
          endTime: endTimeFormatted,
          duration: formattedDuration,
        };
      });

      return res.status(200).json(formattedBookings);
    } else {
      return res.status(404).json({ message: "No bookings found" });
    }
  } catch (error) {
    console.error("Error getting bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/bookings/start/:carId/:userId", async (req, res) => {
  const { userId, carId } = req.params;

  const userIdInt = parseInt(userId, 10);
  const carIdInt = parseInt(carId, 10);
  const currentTime = new Date();

  try {
    const existingUserBookings = await prisma.bookings.findFirst({
      where: {
        userId: userIdInt,
        status: "ACTIVE",
      },
    });

    if (existingUserBookings !== null) {
      return res
        .status(201)
        .json({ message: "User already has an active booking" });
    }

    const isCarAvailable = await prisma.cars.findUnique({
      where: {
        id: carIdInt,
      },
      select: {
        available: true,
      },
    });

    if (!isCarAvailable.available) {
      return res.status(202).json({ message: "Car is already reserved" });
    }

    let newBooking;

    await prisma.$transaction(async (prisma) => {
      newBooking = await prisma.bookings.create({
        data: {
          userId: userIdInt,
          carId: carIdInt,
          startTime: currentTime,
          endTime: currentTime, // Update endTime as needed
          createdAt: currentTime,
          updatedAt: currentTime,
          bookedPrice: 0,
          duration: 0,
          status: "ACTIVE",
        },
      });

      if (newBooking) {
        const updatedCar = await prisma.cars.update({
          where: {
            id: carIdInt,
          },
          data: {
            available: false,
          },
        });

        console.log("Created new booking:", newBooking);
      }
    });

    if (newBooking) {
      return res.status(200).json(newBooking);
    } else {
      return res.status(500).json({ error: "Failed to create booking" });
    }
  } catch (error) {
    console.error("Error during adding booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/bookings/get/active/:userId", async (req, res) => {
  const { userId } = req.params;
  const currentTime = new Date();

  const userIdInt = parseInt(userId, 10);
  try {
    const activeBooking = await prisma.bookings.findFirst({
      where: {
        userId: userIdInt,
        status: "ACTIVE",
      },
      include: {
        cars: {
          include: {
            brand: {
              select: {
                BrandName: true,
              },
            },
            type: {
              select: {
                typeName: true,
              },
            },
          },
        },
      },
    });

    if (activeBooking) {
      if (activeBooking) {
        const startTime = activeBooking.startTime;
        const durationInMilliseconds = currentTime - startTime;
        const durationInSeconds = durationInMilliseconds / 1000;

        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        const seconds = Math.floor((durationInSeconds % 3600) % 60);

        // Add the duration to the activeBooking object
        const formattedDuration = `${hours
          .toString()
          .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`;
        activeBooking.duration = formattedDuration;

        // Calculate the price for the active booking

        const pricePerMinute = activeBooking.cars.pricePerMinute;
        const pricePerSecond = pricePerMinute / 60;
        const price = pricePerSecond * durationInSeconds;
        activeBooking.bookedPrice = price.toFixed(2);

        const date = startTime.toISOString().split("T")[0];
        const time = startTime.toTimeString().split(" ")[0];

        activeBooking.startTime = `${date} ${time}`;
        // Update the active booking with the calculated duration and price

        const updatedBooking = await prisma.bookings.update({
          where: {
            id: activeBooking.id,
          },
          data: {
            duration: durationInSeconds,
            bookedPrice: parseFloat(price.toFixed(2)),
          },
        });

        return res.status(200).json(activeBooking);
      }
    } else if (activeBooking === null) {
      return;
    } else {
      return res.status(404).json({ message: "No active bookings found" });
    }
  } catch (error) {
    console.error("Error getting active bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/bookings/end/:bookingId", async (req, res) => {
  const { bookingId } = req.params;

  try {
    const bookingIdInt = parseInt(bookingId, 10);
    const booking = await prisma.bookings.findUnique({
      where: {
        id: bookingIdInt,
      },
      include: {
        cars: {
          include: {
            brand: {
              select: {
                BrandName: true,
              },
            },
            type: {
              select: {
                typeName: true,
              },
            },
          },
        },
      },
    });

    const startTime = booking.startTime;
    const endTime = new Date();
    const durationInMilliseconds = endTime - startTime;
    const durationInSeconds = durationInMilliseconds / 1000;

    // Calculate the price for the active booking

    const pricePerMinute = booking.cars.pricePerMinute;
    const pricePerSecond = pricePerMinute / 60;
    const price = pricePerSecond * durationInSeconds;

    const bookingEnd = await prisma.bookings.update({
      where: {
        id: bookingIdInt,
      },
      data: {
        endTime: endTime,
        status: "COMPLETED",
        duration: durationInSeconds,
        bookedPrice: parseFloat(price.toFixed(2)),
      },
    });

    if (bookingEnd) {
      const updatedCar = await prisma.cars.update({
        where: {
          id: booking.carId,
        },
        data: {
          available: true,
        },
      });
    }
    res.status(200).json(booking);
  } catch (error) {
    console.error("Error ending reservation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
