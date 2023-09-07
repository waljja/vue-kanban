import axios from 'axios'

axios.defaults.baseURL = 'http://172.31.2.184:9008'
axios.defaults.timeout = 6000

export default axios