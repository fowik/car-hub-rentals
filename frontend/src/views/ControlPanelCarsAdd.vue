<template>
  <section>
    <ControlPanelNavigation />
    <div class="main">
      <div class="topbar">
        <div class="toggle">
          <ion-icon name="menu-outline"></ion-icon>
        </div>
        <!-- search -->
        <div class="search">
          <label>
            <input type="text" placeholder="Search Here" />
            <ion-icon name="search-outline"></ion-icon>
          </label>
        </div>

        <!-- user image -->
        <div class="user">
          <img src="" />
        </div>
      </div>
      <!-- Main -->
      <div class="container">
        <div class="car-form">
          <!-- Login Form -->
          <h2>Car addition</h2>
          <p v-if="successMessage" class="success-message">
            {{ successMessage }}
          </p>
          <form @submit.prevent="addCar">
            <input
              type="text"
              v-model="brand"
              placeholder="Enter Brand"
              required
            />
            <input
              type="text"
              v-model="model"
              v-year="year"
              placeholder="Enter Model"
              required
            />
            <input
              type="number"
              v-model="year"
              placeholder="Enter Year"
              required
              min="1940"
              max="2024"
              maxlength="4"
              id="year-input"
            />
            <select v-model="selectedType" id="carType" required>
              <option disabled value="Select Type">Select Type</option>
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
              type="number"
              v-model="pricePerMinute"
              placeholder="Enter Price per Minute"
              required
              id="price-input"
              min="0.01"
              max="10"
              step="0.01"
              @input="validateInput"
            />
            <input
              type="number"
              v-model="engineCapacity"
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
    </div>
  </section>
</template>

<script>
import ControlPanelNavigation from "@/components/ControlPanelNavigation.vue";

export default {
  data() {
    return {
      username: "",
      email: "",
      selectedType: "Select Type",
      successMessage: "",
    };
  },
  watch: {
    brand() {
      this.clearSuccessMessage();
    },
    model() {
      this.clearSuccessMessage();
    },
    year() {
      this.clearSuccessMessage();
    },
    selectedType() {
      this.clearSuccessMessage();
    },
    pricePerMinute() {
      this.clearSuccessMessage();
    },
    engineCapacity() {
      this.clearSuccessMessage();
    },
  },
  methods: {
    async addCar() {
      const carData = {
        brand: this.brand,
        model: this.model,
        year: this.year,
        type: this.selectedType,
        pricePerMinute: this.pricePerMinute,
        engineCapacity: this.engineCapacity,
      };

      try {
        const response = await fetch("http://localhost:3000/api/cars/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(carData),
        });

        if (response.status === 201) {
          console.log(response.status); // Check the status code in the console
          this.successMessage = "Car successfully added!";
        }
      } catch (error) {
        console.error("Error during car addition:", error);
      }
    },
    clearSuccessMessage() {
      this.successMessage = "";
    },
  },
  components: {
    ControlPanelNavigation,
  },
  mounted() {
    const priceInput = document.getElementById("price-input");

    priceInput.addEventListener("input", validateInput);

    const yearInput = document.getElementById("year-input");

    yearInput.addEventListener("input", function (event) {
      const inputValue = event.target.value;
      // Check if the input is "1232" and prevent it
      if (inputValue.length > 4) {
        // If the input length exceeds 4 characters, truncate it
        event.target.value = inputValue.slice(0, 4);
      }
    });

    function validateInput(event) {
      const inputValue = parseFloat(event.target.value);
      const decimalCount = (event.target.value.split(".")[1] || []).length;

      if (decimalCount > 2 || inputValue < 0.01 || inputValue >= 10) {
        // Clear the input value if it has more than 2 decimal places,
        // is less than 0.01, or is greater than or equal to 10
        event.target.value = "";
      }
    }

    document.addEventListener("DOMContentLoaded", function () {
      // MenuToggle
      let toggle = document.querySelector(".toggle");
      let navigation = document.querySelector(".navigation");
      let main = document.querySelector(".main");

      toggle.onclick = function () {
        toggle.classList.toggle("active");
        navigation.classList.toggle("active");
        main.classList.toggle("active");
      };

      // Select all list items with class "navigation"
      let list = document.querySelectorAll(".navigation li");

      function activeLink() {
        list.forEach((item) => item.classList.remove("hovered"));
        this.classList.add("hovered");
      }

      list.forEach((item) => item.addEventListener("mouseover", activeLink));
      document.querySelector("input[type=date]").oninput = (e) =>
        console.log(new Date(e.target.valueAsNumber, 0, 1));
    });
  },
};
</script>

<style scoped>
.car-form {
  background-color: #292929;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  margin: 100px auto;
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
