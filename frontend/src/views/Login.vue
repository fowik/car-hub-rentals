<template>
    
    <section>
        <div class="container">
            <div class="login-form">
                <!-- Login Form -->
                <h2>Login</h2>
                <form @submit.prevent="loginUser">
                    <input type="text" v-model="username" placeholder="Username" required>
                    <input type="password" v-model="password" placeholder="Password" required>
                    <button type="submit">Login</button>
                    <p>Don't have and account? <router-link :to="{ name: 'Register' }">Sign up now</router-link></p>
                </form>
            </div>
        </div>
    </section>

</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        async loginUser() {
        const userData = {
            username: this.username,
            email: this.username,
            password: this.password,
        };
        try {
            const response = await fetch('http://localhost:3000/api/users/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const user = await response.json();
                // Handle successful login, e.g., store user data in Vuex store or localStorage
                console.log("Login successful:", user);
                sessionStorage.setItem('user', JSON.stringify(user));
                this.$router.push({ path: '/profile' });
            } else {
                // Handle failed login (e.g., wrong credentials)
                console.error("Login failed");
            }
        } catch (error) {
            // Handle network errors or other issues
            console.error("Error during login:", error);
        }
        }
    }
};
</script>

<style scoped>
.login-form {
    background-color: #292929;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    max-width: 400px;
    margin: 0 auto;
}

.login-form input[type="text"],
.login-form input[type="password"] {
    width: 100%;
    padding: 10px;
    margin: 10px -10px 10px -10px;
    border: none;
    border-radius: 5px;
    justify-content: center;
    outline: none;
}

.login-form button {
    background-color: #ffa31a;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    margin-top: 20px;
    margin-bottom: 10px;
}

.login-form button:hover {
    background-color: #f49200;
}

.login-form a {
    text-decoration: none;
    color: #ffa31a;
}

.login-form a:hover {
    text-decoration: underline;
}

</style>