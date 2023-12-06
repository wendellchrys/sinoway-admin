import axios from "axios";
import { parseCookies } from "nookies";

export const getApiClient = (ctx) => {
   const apiAdmin = axios.create({
      baseURL: "https://jdinxin-admin.compranoseua.com.br",
      headers: { "Content-Type": "application/json" },
   });

   apiAdmin.interceptors.request.use(
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

   return apiAdmin;
};

export const apiAdmin = getApiClient();
