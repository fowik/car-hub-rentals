<template>

    <section>
        <h2>Welcome to profile, {{ username }}!</h2>
        <p>Discover our wide range of rental cars and explore the world with comfort and style.</p>
        <p><router-link to="/profile/logout">Logout</router-link></p>
    </section>
</template>

<script>
import router from '@/router';

export default {
    data() {
        return {
            username: ''
        };
    },
    mounted() {
        // Retrieve the user object from sessionStorage
        const user = JSON.parse(sessionStorage.getItem('user'));
        // Check if the user object is present and has a username property
        if (user && user.username) {
            this.username = user.username;
        }
        else {
            // Handle the case when the user is not logged in or user data is not available in sessionStorage
            console.error("User data not found in sessionStorage");
        }
    },
};
</script>

<style scoped>
section 
{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
}
</style>