import axios from 'axios'

const apiBiblio = axios.create({
    baseURL: 'http://localhost:8080'
})
export default apiBiblio

apiBiblio.interceptors.request.use((request) => {
    request.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')
    console.log('ApiBiblio.js : token add to headers');
    return request
})
