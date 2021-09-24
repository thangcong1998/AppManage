import {STORAGE_KEY} from './../common/storage/constant';
import storage from 'common/storage';
/* eslint-disable eqeqeq */
import axios from 'axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

let baseURL = '';
if (__DEV__) {
  const isLocal = Config.IS_LOCAL.toLowerCase() === 'true';
  baseURL = isLocal ? Config.API_URL_LOCAL : Config.API_URL_DEV;
} else {
  const isProduction = Config.IS_PRODUCTION.toLowerCase() === 'true';
  baseURL = isProduction ? Config.API_URL : Config.API_URL_DEV;
}
// create an axios instance
const service = axios.create({
  baseURL: baseURL, // api base_url
  timeout: 60 * 1000, // request timeout
});
// request interceptor
service.interceptors.request.use(
  async config => {
    // Do something before request is sent
    let access_token;
    let _token: String | null;
    _token = await storage.loadString(STORAGE_KEY.user_access_token);
    if (_token) {
      access_token = _token;
    }

    _token = await storage.loadString(STORAGE_KEY.customer_access_token);
    if (_token) {
      access_token = _token;
    }

    const unique_device_id = await AsyncStorage.getItem('unique_device_id');
    if (access_token) {
      config.headers.Authorization = 'Bearer ' + access_token;
    }
    if (unique_device_id) {
      config.headers.UniqueDeviceId = unique_device_id;
    }
    console.log(
      'request sent',
      JSON.stringify({
        method: config.method,
        url: config.baseURL + '/' + config.url,
        UniqueDeviceId: config.headers.unique_device_id,
        data: config.data,
        params: config.params,
      }),
    );
    return config;
  },
  error => {
    // Do something with request error
    console.log('Request Error', error); // for debug
    Promise.reject(error);
  },
);

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.data.message) {
      Toast.show({
        type: 'success',
        text1: response.data.message,
        topOffset: 40,
        visibilityTime: 3000,
      });
    }
    return response;
  },

  async error => {
    console.log('Response Error: ', error); // for debug

    // console.log('Parse Error: ', JSON.parse(JSON.stringify(error))); // for debug
    // console.log('response error', error.response); // for debug

    if (error.response.status === 408 || error.code == 'ECONNABORTED') {
      Toast.show({
        type: 'error',
        text1: 'Lỗi mạng',
        topOffset: 40,
        visibilityTime: 2000,
      });
    }

    if (error.response.status === 500) {
      Toast.show({
        type: 'error',
        text1: 'Lỗi hệ thống',
        topOffset: 40,
        visibilityTime: 2000,
      });
    } else if (error.response.status === 401) {
      Toast.show({
        type: 'error',
        text1: 'Không có quyền truy cập',
        topOffset: 40,
        visibilityTime: 2000,
      });
    } else if (error.response.status === 404) {
      const mess = error.response.data.message;
      if (mess) {
        Toast.show({
          type: 'error',
          text1: mess,
          topOffset: 40,
          visibilityTime: 2000,
        });
      } else {
        // Toast.show({
        //   type: 'error',
        //   text1: 'Không tìm thấy tài nguyên',
        //   topOffset: 40,
        //   visibilityTime: 2000,
        // });
      }
    } else {
      const mess = error.response.data.message;
      if (mess) {
        Toast.show({
          type: 'error',
          text1: mess,
          topOffset: 40,
          visibilityTime: 2000,
        });
      }
    }

    return Promise.reject(error);
  },
);

export default service;
