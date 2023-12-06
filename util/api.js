import { API_URL } from "../config";
import axios from "axios";
import { parseCookies } from "nookies";

export const getApiClient = (ctx) => {
   const api = axios.create({
      baseURL: API_URL,
      headers: { "Content-Type": "application/json" },
   });

   api.interceptors.request.use(
      async (config) => {
         const { access_token: token } = parseCookies(ctx);

         if (token) {
            config.headers.Authorization = `Bearer ${token}`;
         }

         return config;
      },
      function (error) {
         return Promise.reject(error);
      }
   );

   return api;
};

export const api = getApiClient();
