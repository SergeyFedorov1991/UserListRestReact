import axios from 'axios'

const USERS_REST_API_URL = 'http://35.195.34.157:8080/students/';

class UserService {

    getUsers(){
        return axios.get(USERS_REST_API_URL)
    }
}

export default new UserService();