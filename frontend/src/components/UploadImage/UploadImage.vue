<template>
  <form
    id="uploadForm"
    @submit.prevent="onUpload"
    enctype="multipart/form-data"
  >
    <input type="file" id="imageInput" @change="onFileChange" />
    <button type="submit">Upload</button>
  </form>
</template>

<script>
import axios from "axios";
import axiosRetry from "axios-retry";

import { getStorage, ref, uploadBytes } from "firebase/storage";

// Custom retry condition function
const retryCondition = (error) => {
  // Check if the error response status code is in the range of 5xx or if there's a network error
  if (error.response) {
    // Retry on 5xx status codes
    return error.response.status >= 500 && error.response.status < 600;
  } else if (error.code) {
    // Retry on network errors
    return (
      error.code === "ECONNABORTED" ||
      error.code === "ENOTFOUND" ||
      error.code === "EAI_AGAIN"
    );
  }
  return false;
};

// Configure axios-retry with custom retry condition function and retries count
axiosRetry(axios, { retries: 3, retryCondition });

export default {
  name: "UploadImage",
  data() {
    return {
      image: null,
    };
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.image = file;
      console.log("Selected file:", this.image);
    },
    async onUpload() {
      // upload image using storage service
      const storage = getStorage();

      const storageRef = ref(storage, "car_images/" + this.image.name);
      try {
        console.log("Uploading file...");
        await uploadBytes(storageRef, this.image);
        alert("Image uploaded successfully");
      } catch (error) {
        console.error("Upload Error:", error);
        alert("Error uploading image");
      }
    },
    // async onUpload() {
    //   if (!this.image) {
    //     alert("Please select an image to upload.");
    //     return;
    //   }

    //   const formData = new FormData();
    //   formData.append("image", this.image);

    //   try {
    //     console.log("Uploading file...");
    //     const response = await axios.post(
    //       "https://us-central1-car-hub-130b6.cloudfunctions.net/api/upload",
    //       // "http://localhost:8000/upload",
    //       formData,
    //       {
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //         },
    //       }
    //     );
    //     alert("Image uploaded successfully");
    //     console.log("Server response:", response.data);
    //   } catch (error) {
    //     console.error("Upload Error:", error);
    //     alert("Error uploading image");
    //   }
    // },
  },
};
</script>
