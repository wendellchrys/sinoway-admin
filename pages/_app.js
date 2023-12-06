import React from "react";
import Head from "next/head";
import withRedux from "next-redux-wrapper";

import "antd/dist/antd.css";
import "../public/loader.css";
import "../public/global.scss";

import initStore from "../redux/store";
import { Provider } from "react-redux";
import LocaleProvider from "../app/core/LocaleProvider";
import AppLayout from "../app/core/Layout";
import { AuthProvider } from "../contexts/AuthContext";

const Page = ({ Component, pageProps, store }) => {
   return (
      <React.Fragment>
         <Head>
            <title> Admin Dashboard</title>
         </Head>
         <AuthProvider>
            <Provider store={store}>
               <LocaleProvider>
                  <AppLayout>
                     <Component {...pageProps} />
                  </AppLayout>
               </LocaleProvider>
            </Provider>
         </AuthProvider>
      </React.Fragment>
   );
};

export default withRedux(initStore)(Page);
