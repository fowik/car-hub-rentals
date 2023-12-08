<template>
  <section>
    <!-- Main -->
    <div id="car-form-container">
      <div class="car-form">
        <!-- Login Form -->
        <h2>Car addition</h2>
        <p v-if="successMessage" class="success-message">
          {{ successMessage }}
        </p>
        <form @submit.prevent="addCar">
          <select v-model="selectedBrand" id="brandId" required>
            <option disabled value="Select Brand">Select Brand</option>
            <option
              v-for="brandItem in brands"
              :key="brandItem.id"
              :value="brandItem.id"
            >
              {{ brandItem.name }}
            </option>
          </select>
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
          <input
            type="text"
            v-model="registration"
            placeholder="Enter Registration Number"
            required
          />
          <select v-model="selectedType" id="typeId" required>
            <option disabled value="Select Type">Select Type</option>
            <option
              v-for="typeItem in types"
              :key="typeItem.id"
              :value="typeItem.id"
            >
              {{ typeItem.name }}
            </option>
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
  </section>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      selectedType: "Select Type",
      selectedBrand: "Select Brand",
      model: "",
      year: "",
      registration: "",
      pricePerMinute: "",
      engineCapacity: "",
      successMessage: "",
      brands: [],
      types: [],
    };
  },
  watch: {
    successMessage() {
      setTimeout(this.clearSuccessMessage, 3000);
    },
  },
  methods: {
    async getBrands() {
      try {
        const response = await fetch("http://localhost:3000/api/brands/get", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          const brandsData = await response.json(); // Retrieve data from the response

          this.brands = brandsData.map((brand) => ({
            id: brand.id,
            name: brand.BrandName,
            // Include other properties of the brand as needed
          }));
        }
      } catch (error) {
        console.error("Error during brands fetching:", error);
      }
    },
    async getTypes() {
      try {
        const response = await fetch("http://localhost:3000/api/types/get", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          const typesData = await response.json(); // Retrieve data from the response

          this.types = typesData.map((type) => ({
            id: type.id,
            name: type.typeName,
          }));
        }
      } catch (error) {
        console.error("Error during types fetching:", error);
      }
    },
    async addCar() {
      const carData = {
        brandId: this.selectedBrand,
        model: this.model,
        year: this.year,
        typeId: this.selectedType,
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
          this.clearInputField();
        }
      } catch (error) {
        console.error("Error during car addition:", error);
      }
    },
    clearSuccessMessage() {
      this.successMessage = "";
    },
    clearInputField() {
      this.successMessage = "Car successfully added!";
      this.selectedBrand = "Select Brand";
      this.model = "";
      this.year = "";
      this.registration = "";
      this.selectedType = "Select Type";
      this.pricePerMinute = "";
      this.engineCapacity = "";
    },
  },
  mounted() {
    this.getBrands();
    this.getTypes();

    const priceInput = document.getElementById("price-input");

    priceInput.addEventListener("input", validateInput);

    const yearInput = document.getElementById("year-input");

    yearInput.addEventListener("input", function (event) {
      const inputValue = event.target.value;
      if (inputValue.length > 4) {
        event.target.value = inputValue.slice(0, 4);
      }
    });

    function validateInput(event) {
      const inputValue = parseFloat(event.target.value);
      const decimalCount = (event.target.value.split(".")[1] || []).length;

      if (decimalCount > 2 || inputValue < 0.01 || inputValue >= 10) {
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

      // list.forEach((item) => item.addEventListener("mouseover", activeLink));
      // document.querySelector("input[type=date]").oninput = (e) =>
      //   console.log(new Date(e.target.valueAsNumber, 0, 1));
    });
  },
};
</script>

<style scoped>
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
  color: #292929;
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
