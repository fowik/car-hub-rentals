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
        <div class="card_box">
          <span></span>
        </div>
        <div class="card_box">
          <span></span>
        </div>
        <div class="card_box">
          <span></span>
        </div>
        <div class="card_box">
          <span></span>
        </div>
        <div class="card_box">
          <span></span>
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

#cars .container .card_box {
  width: 200px;
  height: 250px;
  border-radius: 20px;
  background: linear-gradient(
    170deg,
    rgba(58, 56, 56, 0.623) 0%,
    rgb(31, 31, 31) 100%
  );
  position: relative;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.55);
  cursor: pointer;
  transition: all 0.3s;
}

#cars .container .card_box:hover {
  transform: scale(0.9);
}

#cars .container .card_box span {
  position: absolute;
  overflow: hidden;
  width: 150px;
  height: 150px;
  top: -10px;
  left: -10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#cars .container .card_box span::before {
  content: "Premium";
  position: absolute;
  width: 150%;
  height: 40px;
  background-image: linear-gradient(
    45deg,
    #ff6547 0%,
    #ffb144 51%,
    #ff7053 100%
  );
  transform: rotate(-45deg) translateY(-20px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.23);
}

#cars .container .card_box span::after {
  content: "";
  position: absolute;
  width: 10px;
  bottom: 0;
  left: 0;
  height: 10px;
  z-index: -1;
  box-shadow: 140px -140px #cc3f47;
  background-image: linear-gradient(
    45deg,
    #ff512f 0%,
    #f09819 51%,
    #ff512f 100%
  );
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
