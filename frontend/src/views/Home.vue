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
      <div class="container">
        <div class="card">
          <div class="image"><span class="text">This is a chair.</span></div>
          <span class="title">Cool Chair</span>
          <span class="price">$100</span>
        </div>
        <div class="card">
          <div class="image"><span class="text">This is a chair.</span></div>
          <span class="title">Cool Chair</span>
          <span class="price">$100</span>
        </div>
        <div class="card">
          <div class="image"><span class="text">This is a chair.</span></div>
          <span class="title">Cool Chair</span>
          <span class="price">$100</span>
        </div>
        <div class="card">
          <div class="image"><span class="text">This is a chair.</span></div>
          <span class="title">Cool Chair</span>
          <span class="price">$100</span>
        </div>
        <div class="card">
          <div class="image"><span class="text">This is a chair.</span></div>
          <span class="title">Cool Chair</span>
          <span class="price">$100</span>
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
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      cars: this.getCars(),
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
          this.cars = data; // Assuming your response data is an array of car objects
          console.log(this.cars);
        } else {
          console.error("Failed to fetch cars");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap");

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
  margin-right: 10px; /* Add margin to the icon for spacing */
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

@media (max-width: 768px) {
  .home {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
}

#cars {
  min-height: 600px;
  max-width: 80%;
  display: flex;
}

#cars h1 {
  font-size: 3em;
  letter-spacing: 2px;
  margin-bottom: 100px;
}

#cars .container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  flex-direction: row;
}

#cars .card {
  position: relative;
  width: 11.875em;
  height: 16.5em;
  box-shadow: 0px 1px 13px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 120ms;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 0.5em;
  padding-bottom: 3.4em;
}

#cars .card::after {
  content: "Reserve";
  padding-top: 1.25em;
  padding-left: 1.25em;
  position: absolute;
  left: 0;
  bottom: -60px;
  background: #00ac7c;
  color: #fff;
  height: 2.5em;
  width: 90%;
  transition: all 80ms;
  font-weight: 600;
  text-transform: uppercase;
  opacity: 0;
}

#cars .card .title {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.9em;
  position: absolute;
  left: 0.625em;
  bottom: 1.875em;
  font-weight: 400;
  color: #000;
}

#cars .card .text {
  font-size: 0.9em;
  position: absolute;
  font-weight: 400;
  color: #000;
}

#cars .card .price {
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 0.9em;
  position: absolute;
  left: 0.625em;
  bottom: 0.625em;
  color: #000;
}

#cars .card:hover::after {
  bottom: 0;
  opacity: 1;
}

#cars .card:active {
  transform: scale(0.98);
}

#cars .card:active::after {
  content: "Reserved!";
  height: 3.125em;
}

#cars .text {
  max-width: 55px;
}

#cars .image {
  background: rgb(241, 241, 241);
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}

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

#about .about-section h1 {
  font-size: 3em;
  letter-spacing: 2px;
  margin-bottom: 100px;
  text-align: center;
}
</style>
