<template>
  <button
    class="btn btn-secondary d-inline"
    type="button"
    v-on:click="toggleInput($event)"
  >
    <fa icon="pencil" />
  </button>
  <button
    class="btn btn-danger d-none"
    type="button"
    v-on:click="cancelEdit($event)"
  >
    <fa icon="times" />
  </button>
  <button
    class="btn btn-success d-none"
    type="button"
    v-on:click="saveEdit($event)"
  >
    <fa icon="check" />
  </button>
</template>

<script>
export default {
  name: "EditCancelSuccessButtons",
  data() {
    return {};
  },
  props: {
    saveProfileChanges: Function,
    updateNewEmail: Function,
  },
  methods: {
    toggleInput(event) {
      const button = event.currentTarget;
      const inputField = button.previousElementSibling;
      inputField.disabled = !inputField.disabled;
      if (!inputField.disabled) {
        inputField.focus();
      }
      button.classList.replace("d-inline", "d-none"); // Hide the pencil button
      button.nextElementSibling.classList.remove("d-none"); // Show the cancel button
      button.nextElementSibling.nextElementSibling.classList.remove("d-none"); // Show the save button
    },
    cancelEdit(event) {
      const button = event.currentTarget;
      const inputField = button.previousElementSibling.previousElementSibling;
      inputField.disabled = !inputField.disabled;
      button.previousElementSibling.classList.replace("d-none", "d-inline"); // Show the pencil button
      button.classList.add("d-none"); // Hide the cancel button
      button.nextElementSibling.classList.add("d-none"); // Hide the save button
    },
    saveEdit(event) {
      const button = event.currentTarget;
      const inputField =
        button.previousElementSibling.previousElementSibling
          .previousElementSibling;
      inputField.disabled = !inputField.disabled;
      button.previousElementSibling.previousElementSibling.classList.replace(
        "d-none",
        "d-inline"
      ); // Show the pencil button
      button.previousElementSibling.classList.add("d-none"); // Hide the cancel button
      button.classList.add("d-none"); // Hide the save button

      // Если сохранение профиля активно (включено), вызываем соответствующий метод для сохранения изменений в базе данных
      if (this.saveProfileChanges) {
        this.saveProfileChanges(); // Вызываем метод сохранения изменений профиля
      }

      if (this.updateNewEmail) {
        this.updateNewEmail(); // Вызываем метод обновления нового email
      }
    },
  },
};
</script>

<style scoped>
.btn-secondary:nth-last-child(3) {
  border-top-right-radius: 5px !important;
  border-bottom-right-radius: 5px !important;
}
</style>
