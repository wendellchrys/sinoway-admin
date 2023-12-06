import { useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { message, Table, Popconfirm, Tooltip, Button } from "antd";
import {
   EditOutlined,
   DeleteOutlined,
   AppstoreAddOutlined,
   CheckCircleOutlined,
   CloseSquareOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { API_URL } from "../../config";
import func from "../../util/helpers/func";
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
         title: intl.messages["app.pages.common.order"],
         dataIndex: "order",
         key: "order",
         render: (text) => <span className="link">{text}</span>,
      },
      {
         title: intl.messages["app.pages.common.title"],
         dataIndex: "title",
         key: "title",
         render: (text) => <span className="link">{text}</span>,
      },
      {
         title: intl.messages["app.pages.common.description"],
         dataIndex: "description",
         key: "description",
      },
      {
         title: intl.messages["app.pages.common.image"],
         dataIndex: "image",
         key: "image",
         render: (text, record) => (
            <>
               {record.image ? (
                  <img src={API_URL + "/" + record.image} height={80} width={100} />
               ) : (
                  ""
               )}
            </>
         ),
      },
      {
         title: intl.messages["app.pages.common.action"],
         key: "_id",
         width: 360,
         render: (text, record) => (
            <span className="link ant-dropdown-link">
               {role["homeslider/id"] ? (
                  <Link href={"/homeslider/" + record._id}>
                     <a>
                        {" "}
                        <EditOutlined
                           style={{ fontSize: "150%", marginLeft: "15px" }}
                        />
                     </a>
                  </Link>
               ) : (
                  ""
               )}
               {role["homesliderdelete"] ? (
                  <>
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

                     {record.children ? (
                        ""
                     ) : (
                        <Popconfirm
                           placement="left"
                           title={intl.messages["app.pages.common.sureToDelete"]}
                           onConfirm={() => deleteData(record._id, record.image)}
                        >
                           <a>
                              <DeleteOutlined
                                 style={{ fontSize: "150%", marginLeft: "15px" }}
                              />{" "}
                           </a>
                        </Popconfirm>
                     )}
                  </>
               ) : (
                  ""
               )}
            </span>
         ),
      },
   ];

   const activeOrDeactive = (id, deg) => {
      api.post(`/homeslider/active/${id}`, { isActive: !deg }).then(() => {
         message.success(intl.messages["app.pages.common.chageActive"]);
         getDataFc();
         Router.push("/homeslider/list");
      });
   };

   const getDataFc = () => {
      api
         .get("/homeslider")
         .then((response) => {
            if (response.data.length > 0) {
               const maniplationData = func.getCategoriesTree(response.data);
               seTdata(maniplationData);
            }
         })
         .catch((err) => console.log(err));
   };

   useEffect(() => {
      getDataFc();
   }, []);

   const deleteData = (id) => {
      api.delete(`/homeslider/${id}`).then(() => {
         message.success(intl.messages["app.pages.common.deleteData"]);
         getDataFc();
         Router.push("/homeslider/list");
      });
   };

   return (
      <div>
         {role["homeslider/add"] ? (
            <Link href="/homeslider/add">
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
         <h5>
            <IntlMessages id="app.pages.homeSlider.list" />{" "}
         </h5>
         <Table
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
      const res = await api.get("/homeslider", {
         headers: req ? { cookie: req.headers.cookie } : undefined,
      });

      const dataManipulate = func.getCategoriesTree(res.data);

      return { getData: dataManipulate };
   }
};

export default Default;
