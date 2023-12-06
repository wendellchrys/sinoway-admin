import { createContext, useEffect, useState } from "react";
import { api } from "../util/api";
import Router from "next/router";
import { message } from "antd";
import { setCookie, parseCookies, destroyCookie } from "nookies";
export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { access_token: token } = parseCookies();

    if (token) {
      try {
        api.get("/users/authenticated").then((response) => {
          const { data } = response;
          setUser(data?.user);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const signIn = async (payload, intl) => {
    try {
      const { data } = await api.post("/users/login", payload);
      const { token, user } = data;

      setCookie(undefined, "access_token", token, { maxAge: 60 * 60 * 24 });
      setUser(user);
      message.success(intl.messages["app.userAuth.Login Successfully."]);
      window.location.href = "/";
    } catch (error) {
      message.error(intl.messages["app.userAuth.You did not login."]);
    }
  };

  const logout = async () => {
    destroyCookie(undefined, "access_token");
    Router.push("/signin");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
