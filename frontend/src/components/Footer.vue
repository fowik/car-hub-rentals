<template>
  <footer>
    <p>&copy; 2023 CarHubRentals. All rights reserved.</p>
  </footer>
</template>

<style scoped>
footer {
  background-color: #292929;
  color: #fff;
  padding: 20px 0;
  text-align: center;
  font-size: 14px; /* Set a base font size */
}

/* Responsive Styles */
@media (min-width: 768px) {
  footer {
    font-size: 16px; /* Increase font size for larger screens */
  }

  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh; /* Set the minimum height of the app to full viewport height */
  }

  main {
    flex: 1; /* Allow main content to take up remaining vertical space */
  }
}
</style>
