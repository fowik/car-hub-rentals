<template>
  <section>
    <ContorlPanelNavigation />
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
            <tbody class="table-container">
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
            <div class="table-container">
              <tbody>
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
              </tbody>
            </div>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ContorlPanelNavigation from "@/components/ControlPanelNavigation.vue";

export default {
  data() {
    return {
      username: "",
      email: "",
    };
  },
  components: {
    ContorlPanelNavigation,
  },
};
</script>

<style scoped>
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

.details {
  max-height: 300px;
}

.details .table-container {
  position: relative;
  max-height: 300px;
  overflow-y: auto;
}

.table-container {
  max-height: 300px; /* Set the maximum height for the tbody */
  overflow-y: auto; /* Add vertical scrollbar when content overflows */
  display: block; /* Enable block-level container behavior for tbody */
}

.details .table-container::-webkit-scrollbar {
  width: 7px;
  background: var(--black-light);
}

.details .table-container::-webkit-scrollbar-thumb {
  background: var(--orange);
  border-radius: 10px;
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
