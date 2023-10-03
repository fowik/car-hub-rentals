<template>
    
    <section>
        <div class="container">
            <div class="login-form">
                <!-- Login Form -->
                <h2>Login</h2>
                <form>
                    <input type="text" placeholder="Username" required>
                    <input type="password" placeholder="Password" required>
                    <button type="submit">Login</button>
                    <p>Don't have and account? <router-link :to="{ name: 'Register' }">Sign up now</router-link></p>
                </form>
            </div>
        </div>
    </section>

</template>

<script></script>

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