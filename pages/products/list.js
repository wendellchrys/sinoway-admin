import { useEffect, useState } from "react";
import Router from "next/router";
import { useSelector } from "react-redux";
import { useIntl } from "react-intl";
import { api } from "../../util/api";
import Link from "next/link";
import { message, Table, Popconfirm, Button } from "antd";
import {
   EditOutlined,
   DeleteOutlined,
   AppstoreAddOutlined,
   UploadOutlined,
} from "@ant-design/icons";
import Price from "../../app/components/Price";
import IntlMessages from "../../util/IntlMessages";

const Default = ({ getData = [] }) => {
   const intl = useIntl();
   const [data, seTdata] = useState(getData);
   const { user } = useSelector(({ login }) => login);
   const { role } = user;

   const getVariantPrice = (data) => {
      if (data.length > 0) {
         const newData = data.sort((a, b) => {
            return a.price - b.price;
         });
         return (
            <span>
               {" "}
               <Price data={newData[0].price} /> -{" "}
               <Price data={newData[data.length - 1].price} />{" "}
            </span>
         );
      }
   };

   const columns = [
      {
         title: intl.messages["app.pages.common.title"],
         dataIndex: "title",
         key: "title",
         render: (text) => <span className="link">{text}</span>,
      },
      {
         title: intl.messages["app.pages.common.OEM"],
         dataIndex: "OEM",
         key: "OEM",
         render: (text) => <span className="link">{text}</span>,
      },
      {
         title: intl.messages["app.pages.common.tag"],
         dataIndex: "tag",
         key: "tag",
         render: (text) => <span className="link">{text}</span>,
      },

      {
         title: intl.messages["app.pages.common.price"],
         dataIndex: "price",
         key: "price",
         render: (text, record) => {
            return record.type ? (
               getVariantPrice(record.variant_products)
            ) : (
               <Price data={record.price} />
            );
         },
      },
      {
         title: intl.messages["app.pages.common.image"],
         dataIndex: "images",
         key: "images",
         render: (text, record) => (
            <>
               {role["productimagesview"] ? (
                  <Link
                     href={"/productimages/list?id=" + record._id}
                     className="link ant-dropdown-link"
                  >
                     <a>
                        <IntlMessages id="app.pages.common.image" />
                        <UploadOutlined
                           style={{ fontSize: "150%", marginLeft: "15px" }}
                        />
                     </a>
                  </Link>
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
               {role["productsdelete"] ? (
                  <Popconfirm
                     placement="left"
                     title={intl.messages["app.pages.common.sureToDelete"]}
                     onConfirm={() => deleteData(record._id)}
                  >
                     <a>
                        <DeleteOutlined
                           style={{ fontSize: "150%", marginLeft: "15px" }}
                        />{" "}
                     </a>
                  </Popconfirm>
               ) : (
                  ""
               )}
               {role["products/id"] ? (
                  <Link href={"/products/" + record._id}>
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
            </span>
         ),
      },
   ];

   const getDataFc = () => {
      api
         .get("/products")
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

   const deleteData = (id) => {
      api.delete(`/products/${id}`).then(() => {
         message.success(intl.messages["app.pages.common.deleteData"]);
         seTdata(data.filter((item) => item._id !== id));
         getDataFc();
         Router.push("/products/list");
      });
   };

   return (
      <div>
         {role["products/add"] ? (
            <Link href="/products/add">
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
            title={() => intl.messages["app.pages.product.list"]}
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
      const res = await api.get("/products", {
         headers: req ? { cookie: req.headers.cookie } : undefined,
      });

      return { getData: res.data };
   }
};

export default Default;
