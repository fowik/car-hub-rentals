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
          <h1 class="modal-title fs-5" id="exampleModalLabel">message</h1>
        </div>
        <div class="modal-body">
          <div class="form-floating mb-3">
            <textarea
              class="form-control"
              placeholder="Leave a message here"
              id="floatingTextareaDisabled"
              v-model="message"
            ></textarea>
            <label for="floatingTextareaDisabled">messages</label>
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
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";

import { showSuccessToast } from "@/firebase/Toasts";

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
    };
  },
  methods: {
    async addMessage() {
      console.log(this.carId, this.uId);

      try {
        const message = {
          message: this.message,
          carId: this.carId,
          uid: this.uId,
        };

        await axios.post(
          "https://us-central1-car-hub-130b6.cloudfunctions.net/api/export-xlsx",
          // "http://localhost:8000/messages/create",
          message
        );

        $("#addComment").hide();
        $(".modal-backdrop").remove();

        if (this.message !== "") {
          showSuccessToast("Thank you for providing feedback! <3");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
