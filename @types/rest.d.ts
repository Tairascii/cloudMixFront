import { AxiosResponse } from 'axios'

declare module 'axios' {
  interface RESTResponse<T = any> extends AxiosResponse<T> {
    success: boolean
  }
}
