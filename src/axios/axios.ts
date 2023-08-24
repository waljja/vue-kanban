import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.50.119:8082'
axios.defaults.timeout = 6000

export default axios