<template>
  <div id="car-form-container">
    <div class="car-form">
      <h2>Car edit</h2>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      <form @submit.prevent="editCar">
        <input v-model="id" type="hidden" />
        <select v-model="brand" required>
          <option :value="brand">{{ brand }}</option>
          <option
            v-for="carBrand in carBrands"
            :key="carBrand.id"
            :value="carBrand.BrandName"
          >
            {{ carBrand.BrandName }}
          </option>
        </select>
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
          <option
            v-for="carType in carTypes"
            :key="carType.id"
            :value="carType.typeName"
          >
            {{ carType.typeName }}
          </option>
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
          this.id = data.id;
          this.brand = data.brandName;
          this.model = data.model;
          this.year = data.year;
          this.type = data.typeName;
          this.pricePerMinute = data.pricePerMinute;
          this.engineCapacity = data.engineCapacity;
        } else {
          console.error("Failed to fetch cars");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async editCar() {
      try {
        const id = this.id;
        const carData = {
          brandName: this.brand,
          model: this.model,
          year: this.year,
          typeName: this.type,
          registration: null,
          pricePerMinute: this.pricePerMinute,
          engineCapacity: this.engineCapacity,
        };
        const response = await fetch(
          "http://localhost:3000/api/cars/update/" + id + "",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(carData),
          }
        );
        if (response.status === 200) {
          this.successMessage = "Car edited successfully!";
          this.$emit("car-edited");
        } else if (response.status === 402) {
          this.successMessage = "You need to edit at least one field";
          this.$emit("car-edited");
        } else {
          this.successMessage = "Failed to edit car";
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getCarBrands() {
      try {
        const response = await fetch("http://localhost:3000/api/brands/get", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          const carBrands = await response.json();
          this.carBrands = carBrands; // Store fetched car brands in the component data
        } else {
          console.error("Failed to fetch car brands");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getCarTypes() {
      try {
        const response = await fetch("http://localhost:3000/api/types/get", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          const carTypes = await response.json();
          this.carTypes = carTypes; // Store fetched car types in the component data
        } else {
          console.error("Failed to fetch car types");
        }
      } catch (error) {
        console.log(error);
      }
    },
    clearSuccessMessage() {
      this.successMessage = "";
    },
  },
  mounted() {
    this.handleEditCar(this.carData);
    this.getCarBrands();
    this.getCarTypes();
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
