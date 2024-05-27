<template>
  <div class="card m-3">
    <img class="card-img-top" :src="car.imageUrl" alt="Car Image" />
    <div class="card-body">
      <h5 class="card-title">{{ car.model }}</h5>
      <p class="card-text"></p>
      <button class="btn btn-primary">Reserve</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    car: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.card {
  min-width: 250px;
  max-width: 300px;
}
</style>
