<template>
  <footer
    class="footer text-center bg-dark border-body text-white mt-auto"
    data-bs-theme="dark"
  >
    <!-- Grid container -->
    <div class="container pt-4">
      <!-- Section: Social media -->
      <section class="mb-4">
        <!-- Facebook -->
        <a
          data-mdb-ripple-init
          class="btn btn-link btn-floating btn-lg text-body m-1 text-white"
          href="#!"
          role="button"
          data-mdb-ripple-color=""
        >
          <fa class="text-white" :icon="['fab', 'facebook']" />
        </a>

        <!-- Twitter -->
        <a
          data-mdb-ripple-init
          class="btn btn-link btn-floating btn-lg text-body m-1 text-white"
          href="#!"
          role="button"
          data-mdb-ripple-color="dark"
        >
          <fa class="text-white" :icon="['fab', 'twitter']" />
        </a>

        <!-- Google -->
        <a
          data-mdb-ripple-init
          class="btn btn-link btn-floating btn-lg text-body m-1 text-white"
          href="#!"
          role="button"
          data-mdb-ripple-color="dark"
        >
          <fa class="text-white" :icon="['fab', 'google']" />
        </a>

        <!-- Instagram -->
        <a
          data-mdb-ripple-init
          class="btn btn-link btn-floating btn-lg text-body m-1 text-white"
          href="#!"
          role="button"
          data-mdb-ripple-color="dark"
        >
          <fa class="text-white" :icon="['fab', 'instagram']" />
        </a>

        <!-- Linkedin -->
        <a
          data-mdb-ripple-init
          class="btn btn-link btn-floating btn-lg text-body m-1 text-white"
          href="#!"
          role="button"
          data-mdb-ripple-color="dark"
        >
          <fa class="text-white" :icon="['fab', 'linkedin']" />
        </a>
        <!-- Github -->
        <a
          data-mdb-ripple-init
          class="btn btn-link btn-floating btn-lg text-body m-1 text-white"
          href="#!"
          role="button"
          data-mdb-ripple-color="dark"
        >
          <fa class="text-white" :icon="['fab', 'github']" />
        </a>
      </section>
      <!-- Section: Social media -->
    </div>
    <!-- Grid container -->

    <!-- Copyright -->
    <div class="text-center p-4">&copy; 2023 CarHub. All rights reserved.</div>
    <!-- Copyright -->
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>

<style scoped>
.footer {
  background-color: rgba(0, 0, 0, 0.5) !important;
}
</style>
