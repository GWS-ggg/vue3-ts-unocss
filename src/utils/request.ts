import axios from 'axios'
// create an axios instance
const service = axios.create({
  baseURL: '/', // url = base url + request url
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 10000, // request timeout
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  },
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data
    // if the custom code is not 200, it is judged as an error.
    if (res.ret !== 0) {
      return Promise.reject(new Error(res.msg || 'unknown error'))
    }
    else {
      return res.data
    }
  },
  (error) => {
    return Promise.reject(error)
  },
)
export default service
