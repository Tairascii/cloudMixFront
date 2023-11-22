import axios, { AxiosInstance } from 'axios'
import https from 'https'

// TODO разобраться с процесс енв
const axiosConfig: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000',
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
