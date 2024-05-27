<template>
  <section class="d-flex align-items-center justify-content-center p-4">
    <RegisterFormComponent />
  </section>
</template>

<script>
import RegisterFormComponent from "../components/OtherComponents/RegisterFormComponent.vue";

export default {
  name: "AppRegister",
  components: {
    RegisterFormComponent,
  },
};
</script>

<style scoped></style>
