<template>
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
</template>

<script>
export default {
  props: {
    cars: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
#cars .card {
  width: 250px;
  margin-bottom: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

#cars .card .image {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #f1f1f1;
  color: black;
}

#cars .card .image img {
  width: 200px;
  height: auto;
}

#cars .card .title {
  font-size: 1.2em;
  font-weight: bold;
  padding: 10px;
  text-align: center;
  color: black;
}

#cars .card .price {
  font-size: 1em;
  color: black;
  text-align: center;
  padding-bottom: 10px;
}

#cars .btn-reserve {
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

#cars .btn-reserve:hover {
  background-color: #333;
  color: #fff;
}
</style>
