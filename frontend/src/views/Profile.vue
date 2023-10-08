<template>

    <section>
        <div class="side-bar-left">
            <div class="side-bar-username">
                <img src="https://marketplace.canva.com/EAFXS8-cvyQ/1/0/400w/canva-brown-and-light-brown%2C-circle-framed-instagram-profile-picture-SsX0UeCGP8g.jpg" alt="profile_picture">
                <h3>{{ username }}</h3>
            </div>
            <div class="side-bar-links">
                <router-link to="/profile">Profile</router-link>
                <router-link to="/profile/change-password">Password</router-link>
                <router-link to="/profile/history">History</router-link>
                <router-link to="/profile/age-verification">Age Verification</router-link>
                <router-link to="/profile/email-verification">Email Verification</router-link>
                <router-link to="/profile/logout">Logout</router-link>
            </div>
        </div>
        <div class="main-bar">
            <div class="main-bar-content">
                <div class="menu">
                    <h2>Profile</h2>
                    <p>Last updated: 2023/02/15 15:18:14</p>
                </div>
                <div class="content-to-save">
                    <div class="input-row">
                        <div class="input-group">
                            <label>Full name</label>
                            <input type="text" placeholder="Enter your full name">
                        </div>
                        <div class="input-group">
                            <label>Username</label>
                            <input type="text" placeholder="Enter your username" :value="username">
                        </div>
                    </div>
                    <div class="input-row">
                        <div class="input-group">
                            <label>Email</label>
                            <input type="text" placeholder="Enter your email" :value="email">
                        </div>
                        <div class="input-group">
                            <label>Smth else</label>
                            <input type="text" placeholder="Enter your Smth else">
                        </div>
                    </div>
                    <div class="save-btn">
                        <button>Save</button>
                    </div>
                </div>
            </div>
        </div>

    </section>
</template>

<script>
import router from '@/router';

export default {
    data() {
        return {
            username: '',
            email: '',
        };
    },
    mounted() {
        // Retrieve the user object from sessionStorage
        const user = JSON.parse(sessionStorage.getItem('user'));
        // Check if the user object is present and has a username property
        if (user && user.username) {
            this.username = user.username;
            this.email = user.email;
        }
        else {
            // Handle the case when the user is not logged in or user data is not available in sessionStorage
            this.$router.push({ path: '/login' });
        }
    },
};
</script>

<style scoped>
section {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
}

.side-bar-left {
    display: flex;
    flex-direction: column;
    min-height: 51vh;
    width: 15%;
    background-color: #292929;
    color: #ffffff;
    border-radius: 15px;
}

@media (max-width: 768px) {
    .side-bar-left {
        width: 100%;
        min-height: auto;
        margin-bottom: 20px;
    }

    .main-bar {
        width: 100%;
        min-height: auto;
    }

    .input-group {
        width: 100%;
    }
    
    .save-btn button {
        width: 100%;
        margin: 10px 0;
    }
}

.side-bar-username
{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 30%;
    border-bottom: 3px solid #343434;
}

.side-bar-username img
{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-top: 20px;
    /* transform: scale(2); */
}

.side-bar-links
{
    display: flex;
    flex-direction: column;
    justify-content: left;
}

.side-bar-links a.router-link-active {
    border-left: 5px solid #ffa31a;
    color: #ffa31a;
    width: 100%-5px !important;
    background-color: #f4920080 ;
}

.side-bar-links a
{
    display: flex;
    padding-left: 15px;
    padding-bottom: 15px;
    padding-top: 15px;
    color: #ffffff;
    font-weight: 600;
}

.side-bar-links a:hover
{
    border-left: 5px solid #ffa31a;
    color: #ffa31a;
    width: 100%-5px !important;
    background-color: #f4920080 ;
}

.main-bar
{
    display: flex;
    flex-direction: column;
    width: 40%;
    min-height: 41vh;
    background-color: #292929;
    color: #ffffff;
    border-radius: 15px;
    margin-left: 3%;
}

.main-bar-content {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    margin-left: 45px;
    margin-right: 45px;
}

.main-bar-content .menu
{
    display: flex;
    flex-direction: row;
    width: 100%;
}

.main-bar-content .menu h2
{
    padding-left: 15px;
    border-left: 5px solid #ffa31a;
    color: #ffa31a;
}

.main-bar-content .menu p
{
    right: 0px;
    margin: auto 0px auto auto;
    color: #666666;
    font-weight: 600;
    font-size: small;
}

.main-bar-content .content-to-save
{
    display: flex;
    flex-direction: column;
    margin-top: 20px;
}

.main-bar-content .content-to-save label
{
    width: 100%;
    text-align: left;
    font-weight: 500;
    font-size: small;
    margin-top: 10px;
}

.main-bar-content .content-to-save input
{
    /* width: calc(100%); */
    background: none;
    padding: 10px;
    margin: 10px 0;
    border: none;
    border-radius: 5px;
    outline: none;
    border: 2px solid #666666;
    color: #ffffff;

}

.input-row {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    justify-content: space-between;
}

.input-group {
    width: 400px;
}

.input-group label {
    display: block;
    padding-left: auto;
    margin-bottom: 5px;
}

.input-group input {
    width: 80%;
    border: none;
    border-radius: 5px;
    justify-content: center;
    outline: none;
}

.save-btn button {
    display: flex;
    margin: auto 0px auto auto;
    background-color: #ffa31a;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
}

.save-btn button:hover {
    background-color: #f49200;
}
</style>