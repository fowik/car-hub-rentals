<template>
  <div class="container" :class="{ show: collapseStates[brand] }">
    <div v-for="(cars, brand) in carsByBrand" :key="brand">
      <div class="row text-start">
        <a
          data-bs-toggle="collapse"
          class="text-decoration-none text-white"
          :href="'#collapseCard' + brand"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
          @click="toggleCollapse(brand)"
        >
          <h2>{{ brand }}</h2>
        </a>
      </div>
      <div class="card-container collapse" :id="'collapseCard' + brand">
        <div v-for="(car, carIndex) in cars" :key="carIndex">
          <div class="card m-3">
            <img
              :src="car.imageUrl"
              class="card-img-center"
              alt="Car Image"
              style="width: 250px; height: 160px; object-fit: contain"
            />
            <div class="card-body">
              <h5 class="card-title">{{ car.model }}</h5>
              <p class="card-text">{{ car.pricePerMinute }} €</p>
              <button class="btn btn-primary">Reserve</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AppReservation",
  data() {
    return {
      cars: [],
      brands: [],
      collapseStates: {},
    };
  },
  components: {
    Map,
  },
  computed: {
    carsByBrand() {
      return this.cars.reduce((brands, car) => {
        if (!brands[car.brand]) {
          brands[car.brand] = [];
        }
        brands[car.brand].push(car);
        return brands;
      }, {});
    },
  },
  mounted() {
    this.fetchCars();
    this.fetchBrands();
  },
  methods: {
    async fetchCars() {
      try {
        this.isLoading = true;
        const dbRef = ref(db, "cars");

        onValue(dbRef, (snapshot) => {
          const carsObject = snapshot.val();
          if (!carsObject) {
            return;
          }
          const carsArray = Object.keys(carsObject).map(
            (key) => carsObject[key]
          );
          carsArray.forEach((car, index) => {
            car.id = Object.keys(carsObject)[index];
          });

          this.cars = carsArray;
        });
      } catch (error) {
        console.error("Request failed:", error);
        this.Loading = true;
      } finally {
        this.isLoading = false;
      }
    },
    async fetchBrands() {
      const brandsRef = ref(db, "brands");
      onValue(brandsRef, (snapshot) => {
        const data = snapshot.val();
        this.brands.push(data.name);
        // Инициализируем состояние сворачивания для каждого бренда
        this.collapseStates[data.name] = false;
      });
    },

    toggleCollapse(brand) {
      this.collapseStates[brand] = !this.collapseStates[brand];
    },
  },
};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: nowrap; /* Prevent wrapping */
  overflow-x: auto; /* Enable horizontal scrolling */
}

.card {
  min-width: 250px;
  max-width: 300px;
  min-height: 300px;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
}
</style>
