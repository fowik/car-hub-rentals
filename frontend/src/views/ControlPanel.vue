<template>
  <section>
    <ContorlPanelNavigation />
    <!-- main content -->
    <div class="main transition-all duration-500 ml-80">
      <div class="topbar w-full h-16 flex justify-between items-center px-4">
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
                <td>Ford GT</td>
                <td>$1500</td>
                <td>Paid</td>
                <td>
                  <span class="status return">Return</span>
                </td>
              </tr>
              <tr>
                <td>Shelby Cobra</td>
                <td>$1100</td>
                <td>Due</td>
                <td>
                  <span class="status inprogress">In Progress</span>
                </td>
              </tr>
              <tr>
                <td>Chevrolet Camaro</td>
                <td>$1300</td>
                <td>Due</td>
                <td>
                  <span class="status pending">Pending</span>
                </td>
              </tr>
              <tr>
                <td>Mustang</td>
                <td>$1200</td>
                <td>Paid</td>
                <td>
                  <span class="status delivered">Delivered</span>
                </td>
              </tr>
              <tr>
                <td>Ford GT</td>
                <td>$1500</td>
                <td>Paid</td>
                <td>
                  <span class="status return">Return</span>
                </td>
              </tr>
              <tr>
                <td>Shelby Cobra</td>
                <td>$1100</td>
                <td>Due</td>
                <td>
                  <span class="status inprogress">In Progress</span>
                </td>
              </tr>
              <tr>
                <td>Chevrolet Camaro</td>
                <td>$1300</td>
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
            <tbody class="table-container">
              <tr>
                <td width="60px">
                  <div class="imgBx">
                    <img src="customer1.jpg" alt="Customer 1" />
                  </div>
                </td>
                <td>
                  <h4>Michael<br /><span>United States</span></h4>
                </td>
              </tr>
              <tr>
                <td width="60px">
                  <div class="imgBx">
                    <img src="customer2.jpg" alt="Customer 2" />
                  </div>
                </td>
                <td>
                  <h4>Linda<br /><span>Canada</span></h4>
                </td>
              </tr>
              <tr>
                <td width="60px">
                  <div class="imgBx">
                    <img src="customer3.jpg" alt="Customer 3" />
                  </div>
                </td>
                <td>
                  <h4>Alex<br /><span>Australia</span></h4>
                </td>
              </tr>
              <tr>
                <td width="60px">
                  <div class="imgBx">
                    <img src="customer4.jpg" alt="Customer 4" />
                  </div>
                </td>
                <td>
                  <h4>Emily<br /><span>United Kingdom</span></h4>
                </td>
              </tr>
              <tr>
                <td width="60px">
                  <div class="imgBx">
                    <img src="customer5.jpg" alt="Customer 5" />
                  </div>
                </td>
                <td>
                  <h4>David<br /><span>Germany</span></h4>
                </td>
              </tr>
              <tr>
                <td width="60px">
                  <div class="imgBx">
                    <img src="customer6.jpg" alt="Customer 6" />
                  </div>
                </td>
                <td>
                  <h4>Sophia<br /><span>France</span></h4>
                </td>
              </tr>
            </tbody>
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
  mounted() {},
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

.table-container {
  max-height: 300px; /* Set the maximum height for the tbody */
  overflow-y: auto; /* Add vertical scrollbar when content overflows */
  display: block; /* Enable block-level container behavior for tbody */
}

.table-container thead,
tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}

.details .table-container::-webkit-scrollbar {
  width: 7px;
  background: var(--black);
  border-radius: 10px;
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

@media (max-width: 768px) {
  .details {
    grid-template-columns: repeat(1, 1fr);
  }

  .details .recentRents,
  .details .recentCustomers {
    min-height: auto;
  }
  .recentRents {
    overflow-x: auto;
  }

  .status.inprogress {
    white-space: nowrap;
  }
}
</style>
