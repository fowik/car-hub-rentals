<template>
  <section
    id="cars"
    class="d-flex align-items-center align-middle justify-content-center flex-column p-4"
  >
    <div>
      <h1 class="pb-5">Our Cars</h1>
    </div>
    <div class="card-container container slider col-xs-12 col-md-12">
      <div
        class="card d-inline-block ms-4 me-4 mb-5 align-top"
        v-for="(car, index) in cars"
        :key="index"
      >
        <div class="img-container">
          <img class="card-img-top" :src="car.imageUrl" alt="Car Image" />
        </div>
        <div class="card-body">
          <h4 class="card-title">{{ car.brand }}</h4>
          <p class="card-text">{{ car.price }} €</p>
          <a href="/reservation" class="btn btn-primary">Reserve</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { db } from "@/firebase/firebase";
import { onValue, ref } from "firebase/database";

export default {
  name: "CarsComponent",
  data() {
    return {
      cars: [],
    };
  },
  created() {
    this.fetchCars();
  },
  computed: {
    count() {
      return this.cars.length - 1;
    },
  },
  methods: {
    fetchCars() {
      const carsRef = ref(db, "cars");
      onValue(carsRef, (snapshot) => {
        const data = snapshot.val();
        // add only imageUrl brand model and price
        this.cars = Object.values(data).map((car) => {
          return {
            imageUrl: car.imageUrl,
            brand: car.brand + " " + car.model,
            price: car.pricePerMinute,
          };
        });
      });
    },
  },
};
</script>

<style scoped>
.card-container {
  white-space: nowrap;
  overflow-x: auto;
}

.card {
  max-width: 300px;
  min-height: 300px;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  margin: 0 0.5rem;
}
.img-container {
  width: 100%;
  height: 200px; /* Set the height to a fixed value */
  overflow: hidden; /* Hide any overflow */
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-img-top {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover; /* Scale the image nicely */
}
</style>
