<template>
  <section id="about" class="py-5 overflow-auto">
    <div class="container">
      <h2 class="text-center mb-4 display-4">Reserve Your Ride with Ease</h2>
      <p class="text-center mb-4 lead">
        Booking a car has never been easier. With our user-friendly reservation
        system, you can:
      </p>
      <ul class="list-group mb-5">
        <li class="list-group-item">
          <strong>Browse our diverse fleet:</strong> Choose from economy cars,
          luxury sedans, SUVs, and more.
        </li>
        <li class="list-group-item">
          <strong>Select your preferred vehicle:</strong> View detailed
          descriptions and photos to make an informed choice.
        </li>
        <li class="list-group-item">
          <strong>Reserve online:</strong> Secure your car in just a few clicks,
          anytime, anywhere.
        </li>
      </ul>
      <h3 class="text-center mb-4 h2">Find Your Car with Precision</h3>
      <p class="text-center mb-5 lead">
        Once you've reserved your car, easily locate it using our interactive
        <router-link to="/reservation" class="btn-link">map</router-link>
        feature. Our advanced GPS technology ensures that you can find your
        vehicle quickly and conveniently, so you can get on the road without any
        hassle.
      </p>
      <h3 class="text-center mb-4 h2">Learn to Drive with Confidence</h3>
      <p class="text-center mb-5 lead">
        At <router-link to="/" class="btn-link">CarHub</router-link>, we support
        your journey to becoming a confident driver. If you have a valid white
        license and at least three years of driving experience, you can teach
        someone how to drive using our rental cars. However, please note that
        all responsibility lies with the instructor, ensuring a safe and
        responsible learning experience.
      </p>
      <h3 class="text-center mb-4 h2">Why Choose Us?</h3>
      <ul class="list-group mb-5">
        <li class="list-group-item">
          <strong>Wide Range of Vehicles:</strong> From compact cars to luxury
          vehicles, we have something for everyone.
        </li>
        <li class="list-group-item">
          <strong>Convenient Locations:</strong> Easily accessible rental points
          across the city.
        </li>
        <li class="list-group-item">
          <strong>Affordable Rates:</strong> Competitive pricing with no hidden
          fees.
        </li>
        <li class="list-group-item">
          <strong>24/7 Customer Support:</strong> Our friendly team is always
          here to help you.
        </li>
      </ul>
      <p class="text-center mb-4 lead">
        Ready to hit the road? Start your journey with
        <router-link to="/" class="btn-link">CarHub</router-link> today. Whether
        you’re renting a car for a trip or teaching someone how to drive, we’re
        here to make your experience smooth and enjoyable.
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: "AboutComponent",
};
</script>

<style scoped></style>
