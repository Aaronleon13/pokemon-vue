import axios from 'axios'
import router from '../router'

const api = axios.create({
  baseURL: 'https://api-curso-production.up.railway.app',
  withCredentials: true,
})

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config

    const authEndPoints = ['auth/login', 'auth/register']

    const isAuthEndPoint = authEndPoints.some((endPoint) => originalRequest.url.includes(endPoint))

    if (isAuthEndPoint) {
      return Promise.reject(err)
    }

    if (err.response.status === 401 && originalRequest._retry) {
      localStorage.removeItem('token')
      router.push('/login')
      return Promise.reject(err)
    }

    if (err.response.status === 401) {
      originalRequest._retry = true

      try {
        await api.post('auth/refresh-token')
        return api(originalRequest)
      } catch (error) {
        localStorage.removeItem('token')
        router.push('/login')
        return Promise.reject(error)
      }
    }

    return Promise.reject(err)
  },
)

export default api
