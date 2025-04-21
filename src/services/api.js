import axios from  'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000',
    
});
export default api;
//essa função vai ser usada para setar o token de autenticação no header da requisição para o back-end saber quem é o usuário que está logado
//se o token for nulo, ele deleta o header de autenticação
export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
}