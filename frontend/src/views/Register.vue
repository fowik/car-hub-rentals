<template>

    <section>
        <div class="container">
            <div class="registration-form">
                <!-- Registration Form -->
                <h2>Registration</h2>
                <form @submit.prevent="registerUser">
                    <!-- <div class="input-errors" v-for="(error, index) in $v.form.$eachError" :key="index">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div> -->
                    <input type="text" v-model="state.username" placeholder="Enter your username">
                    <span v-if="v$.username.$error">
                        {{ v$.username.$errors[0].$message }}
                    </span>
                    <input type="text" v-model="state.email" placeholder="Enter your e-mail">
                    <span v-if="v$.email.$error">
                        {{ v$.email.$errors[0].$message }}
                    </span>
                    <input type="password" v-model="state.password.password" placeholder="Type a password">
                    <span v-if="v$.password.password.$error">
                        {{ v$.password.password.$errors[0].$message }}
                    </span>
                    <input type="password" v-model="state.password.confirm" placeholder="Confirm a password">
                    <span v-if="v$.password.confirm.$error">
                        {{ v$.password.confirm.$errors[0].$message }}
                    </span>
                    <div>
                        <button @click="valForm">Register</button>
                    </div>
                    <p>Alerady have an account? <router-link :to="{ name: 'Login' }">Login now</router-link></p>
                </form>
            </div>
        </div>
    </section>

</template>

<script>
import withVuelidate from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'
import { reactive, computed } from 'vue'

export default {
    setup() {
        const state = reactive({
            username: '', 
            email: '',
            password: {
                password: '',
                confirm: '',
            },
        })

        const rules = computed(() => {
            return {
                username: { required, minLength: minLength(3) },
                email: { required, email },
                password: { 
                    password: { required, minLength: minLength(8) },
                    confirm: { required, sameAs: sameAs(state.password.password) }
                },
            }
        })

        const v$ = withVuelidate(rules, state)

        return {
            state,
            v$,
        }
    },
    methods: {
        valForm() {
            // Validate all fields
            this.v$.$validate();
        },
        
        async registerUser() {
            this.valForm();
            if (this.v$.username.$error || this.v$.email.$error || this.v$.password.password.$error || this.v$.password.confirm.$error) {
                // If there are validation errors, do not proceed with registration
                console.log('Form has validation errors');
                return;
            }

            // Send registration data to your server (make an API call here)
            const userData = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password.password,
            };

            try {
                const res = await fetch('http://localhost:3000/api/users/register', {
                    method: "POST", // *GET, POST, PUT, DELETE, etc.
                    mode: "cors", // no-cors, *cors, same-origin
                    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: "same-origin", // include, *same-origin, omit
                    headers: {
                        "Content-Type": "application/json",
                    },
                    redirect: "follow", // manual, *follow, error
                    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    body: JSON.stringify(userData), // body data type must match "Content-Type" header
                });

                if (res.ok) {
                    // Registration successful, redirect to login page
                    this.$router.push({ path: '/login' });
                    return res.json(); // parses JSON response into native JavaScript objects
                } else {
                    // Handle registration error, show error message to the user
                    console.error('Registration failed');
                }
            } catch (error) {
                console.error('Error during registration:', error);
            } finally {
                // Reset the flag after registration attempt (success or failure)
            }
             
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