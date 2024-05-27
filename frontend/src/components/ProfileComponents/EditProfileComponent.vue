<template>
  <div>
    <div class="border rounded bg-body-tertiary p-3">
      <EmailChangeModal
        :showModal="showEmailChangeModal"
        :userEmail="userData.email"
      />
      <NameChangeModal
        :showModal="showNameChangeModal"
        :userName="userData.displayName"
      />
      <PasswordChangeModal :showModal="showPasswordChangeModal" />
      <PhoneNumberModal
        :showModal="showNumberChangeModal"
        :phoneNumber="userData.phoneNumber"
        :email="userData.email"
      />
      <h5 class="d-flex text-start mb-3">Edit Profile</h5>
      <div class="d-flex flex-column">
        <div class="d-flex justify-content-between">
          <p class="p-2 m-2">{{ userData.displayName }}</p>
          <AddLicenseComponent />
        </div>
        <div class="d-flex justify-content-between">
          <p class="p-2 m-2">{{ userData.email }}</p>
          <button
            class="btn btn-primary m-2"
            data-bs-toggle="modal"
            data-bs-target="#emailChangeModal"
            @click="toggleEmailChangeModal"
          >
            Change Email
          </button>
        </div>

        <div class="d-flex justify-content-between">
          <p class="p-2 m-2">{{ userData.phoneNumber }}</p>
          <button
            class="btn btn-primary m-2 align-items-end"
            data-bs-toggle="modal"
            data-bs-target="#numberChangeModal"
            @click="toggleNumberChangeModal"
          >
            Change Phone number
          </button>
        </div>
        <div class="d-flex justify-content-end">
          <button
            class="btn btn-primary m-2"
            data-bs-toggle="modal"
            data-bs-target="#passwordChangeModal"
            @click="togglePasswordChangeModal"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmailChangeModal from "./EmailChangeModal.vue";
import NameChangeModal from "./NameChangeModal.vue";
import PasswordChangeModal from "./PasswordChangeModal.vue";
import PhoneNumberModal from "./PhoneNumberModal.vue";
import AddLicenseComponent from "./AddLicenseComponent.vue";

export default {
  name: "EditProfileComponent",
  components: {
    EmailChangeModal,
    NameChangeModal,
    PasswordChangeModal,
    PhoneNumberModal,
    AddLicenseComponent,
  },
  data() {
    return {
      userVerified: null,
      showEmailChangeModal: false,
      showNameChangeModal: false,
      showPasswordChangeModal: false,
      showNumberChangeModal: false,
    };
  },
  props: {
    isVerified: Function,
    userData: Object,
  },
  methods: {
    toggleEmailChangeModal() {
      this.showEmailChangeModal = !this.showEmailChangeModal;
    },
    toggleNameChangeModal() {
      this.showNameChangeModal = !this.showNameChangeModal;
    },
    togglePasswordChangeModal() {
      this.showPasswordChangeModal = !this.showPasswordChangeModal;
    },
    toggleNumberChangeModal() {
      this.showNumberChangeModal = !this.showNumberChangeModal;
    },
  },
};
</script>

<style scoped></style>
