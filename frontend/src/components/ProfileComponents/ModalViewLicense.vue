<template>
  <button
    class="btn btn-primary m-2"
    data-bs-target="#AddModalToggle"
    data-bs-toggle="modal"
  >
    View Data
  </button>
  <div
    class="modal fade"
    id="AddModalToggle"
    aria-hidden="true"
    aria-labelledby="AddModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="AddModalToggleLabel">
            Driving License data
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>Name: {{ data.name }}</p>
          <p>Surname: {{ data.surname }}</p>
          <p>License No: {{ data.licenseNo }}</p>
          <p>Date of Birth: {{ data.dob }}</p>
          <p class="mb-0">Expiry Date: {{ data.expiry }}</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
  },
};
</script>
