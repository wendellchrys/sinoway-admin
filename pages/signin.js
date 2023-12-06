import { useContext, useEffect } from "react";
import { Button, Form, Input, Row, Col, Typography, Select } from "antd";
import { useIntl } from "react-intl";
import IntlMessages from "../util/IntlMessages";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import { switchLanguage } from "../redux/actions";
import { languageData } from "../config";

import { AuthContext } from "../contexts/AuthContext";
import { parseCookies } from "nookies";

export default function SignInPage() {
   const intl = useIntl();
   const dispatch = useDispatch();
   const { signIn } = useContext(AuthContext);
   const { locale } = useSelector(({ settings }) => settings);
   const onSubmit = async (payload) => {
      await signIn(payload, intl);
   };

   return (
      <>
         <Row gutter={[16, 16]}>
            <Col sm={6} offset={3} xs={18} className="my-5">
               <Typography.Title className="text-center mt-5">
            Jdinxin Admin
               </Typography.Title>
               <div className="text-center fs-10 mb-5">Fortune favors the bold.</div>
               <Form
                  initialValues={{ remember: true }}
                  onFinish={onSubmit}
                  layout="vertical"
               >
                  <Form.Item
                     rules={[
                        {
                           required: true,
                           message: (
                              <IntlMessages id="app.userAuth.The input is not valid E-mail!" />
                           ),
                        },
                     ]}
                     name="username"
                     label={<IntlMessages id="app.userAuth.E-mail" />}
                  >
                     <Input size="large" />
                  </Form.Item>
                  <Form.Item
                     rules={[
                        {
                           required: true,
                           message: (
                              <IntlMessages id="app.userAuth.Please input your Password!" />
                           ),
                        },
                     ]}
                     name="password"
                     label={<IntlMessages id="app.userAuth.Password" />}
                  >
                     <Input.Password size="large" />
                  </Form.Item>

                  <Form.Item>
                     <Button
                        type="primary"
                        className="mb-0 w-full"
                        size="large"
                        htmlType="submit"
                     >
                        <IntlMessages id="app.userAuth.signIn" />
                     </Button>
                  </Form.Item>
               </Form>
               <Button
                  type="link"
                  className="float-left"
                  onClick={() => Router.push("/forgotpassword")}
               >
                  <IntlMessages id="app.userAuth.Forgot Password" />
               </Button>
               <Select
                  showSearch
                  className="float-right w-30"
                  defaultValue={JSON.stringify(locale)}
                  bordered={false}
                  filterOption={(input, option) =>
                     option.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={(newValue) => {
                     dispatch(switchLanguage(JSON.parse(newValue)));
                  }}
               >
                  {languageData.map((language) => (
                     <Select.Option
                        key={JSON.stringify(language)}
                        value={JSON.stringify(language)}
                     >
                        {String(language.name)}
                     </Select.Option>
                  ))}
               </Select>
            </Col>
            <Col sm={3} xs={0} />
            <Col sm={12} xs={24}>
               <div className="loginBanner"></div>
            </Col>
         </Row>
      </>
   );
}

export const getServerSideProps = (ctx) => {
   const { ["access_token"]: token } = parseCookies(ctx);

   if (token) {
      return {
         redirect: {
            destination: "/",
            permanent: false,
         },
      };
   }

   return { props: {} };
};
