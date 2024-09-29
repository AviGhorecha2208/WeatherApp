import Axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';

import Loader from '../Utils/AppLoader';
import { ToastType } from '../Utils/Const';
import { Utility } from '../Utils/Utility';
import { AppConfig } from './AppConfig';



const axiosInstance = Axios.create({
  baseURL: AppConfig.baseUrl
});


axiosInstance.interceptors.request.use(
  async (config) => {
    console.log(`axios request : ${config?.url} =>`, config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response) => {
    console.log(`<= Response : ${response?.config?.url} : Status - ${response?.status} `, response);
    if (!(response?.status===200)) {
      Utility.showToast(ToastType.error, response?.data?.message);
    }
    return response;
  },
  async (error) => {
    try {
      console.log('axios Error: ', error);
      return Promise.reject(error);
    } catch (err) {
      console.log('Error in axios interceptor response: ', err);
      return Promise.reject(err);
    }
  }
);

export interface APICallParams {
  method?: 'get' | 'post' | 'put' | 'delete';
  payload?: any;
  url: string;
  headers?: AxiosRequestHeaders;
}

const APICall = async <T>({
  method = 'post',
  payload = null,
  url = '',
  headers = {} as AxiosRequestHeaders
 }: APICallParams): Promise<AxiosResponse<T>> => {
  // Loader.isLoading(true)
  const config: AxiosRequestConfig = {
    method: method.toLowerCase(),
    timeout: 1000 * 60 * 2,
    url,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (payload && method.toLowerCase() === 'get') {
    config.params = payload;
  } else if (payload && method.toLowerCase() === 'post') {
    config.data = payload;
  }
  console.log('API details: ', method, payload, url, headers);

  return new Promise((resolve, reject) => {
    axiosInstance(config)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.data?.error) {
            reject({
              statusCode: error.response,
              data: {
                ...error.response.data,
                message: error?.response?.data?.error
              }
              
            });
          }
          reject({ statusCode: error.response.status, data: error.response.data });
        }
        reject({
          statusCode: 500,
          data: { message: error.message ?? error.error ?? 'Something went wrong!' }
        });
      }).finally(()=>{
        Loader.isLoading(false)
      })
  });
};

export default APICall;
