import { db } from "@/firebase/firebase";
import { ref, get } from "firebase/database";

// get this month reservations from realtime database
async function fetchReservationData() {
  // Initialize an object to store brand counts
  const brandCounts = {};

  // Fetch reservations
  const reservationsRef = ref(db, "reservations");
  const snapshot = await get(reservationsRef);
  const reservationData = snapshot.val();

  // Get the current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-based
  const currentYear = currentDate.getFullYear();

  // Iterate over reservations to count brands
  for (const reservationId in reservationData) {
    const reservation = reservationData[reservationId];

    // Check if the reservation is in the current month
    const reservationDate = new Date(reservation.startTime); // Assuming reservation.date is in a parseable format
    const reservationMonth = reservationDate.getMonth() + 1;
    const reservationYear = reservationDate.getFullYear();

    if (reservationMonth === currentMonth && reservationYear === currentYear) {
      // If carBrand is not directly available, fetch car details from cars table
      const carId = reservation.carId;
      const carRef = ref(db, `cars/${carId}`);
      const carSnapshot = await get(carRef);
      const carData = carSnapshot.val();

      // Get the car brand
      const carBrand = carData.brand;

      // Increment count for each brand
      if (carBrand) {
        if (brandCounts[carBrand]) {
          brandCounts[carBrand] += 1;
        } else {
          brandCounts[carBrand] = 1;
        }
      } else {
        console.error("Car brand not found for carId:", carId);
      }
    }
  }

  // Convert brandCounts object to arrays for labels and data
  const labels = Object.keys(brandCounts);
  const data = Object.values(brandCounts);

  return { labels, data };
}

const reservations = await fetchReservationData();
const labels = reservations.labels || [];
const data = reservations.data || [];

export const randomData = () => ({
  labels: labels.map((label) => label),
  datasets: [
    {
      label: "Reservations",
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
      data: data.map((value) => value),
    },
  ],
});

export const options = {
  responsive: true,
  maintainAspectRatio: false,
};
