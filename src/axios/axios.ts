import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.timeout = 6000

export default axios