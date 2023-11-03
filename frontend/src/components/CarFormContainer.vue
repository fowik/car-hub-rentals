<template>
  <div id="car-form-container">
    <div class="car-form">
      <h2>Car edit</h2>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      <form @submit.prevent="editCar">
        <input v-model="id" type="hidden" />
        <input v-model="brand" type="text" placeholder="Enter Brand" required />
        <input v-model="model" type="text" placeholder="Enter Model" required />
        <input
          v-model.number="year"
          type="number"
          placeholder="Enter Year"
          required
          min="1940"
          max="2024"
        />
        <select v-model="type" required>
          <option :value="type">{{ type }}</option>
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Truck">Truck</option>
          <option value="Van">Van</option>
          <option value="Coupe">Coupe</option>
          <option value="Convertible">Convertible</option>
          <option value="Wagon">Wagon</option>
          <option value="Crossover">Crossover</option>
        </select>
        <input
          v-model.number="pricePerMinute"
          type="number"
          placeholder="Enter Price per Minute"
          required
          min="0.01"
          max="10"
          step="0.01"
        />
        <input
          v-model.number="engineCapacity"
          type="number"
          placeholder="Enter Engine Capacity"
          required
          min="1"
          max="8.4"
          step="0.1"
        />
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    carData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      id: null,
      brand: "",
      model: "",
      year: null,
      type: "",
      pricePerMinute: null,
      engineCapacity: null,
      successMessage: "",
    };
  },
  watch: {
    successMessage() {
      setTimeout(this.clearSuccessMessage, 3000);
    },
  },
  methods: {
    handleEditCar(id) {
      this.getCar(id);
    },
    async getCar(id) {
      console.log("Editing car with ID:", id);
      try {
        const response = await fetch(
          "http://localhost:3000/api/cars/get/" + id + "",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          const data = await response.json();
          this.brand = data.brand;
          this.model = data.model;
          this.year = data.year;
          this.type = data.type;
          this.pricePerMinute = data.pricePerMinute;
          this.engineCapacity = data.engineCapacity;
        } else {
          console.error("Failed to fetch cars");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.handleEditCar(this.carData);
  },
};
</script>

<style>
/* POPUP */
#car-form-container {
  z-index: 10;
  justify-content: center;
  align-items: center;
  position: fixed;
  display: flex;
  left: 50%;
  transform: translate(-50%);
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 101%;
}
.car-form {
  background-color: #292929;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  margin: 50px auto;
  text-align: center;
}
.car-form h2 {
  margin-top: 0;
  margin-bottom: 20px;
}

.car-form input[type="text"],
.car-form input[type="password"],
.car-form input[type="number"],
.car-form select {
  width: 90%;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  justify-content: center;
  outline: none;
}

.car-form button {
  background-color: #ffa31a;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 15px;
}

.car-form button:hover {
  background-color: #f49200;
}

.car-form a {
  text-decoration: none;
  color: #ffa31a;
}

.car-form a:hover {
  text-decoration: underline;
}

.error-message {
  color: #ff0000;
  font-size: 14px;
  font-weight: 600;
  background-color: #88080838;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
}

.success-message {
  color: #fff; /* Green color */
  font-size: 14px;
  font-weight: 600;
  background-color: #28a745;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
}
</style>
