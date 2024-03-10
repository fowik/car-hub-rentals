<template>
  <section>
    <section id="home">
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
            <button class="btn-reserve" onclick="location.href='/reservation'">
              Reserve
            </button>
          </div>
        </div>
      </div>
    </section>

    <section id="about">
      <div class="about-section">
        <div class="inner-container">
          <h1>About us</h1>
          <p class="text">
            Welcome to CarHub, your premier destination for hassle-free and
            reliable car rental services. Established with a commitment to
            providing top-notch vehicles and exceptional customer service, we
            take pride in being your trusted partner for all your transportation
            needs. At CarHub, we understand that every journey is unique, and we
            strive to make your experience memorable and convenient. Whether
            you're a business traveler, a tourist exploring new destinations, or
            simply in need of a temporary vehicle, we have a diverse fleet of
            well-maintained cars to suit your preferences and requirements.
          </p>

          <!-- Additional content for the About section -->
          <div class="team">
            <h2>Our Team</h2>
            <p>
              Our team is comprised of dedicated professionals who are
              passionate about delivering excellence. From the moment you choose
              CarHub, expect a seamless rental process, transparent pricing, and
              unparalleled support. We prioritize your safety and comfort,
              ensuring that each vehicle undergoes rigorous inspections and
              maintenance checks before reaching your hands.
            </p>
            <!-- Add team member cards or other information here -->
          </div>

          <!-- Another section or content -->
          <div class="mission">
            <h2>Why choose CarHub for your car rental needs?</h2>
            <ol>
              <li>
                Wide Range of Vehicles: Select from our extensive fleet of cars,
                including sedans, SUVs, and luxury vehicles, ensuring you find
                the perfect match for your journey.
              </li>
              <li>
                Affordable Pricing: We believe in providing value for your
                money. Our transparent pricing and competitive rates make
                renting a car with us a cost-effective choice.
              </li>
              <li>
                Customer Satisfaction: Your satisfaction is our priority. Our
                friendly and knowledgeable customer service team is ready to
                assist you at every step, making sure your experience with us is
                smooth and enjoyable.
              </li>
              <li>
                Convenience: Enjoy the convenience of online reservations,
                flexible rental periods, and multiple pickup/drop-off locations.
                We aim to make your journey as stress-free as possible. Safety
              </li>
              <li>
                First: Your safety is paramount to us. Our vehicles undergo
                regular maintenance, and we implement stringent cleaning
                protocols to ensure a hygienic and safe environment.
              </li>
            </ol>
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
  height: 100%;
}

/* Home section styles */
#home {
  /* background-image: url("@/assets/img/pexels-henry-&-co-1171480.jpg");
  background-size: cover; */
  width: 90%;
  min-height: calc(100vh);
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
  font-size: 1.2em;
  align-items: justify;
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
  background-color: #21252a;
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
  background-color: #292929;
  border-color: #ffa31a;
  transition: 274ms;
  color: #ffa31a;
}

/* Cars section styles */
#cars {
  width: 100%;
  min-height: 100vh;
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
  background-color: gray;
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
  min-height: 100vh;
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
  margin-bottom: 20px;
  text-align: center;
}

#about .about-section .text {
  font-size: 1.2em;
  text-align: center;
  margin-bottom: 20px;
}

.team {
  width: 80%;
  padding: 20px;
  background-color: #292929;
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
  margin-top: 20px;
  width: 80%;
  padding: 20px;
  background-color: #292929;
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

.mission ol {
  text-align: left;
  font-size: 1.1em;
  margin-left: 20px;
}

.mission li {
  margin-bottom: 10px;
  list-style: decimal;
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
