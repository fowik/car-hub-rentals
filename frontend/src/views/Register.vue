<template>

    <section>
        <div class="container">
            <div class="registration-form">
                <!-- Registration Form -->
                <h2>Registration</h2>
                <form @submit.prevent="registerUser">
                    <input type="text" v-model="username" placeholder="Enter your username" required>
                    <input type="text" v-model="email" placeholder="Enter your e-mail" required>
                    <input type="password" v-model="password" placeholder="Type a password" required>
                    <input type="password" v-model="confirmPassword" placeholder="Confirm a password" required>
                    <button type="submit">Register</button>
                    <p>Alerady have an account? <router-link :to="{ name: 'Login' }">Login now</router-link></p>
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
            email: '',
            password: '',
            confirmPassword: '',
        };
    },
    methods: {
        async registerUser() {
            // Validate password and confirm password
            if (this.password != this.confirmPassword) {
                alert("Password and Confirm Password do not match.");
                return;
            }

            // Send registration data to your server (make an API call here)
            const userData = {
                username: this.username,
                email: this.email,
                password: this.password
            };

            await fetch('http://localhost:3000/api/users/register', {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(userData), // body data type must match "Content-Type" header
            });
            return response.json(); // parses JSON response into native JavaScript objects
        }
    }
};
</script>

<style>

.registration-form {
    background-color: #292929;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    max-width: 400px;
    margin: 0 auto;
}

.registration-form input[type="text"],
.registration-form input[type="password"] {
    width: 100%;
    padding: 10px;
    margin: 10px -10px 10px -10px;
    border: none;
    border-radius: 5px;
    justify-content: center;
    outline: none;
}

.registration-form button {
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

.registration-form button:hover {
    background-color: #f49200;
}

.registration-form a {
    text-decoration: none;
    color: #ffa31a;
}

.registration-form a:hover {
    text-decoration: underline;
}

</style>