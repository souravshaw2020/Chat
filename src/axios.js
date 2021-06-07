import axios from 'axios';

const instance=axios.create({
    //baseURL: 'http://localhost:9000',
    baseURL: 'https://webchat-backend007.herokuapp.com/',
});

export default instance