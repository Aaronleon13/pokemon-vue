import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://api-curso-production.up.railway.app',
  withCredentials: true,
})

export default axiosInstance
