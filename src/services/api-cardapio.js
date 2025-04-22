import axios from 'axios';

const apiDishes = axios.create({
    baseURL: 'https://sistema-cardapio-production.up.railway.app/' // Replace with your API base URL
});

export default apiDishes;