<template>
  <div>
    <div v-if="!uploaded">
      <input type="file" @change="onFileChange" />
      <button @click="processImage" class="btn btn-primary">
        Process Image
      </button>
    </div>
    <div v-if="data">
      <p>Name: {{ data.name }}</p>
      <p>Surname: {{ data.surname }}</p>
      <p>License No: {{ data.licenseNo }}</p>
      <p>Date of Birth: {{ data.dob }}</p>
      <!-- <p>Start Date: {{ data.start }}</p> -->
      <p>Expiry Date: {{ data.expiry }}</p>
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

export default {
  data() {
    return {
      imageFile: null,
      data: null,
      uploaded: false,
    };
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
        this.data = parsedData;
        this.updateDatabase(parsedData);
      } catch (error) {
        console.error("Error processing image:", error);
      }
    },
    parseText(text) {
      const surname = text.match(/1.\s*([^\n]*)/)?.[1].trim() || "";
      const name = text.match(/2.\s*([^\n]*)/)?.[1].trim() || "";
      const dob = text.match(/3.\s*([\d/.]+)/)?.[1] || "";
      const expiry = this.formatDate(text.match(/4b.\s*([\d/.]+)/)?.[1]) || "";
      const licenseNo = text.match(/5.\s*(\w+)/)?.[1] || "";

      return { surname, name, dob, expiry, licenseNo };
    },
    formatDate(dateStr) {
      // Assuming the date format is either `YYYYMMDD` or `YYYY.MM.DD`
      if (!dateStr) return "";
      const matches = dateStr.match(/(\d{4})[./]?(\d{2})[./]?(\d{2})/);
      if (matches) {
        const [, year, month, day] = matches;
        return `${day}.${month}.${year}`;
      }
      return dateStr; // Return the original string if it doesn't match the expected pattern
    },
    async updateDatabase(data) {
      data = data || this.data;

      const user = await getCurrentUser();
      // Check if data exists before setting uid

      if (data) {
        data.uid = user.id;
      } else {
        console.error("data is null or undefined");
      }

      console.log("Updating database with:", data);

      try {
        await axios.post("http://localhost:8000/verify-license", {
          data: data,
        });

        showSuccessToast("License verified successfully!");
        this.uploaded = true; // Set uploaded to true after successful verification
      } catch (error) {
        showErrorToast("Error verifying license. Please try again.");
      }
    },
    async checkLicense() {
      const user = await getCurrentUser();
      const licenseRef = ref(db, "licenses");
      const licenseSnapshot = await get(licenseRef);
      const licenseData = licenseSnapshot.val();

      console.log("License data:", licenseData);
      // Check if there is any license with the uid matching the current user's ID
      let userHasLicense = false;
      if (licenseData) {
        for (const licenseId in licenseData) {
          if (licenseData[licenseId].uid === user.id) {
            userHasLicense = true;
            this.data = licenseData[licenseId]; // Set the data to display the license information
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
    // check if user has uploaded a license
    this.checkLicense();
  },
};
</script>
