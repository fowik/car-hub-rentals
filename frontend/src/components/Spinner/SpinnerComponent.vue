<template>
  <div class="spinner-container" v-if="isLoading">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <!-- to add spinner to the page -->
  <div class="form-loading-overlay" v-if="isLoading"></div>
</template>

<script>
export default {
  name: "SpinnerComponent",
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style>
.form-loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3); /* Прозрачный черный цвет */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
  border-radius: 0.375rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* Тень, чтобы затемнить границы формы */
}

.spinner-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
</style>
