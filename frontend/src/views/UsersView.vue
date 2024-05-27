<template>
  <div>{{ users }}</div>
</template>

<script>

export default {
  name: "UsersView",
  data() {
    return {
      users: [],
      socket: null,
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    
  },
};
</script>
