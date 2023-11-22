import { AxiosRequestConfig, RESTResponse } from 'axios'
import axiosConfig from './config'

const GET = async (
  url: string,
  config?: AxiosRequestConfig,
): Promise<RESTResponse> => {
  try {
    const response = await axiosConfig({
      ...config,
      data: config?.data,
      url,
      method: 'GET',
    })

    if (response.status >= 200 && response.status < 300) {
      return {
        ...response,
        success: true,
      }
    }

    return {
      ...response,
      success: false,
    }
  } catch (error) {
    return {
      ...error?.response,
      success: false,
    }
  }
}

const POST = async (
  url: string,
  data: {} = {},
  headers: {} = {},
  params: {} = {},
  timeout = 10000,
): Promise<RESTResponse> => {
  try {
    const response = await axiosConfig({
      data,
      url,
      headers,
      params,
      timeout,
      method: 'POST',
    })

    if (response.status >= 200 && response.status < 300) {
      return {
        ...response,
        success: true,
      }
    }

    return {
      ...response,
      success: false,
    }
  } catch (error) {
    return {
      ...error?.response,
      success: false,
    }
  }
}

const PUT = async (
  url: string,
  data: {} = {},
  headers: {} = {},
  params: {} = {},
): Promise<RESTResponse> => {
  try {
    const response = await axiosConfig({
      data,
      url,
      headers,
      params,
      method: 'PUT',
    })

    if (response.status >= 200 && response.status < 300) {
      return {
        ...response,
        success: true,
      }
    }

    return {
      ...response,
      success: false,
    }
  } catch (error) {
    return {
      ...error?.response,
      success: false,
    }
  }
}

const PATCH = async (
  url: string,
  data: {} = {},
  headers: {} = {},
): Promise<RESTResponse> => {
  try {
    const response = await axiosConfig({
      data,
      url,
      headers,
      method: 'PATCH',
    })

    if (response.status >= 200 && response.status < 300) {
      return {
        ...response,
        success: true,
      }
    }

    return {
      ...response,
      success: false,
    }
  } catch (error) {
    return {
      ...error?.response,
      success: false,
    }
  }
}

const DELETE = async (
  url: string,
  params: {} = {},
  headers: {} = {},
): Promise<RESTResponse> => {
  try {
    const response = await axiosConfig({
      params,
      url,
      headers,
      method: 'DELETE',
    })

    if (response.status >= 200 && response.status < 300) {
      return {
        ...response,
        success: true,
      }
    }

    return {
      ...response,
      success: false,
    }
  } catch (error) {
    return {
      ...error?.response,
      success: false,
    }
  }
}

export { GET, POST, PUT, PATCH, DELETE }
