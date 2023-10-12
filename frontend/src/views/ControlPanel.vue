<template>
  <section>
    <div class="container">
      <div class="navigation">
        <ul>
          <li>
            <a href="#">
              <span class="icon"
                ><ion-icon name="car-sport-outline"></ion-icon
              ></span>
              <span class="title">Carhub</span>
            </a>
          </li>
          <li>
            <router-link to="/control-panel">
              <span class="icon"
                ><ion-icon name="home-outline"></ion-icon
              ></span>
              <span class="title">Dashboard</span>
            </router-link>
          </li>
          <li>
            <a href="#">
              <span class="icon"
                ><ion-icon name="people-outline"></ion-icon
              ></span>
              <span class="title">Customers</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span class="icon"
                ><ion-icon name="chatbubble-outline"></ion-icon
              ></span>
              <span class="title">Message</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span class="icon"
                ><ion-icon name="help-outline"></ion-icon
              ></span>
              <span class="title">Help</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span class="icon"
                ><ion-icon name="settings-outline"></ion-icon
              ></span>
              <span class="title">Settings</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span class="icon"
                ><ion-icon name="lock-closed-outline"></ion-icon
              ></span>
              <span class="title">Password</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span class="icon"
                ><ion-icon name="log-out-outline"></ion-icon
              ></span>
              <span class="title">Sign out</span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- main content -->
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

      <!-- cards -->
      <div class="cardBox">
        <div class="card">
          <div>
            <div class="numbers">1,504</div>
            <div class="cardName">Daily Views</div>
          </div>
          <div class="iconBx">
            <ion-icon name="eye-outline"></ion-icon>
          </div>
        </div>
        <div class="card">
          <div>
            <div class="numbers">80</div>
            <div class="cardName">Rents</div>
          </div>
          <div class="iconBx">
            <ion-icon name="cart-outline"></ion-icon>
          </div>
        </div>
        <div class="card">
          <div>
            <div class="numbers">204</div>
            <div class="cardName">Comments</div>
          </div>
          <div class="iconBx">
            <ion-icon name="chatbubbles-outline"></ion-icon>
          </div>
        </div>
        <div class="card">
          <div>
            <div class="numbers">$7,842</div>
            <div class="cardName">Earning</div>
          </div>
          <div class="iconBx">
            <ion-icon name="card-outline"></ion-icon>
          </div>
        </div>
      </div>
      <div class="details">
        <!-- rent details list -->
        <div class="recentRents">
          <div class="cardHeader">
            <h2>Recent Rents</h2>
            <a href="#" class="btn">View All</a>
          </div>
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Price</td>
                <td>Payment</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mustang</td>
                <td>$1200</td>
                <td>Paid</td>
                <td>
                  <span class="status delivered">Delivered</span>
                </td>
              </tr>
              <tr>
                <td>Mustang</td>
                <td>$1200</td>
                <td>Paid</td>
                <td>
                  <span class="status return">Return</span>
                </td>
              </tr>
              <tr>
                <td>Mustang</td>
                <td>$1200</td>
                <td>Due</td>
                <td>
                  <span class="status inprogress">In Progress</span>
                </td>
              </tr>
              <tr>
                <td>Mustang</td>
                <td>$1200</td>
                <td>Due</td>
                <td>
                  <span class="status pending">Pending</span>
                </td>
              </tr>
              <tr>
                <td>Mustang</td>
                <td>$1200</td>
                <td>Due</td>
                <td>
                  <span class="status pending">Pending</span>
                </td>
              </tr>
              <tr>
                <td>Mustang</td>
                <td>$1200</td>
                <td>Due</td>
                <td>
                  <span class="status pending">Pending</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- New Customers -->
        <div class="recentCustomers">
          <div class="cardHeader">
            <h2>Recent Customers</h2>
          </div>
          <table>
            <tr>
              <td width="60px">
                <div class="imgBx"><img src="#   " /></div>
              </td>
              <td>
                <h4>John<br /><span>Italy</span></h4>
              </td>
            </tr>
            <tr>
              <td width="60px">
                <div class="imgBx"><img src="#   " /></div>
              </td>
              <td>
                <h4>John<br /><span>Italy</span></h4>
              </td>
            </tr>
            <tr>
              <td width="60px">
                <div class="imgBx"><img src="#   " /></div>
              </td>
              <td>
                <h4>John<br /><span>Italy</span></h4>
              </td>
            </tr>
            <tr>
              <td width="60px">
                <div class="imgBx"><img src="#   " /></div>
              </td>
              <td>
                <h4>John<br /><span>Italy</span></h4>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script defer src="@/assets/js/js.js"></script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  min-height: 100vh;
  overflow-x: hidden;
}

.container {
  position: relative;
  width: 100%;
}

.navigation {
  position: fixed;
  top: 72px;
  left: 0;
  width: 300px;
  height: calc(100vh - 163px);
  background: var(--black-light);
  transition: 0.5s;
  border-left: 10px solid var(--black-light);
  overflow: hidden;
}
.navigation.active {
  width: 80px;
}
.navigation ul {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.navigation ul li {
  color: var(--white);
  position: relative;
  width: 100%;
  list-style: none;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}

.navigation ul li:hover,
.navigation ul li.hovered {
  background: var(--orange-dark);
}

.navigation ul li a.router-link-active {
  border-left: 5px solid #ffa31a;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  background: var(--orange-dark);
}

.navigation ul li:nth-child(1) {
  margin-bottom: 40px;
  pointer-events: none;
}

.navigation ul li a {
  position: relative;
  display: block;
  width: 100%;
  display: flex;
  text-decoration: none;
  color: var(--white);
}

.navigation ul li:hover a,
.navigation ul li.hovered a {
  color: var(--orange);
}
.navigation ul li a.router-link-active {
  color: var(--orange);
}

.navigation ul li a .icon {
  position: relative;
  display: block;
  min-width: 60px;
  height: 60px;
  line-height: 80px;
  text-align: center;
  font-size: 18px;
}

.navigation ul li a .icon ion-icon {
  font-size: 1.75em;
}

.navigation ul li a .title {
  position: relative;
  display: block;
  padding: 0 10px;
  line-height: 60px;
  text-align: start;
  white-space: nowrap;
  font-size: 15px;
}

/* curve outside */

.navigation ul li:hover a::before,
.navigation ul li.hovered a::before {
  content: "";
  position: absolute;
  top: -50px;
  right: 0;
  width: 50px;
  height: 50px;
  background: transparent;
  border-radius: 50%;
  box-shadow: 35px 35px 0 10px var(--orange-dark);
  pointer-events: none;
}

.navigation ul li:hover a::after,
.navigation ul li.hovered a::after {
  content: "";
  position: absolute;
  bottom: -50px;
  right: 0;
  width: 50px;
  height: 50px;
  background: transparent;
  border-radius: 50%;
  box-shadow: 35px -35px 0 10px var(--orange-dark);
  pointer-events: none;
}

/* main content */

.main {
  position: absolute;
  top: 82px;
  width: calc(100% - 300px);
  margin-left: 300px;
  min-height: calc(100vh - 163px);
  transition: 0.5s;
}

.main.active {
  width: calc(100% - 80px);
  margin-left: 80px;
}

.topbar {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}

.toggle {
  position: relative;
  top: 0;
  left: 0px;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 2.5em;
}

.search {
  position: relative;
  width: 400px;
  margin: 0 10px;
}

.search label {
  position: relative;
  width: 100%;
}

.search label input {
  width: 100%;
  height: 40px;
  border-radius: 40px;
  padding: 5px 20px;
  padding-left: 35px;
  font-size: 18px;
  outline: none;
  border: 1px solid var(--black-light);
}

.search label ion-icon {
  position: absolute;
  top: -1px;
  left: 10px;
  font-size: 1.2em;
  color: var(--black-light);
}

.user {
  position: relative;
  min-width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  background-color: var(--black-light);
}

.user img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cardBox {
  position: relative;
  width: 100%;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
}

.cardBox .card {
  display: flex;
  justify-content: space-between;
  position: relative;
  background: var(--black-light);
  padding: 30px;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 7px 25px rgba(0, 0, 0, 0.08);
}

.cardBox .card .numbers {
  position: relative;
  font-size: 2.5em;
  font-weight: 500;
  color: var(--orange);
}

.cardBox .card .cardName {
  position: relative;
  font-size: 1.1em;
  margin-top: 5px;
}

.cardBox .card .iconBx {
  font-size: 3.5em;
}

.cardBox .card:hover {
  background: var(--orange-dark);
}

.details {
  position: relative;
  width: 100%;
  padding: 20px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 30px;
  border-collapse: collapse;
}

.details .recentRents {
  position: relative;
  display: grid;
  min-height: calc(100vh - 455px);
  background: var(--black-light);
  padding: 20px;
  box-shadow: 0 7px 25px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
}

.cardHeader {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.cardHeader h2 {
  font-weight: 600;
  color: var(--white);
}

.cardHeader .btn {
  position: relative;
  padding: 5px 15px;
  background: var(--orange);
  color: var(--white);
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: 0.5s;
}

.cardHeader .btn:hover {
  background: var(--orange-dark);
}

.details table {
  width: 100%;
  border-collapse: collapse;
}
.details table thead td {
  font-weight: 600;
}

.details .recentRents table tr {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.details .recentRents table tr:last-child {
  border-bottom: none;
}

.details .recentRents table tbody tr:hover {
  background: var(--orange-dark);
  color: var(--orange);
}

.details .recentRents table tr td {
  padding: 10px;
}

.details .recentRents table tr td:last-child {
  text-align: end;
}

.details .recentRents table tr td:nth-child(2) {
  text-align: end;
}

.details .recentRents table tr td:nth-child(3) {
  text-align: center;
}

.status.delivered {
  position: relative;
  padding: 5px 10px;
  background: #8de02c;
  color: var(--white);
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
}

.status.pending {
  position: relative;
  padding: 5px 10px;
  background: #e0b82c;
  color: var(--white);
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
}

.status.return {
  position: relative;
  padding: 5px 10px;
  background: #e02c2c;
  color: var(--white);
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
}

.status.inprogress {
  position: relative;
  padding: 5px 10px;
  background: #2c9de0;
  color: var(--white);
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
}

.recentCustomers {
  position: relative;
  display: grid;
  min-height: calc(100vh - 455px);
  background: var(--black-light);
  padding: 20px;
  box-shadow: 0 7px 25px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
}

.recentCustomers .imgBx {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}

.recentCustomers .imgBx img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.recentCustomers table tr:hover {
  background: var(--orange-dark);
  color: var(--orange);
}

.recentCustomers table tr td {
  padding: 12px 10px;
}

.recentCustomers table tr td h4 {
  font-size: 16px;
  font-weight: 500;
  line-height: 1.2em;
}
.recentCustomers table tr td h4 span {
  font-size: 14px;
  color: #8c8c8c;
}

.recentCustomers table tr:hover td h4 span {
  color: var(--orange);
}

@media (max-width: 991px) {
  .navigation {
    left: -300px;
  }
  .navigation.active {
    left: 0;
  }
  .main {
    width: 100%;
    left: 0;
  }
  .main.active {
    left: 300px;
  }
  .cardBox {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .details {
    grid-template-columns: repeat(1, 1fr);
  }
  .recentRents {
    overflow-x: auto;
  }

  .status.inprogress {
    white-space: nowrap;
  }
}

@media (max-width: 480px) {
  .cardBox {
    grid-template-columns: repeat(1, 1fr);
  }
  .cardHeader h2 {
    font-size: 20px;
  }

  .user {
    min-width: 40px;
  }

  .navigation {
    width: 100%;
    left: -100%;
    z-index: 1000;
  }

  .navigation.active {
    width: 100%;
    left: 0;
  }

  .toggle {
    z-index: 10001;
  }

  main.active .toggle {
    position: fixed;
    right: 0;
    left: initial;
  }
}
</style>
