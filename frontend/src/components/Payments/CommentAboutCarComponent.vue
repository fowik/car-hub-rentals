<template>
  <div
    class="modal fade"
    id="addComment"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Message</h1>
        </div>
        <div class="modal-body">
          <div class="form-floating mb-3">
            <textarea
              class="form-control"
              placeholder="Leave a message here"
              id="floatingTextareaDisabled"
              v-model="message"
            ></textarea>
            <label for="floatingTextareaDisabled">Your message</label>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="addMessage"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="addMessage">
            Add message
          </button>
        </div>
        <SpinnerComponent :isLoading="isLoading" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";

import { showSuccessToast } from "@/firebase/Toasts";
import SpinnerComponent from "../Spinner/SpinnerComponent.vue";

export default {
  name: "messageAboutCarComponent",
  props: {
    carId: {
      type: String,
      required: true,
    },
    uId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      message: "",
      isLoading: false,
    };
  },
  components: {
    SpinnerComponent,
  },
  methods: {
    async addMessage() {
      console.log(this.carId, this.uId);

      this.isLoading = true;
      try {
        const message = {
          message: this.message,
          carId: this.carId,
          uid: this.uId,
        };

        await axios.post(
          "https://us-central1-car-hub-130b6.cloudfunctions.net/api/messages/create",
          // "http://localhost:8000/messages/create",
          message
        );

        $("#addComment").hide();
        $(".modal-backdrop").remove();
        $(".modal-open").css("padding-right", "0px");
        $("body").css("overflow", "auto");
        this.isLoading = false;
        if (this.message !== "") {
          showSuccessToast("Thank you for providing feedback! <3");
        }
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    },
  },
};
</script>
