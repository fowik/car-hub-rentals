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
            <li><router-link :to="{ name: 'Register' }">Sign Up</router-link></li>
        </ul>
    </nav>

</template>

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
}

.nav-links li {
    margin-right: 20px;
}

.nav-links a {
    text-decoration: none;
    color: #ffffff;
    font-weight: bold;
}

.nav-links a:hover {
    text-decoration: underline;
}
</style>
