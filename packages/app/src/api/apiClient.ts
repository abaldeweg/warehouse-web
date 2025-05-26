import axios from 'axios'
import Cookies from 'js-cookie'

/**
 * Create an Axios instance with default configuration.
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('token') || ''}`,
  },
})
