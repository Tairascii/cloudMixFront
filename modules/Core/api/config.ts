import axios, { AxiosInstance } from 'axios'
import https from 'https'

const axiosConfig: AxiosInstance = axios.create({
  baseURL: 'http://34.159.28.117:8001',
  headers: {
    'Content-Type': 'application/json',
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
})

export const setContentLanguageHeader = (locale?: string): void => {
  if (locale) {
    axiosConfig.defaults.headers.common['Content-Language'] = locale
  }
}

export default axiosConfig
