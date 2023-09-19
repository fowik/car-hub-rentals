<template>
  <NavBar />
  <router-view />
  <Footer />
</template>

<script>
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    Footer
  },
  data () { 
    return {
      title: 'Welcome to Car Hub Rentals'
    }
  }
}
</script>

<style>

</style>