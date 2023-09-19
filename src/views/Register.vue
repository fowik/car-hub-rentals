<template>

    <section>
        <div class="container">
            <div class="registration-form">
                <!-- Registration Form -->
                <h2>Registration</h2>
                <form>
                    <input type="text" placeholder="Enter your username" required>
                    <input type="text" placeholder="Enter your e-mail" required>
                    <input type="password" placeholder="Create a password" required>
                    <input type="password" placeholder="Confirm a password" required>
                    <button type="submit">Register</button>
                    <p>Alerady have an account? <router-link :to="{ name: 'Login' }">Login now</router-link></p>
                </form>
            </div>
        </div>
    </section>

</template>

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