import { Button, Form, Input, message, Row, Col, Typography } from "antd";
import IntlMessages from "../util/IntlMessages";
import Router from "next/router";
import { useIntl } from "react-intl";
import { api } from "../util/api";

const SignInPage = () => {
   const intl = useIntl();

   const onSubmit = (Data) => {
      api
         .post("/users/forgotPassword", Data)
         .then((res) => {
            if (res.data == "email not in db") {
               message.error(intl.messages["app.userAuth.userNotFound"]);
            } else {
               message.success(res.data);
            }
         })
         .catch((err) => {
            console.log("err", err);
            message.error(err);
         });
   };

   return (
      <>
         <Row gutter={[16, 16]}>
            <Col sm={6} offset={3} xs={18}>
               <Typography.Title className="text-center mt-5">
            Sinoway Admin
               </Typography.Title>
               <div className="text-center fs-10 mb-5">Painel Administrativo</div>

               <Form
                  initialValues={{ remember: true }}
                  onFinish={onSubmit}
                  layout="vertical"
               >
                  <Form.Item
                     rules={[
                        {
                           required: true,
                           message: intl.messages["app.pages.common.inputNotValid"],
                        },
                     ]}
                     name="username"
                     label={intl.messages["app.pages.common.email"]}
                  >
                     <Input size="large" />
                  </Form.Item>

                  <Form.Item>
                     <Button
                        type="primary"
                        className="mb-0 w-full"
                        size="large"
                        htmlType="submit"
                     >
                        <IntlMessages id="app.pages.common.sendEmail" />
                     </Button>
                  </Form.Item>
               </Form>
               <Button type="link" onClick={() => Router.push("/signin")}>
                  <IntlMessages id="app.userAuth.signIn" />
               </Button>
            </Col>
            <Col sm={3} xs={0} />

            <Col sm={12} xs={24}>
               <div className="loginBanner"></div>
            </Col>
         </Row>
      </>
   );
};

export default SignInPage;
