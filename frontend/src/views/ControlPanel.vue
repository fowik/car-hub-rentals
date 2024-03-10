<template>
  <section>
    <ContorlPanelNavigation />
    <!-- main content -->
    <div class="main transition-all duration-500">
      <div class="topbar h-16 flex justify-between items-center px-4">
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
            <div class="numbers">{{ bookingCount }}</div>
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
            <div class="numbers">${{ bookingEarning }}</div>
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
              <tr v-for="booking in bookings" :key="booking.id">
                <td>{{ booking.cars.brand.BrandName }}</td>
                <td>
                  {{
                    booking.bookedPrice ? booking.bookedPrice : "In Progress"
                  }}$
                </td>
                <td>Paid</td>
                <td>
                  <span
                    v-if="booking.status === 'Delivered'"
                    class="status delivered"
                    >Delivered</span
                  >
                  <span
                    v-if="booking.status === 'In Progress'"
                    class="status inprogress"
                    >In Progress</span
                  >
                  <span
                    v-if="booking.status === 'Pending'"
                    class="status pending"
                    >Pending</span
                  >
                  <span v-if="booking.status === 'Return'" class="status Return"
                    >Return</span
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- New Customers -->
        <div class="recentCustomers">
          <div class="cardHeader">
            <h2>New Customers</h2>
          </div>
          <table>
            <tbody class="table-container">
              <tr v-for="customer in customers" :key="customer.id">
                <td width="60px">
                  <div class="imgBx">
                    <img
                      src="../assets/img/profile-background.jpg"
                      alt="Customer 1"
                    />
                  </div>
                </td>
                <td>
                  <h4>
                    {{
                      customer.fullName
                        ? customer.fullName
                        : "Name not available"
                    }}<br /><span>Latvia</span>
                  </h4>
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
      bookings: [],
      bookingCount: 0,
      bookingEarning: 0,
      customers: [],
    };
  },
  components: {
    ContorlPanelNavigation,
  },
  mounted() {
    this.getLastBookings();
    this.getNewCustomers();
  },
  methods: {
    async getLastBookings() {
      try {
        const response = await fetch("http://localhost:3000/api/bookings/get", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          let data = await response.json();
          // Sort the bookings by createdAt property
          data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          this.bookings = data;
          this.bookingCount = data.length;
          this.bookingEarning = data.reduce(
            (acc, booking) => acc + booking.bookedPrice,
            0
          );
          console.log(this.bookings);
        } else {
          console.error("Failed to fetch bookings - Status:", response.status);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getNewCustomers() {
      try {
        const response = await fetch("http://localhost:3000/api/users/get", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          let data = await response.json();
          // Sort the customers by createdAt property
          data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          this.customers = data;
          console.log(this.customers);
        } else {
          console.error("Failed to fetch new customers");
        }
      } catch (error) {
        console.error(error);
      }
    },
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
</style>
