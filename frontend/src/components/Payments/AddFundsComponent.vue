<template>
  <button
    type="button"
    class="btn btn-success"
    data-bs-toggle="modal"
    data-bs-target="#addFunds"
  >
    Add funds
  </button>
  <div
    class="modal fade"
    id="addFunds"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Add funds</h1>
        </div>
        <div class="modal-body">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text rounded-left">€</span>
            </div>
            <input
              type="text"
              class="form-control"
              aria-label="Amount (to the nearest dollar)"
              v-model="addFunds.amount"
              id="floatingAmount"
              placeholder="0.01 (min 3€)"
              step="0.01"
              min="3"
              @input="validateInput"
              @blur="checkMinValue"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="submit">
            Add funds
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import { getCurrentUser } from "@/firebase/firebase";

import { showErrorToast } from "@/firebase/Toasts";

export default {
  name: "AddFundsComponent",
  data() {
    return {
      addFunds: {
        uid: "",
        amount: null,
      },
    };
  },
  methods: {
    async submit() {
      try {
        const userData = await getCurrentUser();
        this.addFunds.uid = userData.id;
        this.addFunds.moneyAdded = 0;
        if (this.addFunds.amount < 3) {
          showErrorToast("Amount must be greater than 3€");
          return;
        }

        const response = await axios.post(
          //   "http://localhost:8000/payments/create-checkout-session",
          "https://us-central1-car-hub-130b6.cloudfunctions.net/api/payments/create-checkout-session",
          {
            addFunds: this.addFunds,
          }
        );

        window.location.href = response.data.url;
      } catch (error) {
        console.error(error);
      }
    },
    validateInput(event) {
      let value = event.target.value;
      const cursorPosition = event.target.selectionStart;

      value = value.replace(",", ".");

      const regex = /^\d*\.?\d{0,2}$/;

      if (!regex.test(value)) {
        value = value.slice(0, -1);
      }

      this.addFunds.amount = value;

      event.target.value = value;

      event.target.setSelectionRange(cursorPosition, cursorPosition);
    },

    checkMinValue(event) {
      let value = parseFloat(event.target.value);

      if (isNaN(value) || value < 3) {
        value = 3.0;
      }

      this.addFunds.amount = value.toFixed(2);
      event.target.value = this.addFunds.amount;
    },
  },
  mounted() {},
};
</script>

<style scoped>
.rounded-left {
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
