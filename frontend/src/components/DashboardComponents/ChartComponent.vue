<template>
  <div class="d-flex justify-content-center mt-4 pb-4 border rounded bg-dark">
    <div class="w-99">
      <h2 class="text-start p-2">Customers data</h2>
      <div class="bar-chart-container">
        <Bar
          class="m-0"
          id="my-chart-id"
          :options="chartOptions"
          :data="chartData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import { randomData, options } from "@/assets/data/chartData.js";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "ChartComponent",
  components: {
    Bar,
  },
  data() {
    return {
      chartData: randomData(),
      chartOptions: options,
    };
  },
};
</script>

<style scoped>
.bar-chart-container {
  width: 95% !important;
  height: 300px !important;
  max-height: 300px !important;
}

.w-99 {
  width: 98.5% !important;
}
</style>
