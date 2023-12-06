import { useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { message, Table, Popconfirm, Tooltip, Button } from "antd";
import {
   EditOutlined,
   CheckCircleOutlined,
   CloseSquareOutlined,
   AppstoreAddOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useIntl } from "react-intl";
import IntlMessages from "../../util/IntlMessages";
import { api } from "../../util/api";

const Default = ({ getData = [] }) => {
   const intl = useIntl();
   const [data, seTdata] = useState(getData);
   const { user } = useSelector(({ login }) => login);
   const { role } = user;

   const columns = [
      {
         title: intl.messages["app.pages.common.nameSurname"],
         dataIndex: "name",
         key: "name",
         render: (text, record) => (
            <span className="link">
               {record.name} {record.surname}
            </span>
         ),
      },
      {
         title: intl.messages["app.pages.common.email"],
         dataIndex: "username",
         key: "username",
      },
      {
         title: intl.messages["app.pages.common.action"],
         key: "_id",
         width: 360,
         render: (text, record) => (
            <span className="link ant-dropdown-link">
               {role["customers/id"] ? (
                  <div>
                     <Popconfirm
                        placement="left"
                        title={intl.messages["app.pages.common.youSure"]}
                        onConfirm={() => activeOrDeactive(record._id, record.isActive)}
                     >
                        <Tooltip
                           placement="bottomRight"
                           title={
                              +record.isActive
                                 ? intl.messages["app.pages.common.bePassive"]
                                 : intl.messages["app.pages.common.beActive"]
                           }
                        >
                           <a>
                              {record.isActive ? (
                                 <CheckCircleOutlined
                                    style={{ fontSize: "150%", marginLeft: "15px" }}
                                 />
                              ) : (
                                 <CloseSquareOutlined
                                    style={{ fontSize: "150%", marginLeft: "15px" }}
                                 />
                              )}{" "}
                           </a>
                        </Tooltip>
                     </Popconfirm>
                     <Link href={"/customers/" + record._id}>
                        <a>
                           {" "}
                           <EditOutlined
                              style={{ fontSize: "150%", marginLeft: "15px" }}
                           />
                        </a>
                     </Link>
                  </div>
               ) : (
                  ""
               )}
            </span>
         ),
      },
   ];

   const getDataFc = () => {
      api
         .get("/customers")
         .then((response) => {
            if (response.data.length > 0) {
               seTdata(response.data);
            }
         })
         .catch((err) => console.log(err));
   };

   useEffect(() => {
      getDataFc();
   }, []);

   const activeOrDeactive = (id, deg) => {
      api.post(`/customers/active/${id}`, { isActive: !deg }).then(() => {
         message.success(intl.messages["app.pages.common.changeActive"]);
         getDataFc();
         Router.push("/customers/list");
      });
   };

   return (
      <div>
         {role["customers/add"] ? (
            <Link href="/customers/add">
               <Button
                  type="primary"
                  className="float-right addbtn"
                  icon={<AppstoreAddOutlined />}
               >
                  <IntlMessages id="app.pages.common.create" />
               </Button>
            </Link>
         ) : (
            ""
         )}
         <Table
            title={() => intl.messages["app.pages.customers.list"]}
            columns={columns}
            pagination={{ position: "bottom" }}
            dataSource={data}
            expandable={{ defaultExpandAllRows: true }}
            rowKey="_id"
         />
      </div>
   );
};

Default.getInitialProps = async ({ req }) => {
   if (!req?.headers?.cookie) {
      return {};
   } else {
      const res = await api.get("/customers", {
         headers: req ? { cookie: req.headers.cookie } : undefined,
      });

      return { getData: res.data };
   }
};

export default Default;
