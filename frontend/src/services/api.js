import axios from 'axios'
import { applyInterceptors } from './interceptors.js'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/v1',
  withCredentials: true,
})

applyInterceptors(api)

export default api
