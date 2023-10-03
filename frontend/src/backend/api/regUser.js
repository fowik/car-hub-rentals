import axios from 'axios';

export default {
    methods: {
        registerUser() {
            const userData = {
                username: axios.post(this.username),
                email: axios.post(this.email),
                password: axios.post(this.password)
            };
            

            
        }
    }
};