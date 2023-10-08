class LoginService {
    constructor() {
        this.username = '';
        this.password = '';
    }

    async loginUser() {
        const userData = {
            username: this.username,
            email: this.username,
            password: this.password,
        };
        try {
            const response = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const user = await response.json();
                this.handleSuccessfulLogin(user);
            } else {
                this.handleFailedLogin();
            }
        } catch (error) {
            this.handleLoginError(error);
        }
    }

    handleSuccessfulLogin(user) {
        console.log('Login successful:', user);
        sessionStorage.setItem('user', JSON.stringify(user));
        // Redirect to the profile page using Vue Router
        this.redirectToProfilePage();
    }

    handleFailedLogin() {
        console.error('Login failed');
        // Handle failed login (e.g., show an error message to the user)
    }

    handleLoginError(error) {
        console.error('Error during login:', error);
        // Handle network errors or other issues (e.g., show a generic error message to the user)
    }

    redirectToProfilePage() {
        // Use Vue Router to redirect to the profile page
        this.$router.push({ path: '/profile' });
    }
}

module.exports = LoginService;