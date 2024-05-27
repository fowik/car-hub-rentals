import { db } from "@/firebase/firebase.js";
import { collection, onSnapshot } from "firebase/firestore";

export async function getCars() {
  return new Promise((resolve, reject) => {
    try {
      const cars = [];
      const carsCollection = collection(db, "cars");

      onSnapshot(carsCollection, (snapshot) => {
        snapshot.forEach((doc) => {
          const carData = { id: doc.id, ...doc.data() };
          cars.push(carData);
        });
        resolve(cars);
      });
    } catch (error) {
      console.error("Error fetching cars:", error);
      reject(error);
    }
  });
}
