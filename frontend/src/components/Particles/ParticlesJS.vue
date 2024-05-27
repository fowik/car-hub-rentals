<template>
  <vue-particles
    class="vue-particles position-absolute"
    color="#dedede"
    :particleOpacity="0.7"
    :particlesNumber="100"
    shapeType="circle"
    :particleSize="4"
    linesColor="#dedede"
    :linesWidth="1"
    :lineLinked="true"
    :lineOpacity="0.4"
    :linesDistance="150"
    :moveSpeed="0.4"
    :hoverEffect="true"
    hoverMode=""
    :clickEffect="true"
    clickMode="push"
  >
  </vue-particles>
</template>

<script>
export default {
  name: "ParticlesJS",
};
</script>

<style scoped>
.vue-particles {
  top: 0;
  right: 0;
  bottom: 50px;
  left: 0;
  z-index: 0;
}
</style>
