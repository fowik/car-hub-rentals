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

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  list-style: none;
  text-transform: capitalize;
}

body {
  scroll-padding-top: 2em;
  scroll-behavior: smooth;
}

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

</style>
