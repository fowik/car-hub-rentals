<template>
  <section>
    <section class="home">
      <div class="text">
        <h1>Looking for a car</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe eos
          magni animi hic sequi. Quo quasi, labore dolore dignissimos ipsam
          aliquam assumenda sed similique delectus iste repudiandae molestiae.
          Rerum, dignissimos.
        </p>
        <div class="store">
          <div class="buttons-container">
            <!-- Apple Store Button -->

            <button class="btn">
              <span class="icon"
                ><ion-icon name="logo-apple-appstore"></ion-icon
              ></span>
              <div>
                <p>Download on the</p>
                <h2>App Store</h2>
              </div>
            </button>

            <button class="btn">
              <span class="icon"
                ><ion-icon name="logo-google-playstore"></ion-icon
              ></span>
              <div>
                <p>Get it on</p>
                <h2>Google Play</h2>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div class="image">
        <img src="@/assets/img/hero-01.png" alt="" />
      </div>
    </section>
    <section id="cars">
      <h1>Our cars</h1>
      <div class="slider">
        <div v-for="car in cars" :key="car.id" class="card-container">
          <div class="card">
            <div class="image">
              <img src="../assets/img/hero-01.png" alt="" />
            </div>
            <div>
              <span class="title">{{ car.brandName }} | {{ car.model }}</span>
              <span class="price">{{ car.pricePerMinute }} €</span>
            </div>
            <button class="btn-reserve">Reserve</button>
          </div>
        </div>
      </div>
    </section>

    <section id="about">
      <div class="about-section">
        <div class="inner-container">
          <h1>About us</h1>
          <p class="text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptatum, voluptate, quibusdam, quia voluptas quod quos
            voluptatibus quae doloribus quidem voluptatem. Quisquam voluptatum,
            voluptate, quibusdam, quia voluptas quod quos voluptatibus quae
            doloribus quidem voluptatem.
          </p>
          <div class="skills">
            <span>Web Design</span>
            <span>Photoshop & Illustrator</span>
            <span>Coding</span>
          </div>

          <!-- Additional content for the About section -->
          <div class="team">
            <h2>Our Team</h2>
            <p>
              Meet our talented team of professionals dedicated to providing the
              best car services.
            </p>
            <!-- Add team member cards or other information here -->
          </div>

          <!-- Another section or content -->
          <div class="mission">
            <h2>Our Mission</h2>
            <p>
              Our mission is to redefine the car rental experience through
              innovation and exceptional customer service.
            </p>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      cars: [],
    };
  },
  methods: {
    async getCars() {
      try {
        const response = await fetch("http://localhost:3000/api/cars/get", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          const shuffledCars = data.sort(() => Math.random() - 0.5);
          const limit = 5;

          this.cars = shuffledCars.slice(0, limit);
        } else {
          console.error("Failed to fetch cars");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getCars();
  },
};
</script>

<style scoped>
/* General styles */
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap");

/* Main section styles */
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

/* Home section styles */
.home {
  width: 90%;
  min-height: 50vh;
  position: relative;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
}

.text h1 {
  font-size: 3em;
  letter-spacing: 2px;
}

.text p {
  margin: 0.5rem 0 1rem;
}

.store {
  flex-direction: row;
}

.store img {
  width: 250px;
  margin: 10px;
  cursor: pointer;
}

.image img {
  width: 900px;
  height: 100%;
}

.buttons-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.btn .icon {
  display: inline-block;
  position: relative;
  min-width: 60px;
  height: 60px;
  line-height: 80px;
  text-align: start;
  font-size: 18px;
}

.btn .icon ion-icon {
  top: 3px;
  font-size: 3em;
  position: absolute;
}

.btn {
  font-weight: 600;
  font-size: 14px;
  width: 260px;
  color: #fff;
  background-color: #0066cc00;
  padding: 10px 30px;
  border: solid #ffffff 2px;
  box-shadow: rgb(0, 0, 0) 0px 0px 0px 0px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: 20px;
}

.btn .icon {
  margin-right: 10px;
}

.btn div {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.btn div p {
  font-size: 1em;
  font-weight: 400;
  margin-bottom: 0.5em;
  margin-top: -1px;
}

.btn:hover {
  background-color: var(--black-light);
  border-color: var(--orange);
  transition: 274ms;
  color: var(--orange);
}

/* Cars section styles */
#cars {
  width: 100%;
  justify-content: center;
  overflow: hidden;
  padding: 20px 0;
}
#cars h1 {
  font-size: 3em;
  letter-spacing: 2px;
  margin-bottom: 100px;
}
.slider::-webkit-scrollbar {
  width: 40px;
}

.slider::-webkit-scrollbar-track {
  background: transparent;
}

.slider::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 10px; /* Add rounded corners */
}
.slider {
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
  width: 75%;
  height: 400px;
}

.slider .card {
  width: 300px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.slider .card:hover {
  transform: scale(1.05);
}

.slider .card-container {
  margin-right: 30px;
  margin-left: 30px;
  margin-top: auto;
  margin-bottom: auto;
}

.slider .card .image {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #f1f1f1;
  color: black;
}
.slider .card .image img {
  width: 100%;
  height: auto;
}
.slider .card .title {
  font-size: 1.2em;
  font-weight: bold;
  padding: 10px;
  text-align: center;
  color: black;
}
.slider .card .price {
  font-size: 1em;
  color: black;
  text-align: center;
  padding-bottom: 10px;
}
.slider .card .btn-reserve {
  display: block;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 8px 16px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  justify-content: center;
  text-decoration: none;
  border: 2px solid #333;
  color: #333;
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  border-radius: 10px;
}
.slider .card .btn-reserve:hover {
  background-color: #333;
  color: #fff;
}

/* About section styles */
#about {
  min-height: 710px;
  max-width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#about .about-section {
  position: static;
  top: 0;
}

#about .inner-container {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
}

#about .about-section h1 {
  font-size: 3em;
  letter-spacing: 2px;
  margin-bottom: 100px;
  text-align: center;
}

.team {
  margin-top: 40px;
  width: 80%;
  padding: 20px;
  background-color: var(--black-light);
  border-radius: 8px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

.team h2 {
  font-size: 2em;
  margin-bottom: 10px;
}

.team p {
  font-size: 1.1em;
}

/* Styling for individual team members or cards */
.team-member {
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 20px;
  border-radius: 8px;
}

.team-member img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.team-member h3 {
  font-size: 1.3em;
  margin-bottom: 5px;
}

.team-member p {
  font-size: 1em;
}

.mission {
  margin-top: 40px;
  width: 80%;
  padding: 20px;
  background-color: var(--black-light);
  border-radius: 8px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
}

.mission h2 {
  font-size: 2em;
  margin-bottom: 10px;
}

.mission p {
  font-size: 1.1em;
}

@media (max-width: 768px) {
  .home {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }

  .text h1 {
    font-size: 2em;
  }

  .store img {
    width: 150px;
  }

  .image img {
    display: hidden;
  }

  #cars .container {
    width: 80%;
    display: flex;
    overflow-x: hidden;
    justify-content: center;
  }
  #cars .carousel__item {
    margin-bottom: 0;
  }
}
</style>
