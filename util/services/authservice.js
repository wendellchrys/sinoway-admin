import { api } from "../api";
export default {
   login: (user) => {
      return api
         .post("/users/login", user)
         .then((res) => {
            return res.data;
         })
         .catch(() => {
            return {
               isAuthenticated: false,
               user: { username: "", role: "", id: "", name: "", image: "" },
            };
         });
   },

   register: (user) => {
      return api
         .post("/users/register", user)
         .then((res) => {
            return res.data;
         })
         .catch((err) => {
            return {
               error: err,
            };
         });
   },
   logout: () => {
      return api
         .get("/users/logout")
         .then((res) => {
            return res.data;
         })
         .catch((err) => {
            return {
               error: err,
            };
         });
   },
   isAuthenticated: () => {
      return api
         .get("/users/authenticated")
         .then((res) => {
            return res?.data;
         })
         .catch(() => {
            return {
               isAuthenticated: false,
               user: { username: "", role: "", id: "", name: "", image: "" },
            };
         });
   },
};
