<template>
  <div
    class="modal fade"
    id="nameChangeModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form class="form-floating m-2">
            <input
              type="email"
              class="form-control"
              id="currentName"
              placeholder="name@example.com"
              :value="userName"
              disabled
            />
            <label for="currentName">Current Name</label>
          </form>
          <form class="form-floating m-2">
            <input
              type="email"
              class="form-control"
              id="newName"
              placeholder="name@example.com"
            />
            <label for="newName">New Name</label>
          </form>
          <form class="form-floating m-2">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="name@example.com"
            />
            <label for="password">Password</label>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NameChangeModal",
  props: {
    userName: String,
  },
};
</script>
