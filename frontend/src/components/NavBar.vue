<template>
    
    <nav class="navbar">
        <div class="logo">
            <router-link to="/"><h1>Car<span class="orange-box">hub</span></h1></router-link>
        </div>
        <ul class="nav-links">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="#">Cars</router-link></li>
            <li><router-link to="#">Pricing</router-link></li>
            <li><router-link :to="{ name: 'About' }">About</router-link></li>
            <li>
                <router-link v-if="isLoggedIn" to="/profile">Profile</router-link>
                <router-link v-else :to="{ name: 'Register' }">Sign Up</router-link>
            </li>
        </ul>
    </nav>

</template>

<script>
export default {
    data() {
        return {
            isLoggedIn: false,
        };
    },
    methods: {
    checkUserSession() {
        console.log('Checking user session...');
        const user = JSON.parse(sessionStorage.getItem('user'));
        console.log('User data from sessionStorage:', user);
        if (user && user.username) {
            this.isLoggedIn = true;
        } else {
            this.isLoggedIn = false;
        }
        console.log('isLoggedIn:', this.isLoggedIn);
    },
    },
    created() {
        console.log('Component mounted');
        this.checkUserSession();
    },
};

</script>

<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #292929;
    padding: 20px;
}

.logo h1 {
    margin: 0;
    font-size: 28px;
    color: #ffffff; 
}

.logo .orange-box {
    background-color: #ffa31a;
    padding: 5px;
    border-radius: 5%;
    color: #1b1b1b;
    margin-left: 5px;
}

.nav-links {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
}

.nav-links li {
    margin-bottom: 10px;
}

.nav-links a {
    text-decoration: none;
    color: #ffffff;
    font-weight: bold;
}

.nav-links a:hover {
    text-decoration: underline;
}

/* Responsive Styles */
@media (min-width: 768px) {
    .nav-links {
        flex-direction: row;
    }

    .nav-links li {
        margin-bottom: 0;
        margin-right: 20px;
    }
}
</style>