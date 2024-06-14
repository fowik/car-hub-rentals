<template>
  <div>
    <div v-if="!uploaded" class="d-flex justify-content-end m-2">
      <input type="file" @change="onFileChange" />
      <button @click="processImage" class="btn btn-primary">
        Process Image
      </button>
    </div>
    <div v-if="data" class="d-flex justify-content-between">
      <p class="p-2 m-2 text-truncate">Driving License uploaded!</p>
      <ModalViewLicense :data="data" />
    </div>
  </div>
</template>

<script>
import Tesseract from "tesseract.js";
import axios from "axios";
import { getCurrentUser } from "@/firebase/firebase";
import { showErrorToast, showSuccessToast } from "@/firebase/Toasts";

import { db } from "@/firebase/firebase";
import { ref, get } from "firebase/database";

import ModalViewLicense from "./ModalViewLicense.vue";

export default {
  data() {
    return {
      imageFile: null,
      data: null,
      uploaded: false,
    };
  },
  components: {
    ModalViewLicense,
  },
  methods: {
    onFileChange(event) {
      this.imageFile = event.target.files[0];
    },
    async processImage() {
      if (!this.imageFile) return;

      try {
        const result = await Tesseract.recognize(this.imageFile, "eng", {
          logger: (m) => console.log(m),
        });

        const parsedData = this.parseText(result.data.text);
        if (parsedData) {
          this.data = parsedData;
          this.updateDatabase(parsedData);
        } else {
          showErrorToast(
            "Error parsing license data. Please ensure the image is clear."
          );
        }
      } catch (error) {
        console.error("Error processing image:", error);
      }
    },
    parseText(text) {
      const surname = text.match(/1.\s*([^\n]*)/)?.[1].trim() || null;
      const name = text.match(/2.\s*([^\n]*)/)?.[1].trim() || null;
      const dob = text.match(/3.\s*([\d/.]+)/)?.[1] || null;
      const expiry =
        this.formatDate(text.match(/4b.\s*([\d/.]+)/)?.[1]) || null;
      const licenseNo = text.match(/5.\s*(\w+)/)?.[1] || null;

      if (!surname || !name || !dob || !expiry || !licenseNo) {
        console.error("Error: Missing required fields in parsed data", {
          surname,
          name,
          dob,
          expiry,
          licenseNo,
        });
        return null;
      }

      return { surname, name, dob, expiry, licenseNo };
    },
    formatDate(dateStr) {
      if (!dateStr) return "";
      const matches = dateStr.match(/(\d{4})[./]?(\d{2})[./]?(\d{2})/);
      if (matches) {
        const [, year, month, day] = matches;
        return `${day}.${month}.${year}`;
      }
      return dateStr;
    },
    async updateDatabase(data) {
      const user = await getCurrentUser();
      if (data) {
        data.uid = user.id;
      } else {
        console.error("Data is null or undefined");
      }

      console.log("Updating database with:", data);

      try {
        await axios.post(
          "https://us-central1-car-hub-130b6.cloudfunctions.net/api/verify-license",
          {
            data: data,
          }
        );

        showSuccessToast("License verified successfully!");
        this.uploaded = true;
      } catch (error) {
        showErrorToast("Error verifying license. Please try again.");
      }
    },
    async checkLicense() {
      const user = await getCurrentUser();
      const licenseRef = ref(db, "licenses");
      const licenseSnapshot = await get(licenseRef);
      const licenseData = licenseSnapshot.val();

      let userHasLicense = false;
      if (licenseData) {
        for (const licenseId in licenseData) {
          if (licenseData[licenseId].uid === user.id) {
            userHasLicense = true;
            this.data = licenseData[licenseId];
            break;
          }
        }
      }

      if (userHasLicense) {
        this.uploaded = true;
      } else {
        this.uploaded = false;
      }
    },
  },
  mounted() {
    this.checkLicense();
  },
};
</script>
