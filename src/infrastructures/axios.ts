import axios from "axios"
import {localAuthDataKey} from "../stores/AuthStore";
import {AuthResponse} from "../api_schema";

const MyAxios = axios.create({
   baseURL: 'http://localhost:8000/api/',
})

MyAxios.defaults.headers.common['Content-Type'] = 'application/json'

MyAxios.interceptors.request.use(
   (config) => {
      if (config.url === "/sign-in") {
         return config
      }

      const authData: AuthResponse = JSON.parse(localStorage.getItem(localAuthDataKey)!)
      config.headers.Authorization = "Bearer " + authData.AccessToken

      return config
   }
)

MyAxios.interceptors.response.use(
   (response) => response,
   (error) => {
      if (error.response.config.url === "/sign-in") {
         return Promise.reject(error)
      }

      if (error.response.status === 401 || error.response.status === 403) {
         window.location.href = '/sign-in';
      }

      return Promise.reject(error)
   }
)

export default MyAxios