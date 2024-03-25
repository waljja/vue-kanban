import axios from 'axios'

const ip = document.location.hostname;
console.log("ip地址: " + ip);

if (ip === "172.31.2.184") {
  axios.defaults.baseURL = 'http://172.31.2.184:9008';
} else if (ip === "172.22.9.78") {
  axios.defaults.baseURL = 'http://172.22.9.78:9008';
} else if (ip === "192.168.50.119" || ip === "127.0.0.1" || ip === "localhost") {
  axios.defaults.baseURL = 'http://172.31.2.184:9008';
}

axios.defaults.timeout = 12000

export default axios