import { useEffect, useState } from "react";
import Link from "next/link";
import { Table } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import router from "next/router";
import { useIntl } from "react-intl";
import { api } from "../../util/api";

const Default = () => {
   const intl = useIntl();
   const [data, seTdata] = useState([]);
   const { user } = useSelector(({ login }) => login);
   const { role } = user;

   const columns = [
      {
         title: intl.messages["app.pages.common.title"],
         dataIndex: "title",
         key: "title",
         width: 150,
      },
      {
         title: intl.messages["app.pages.common.company"],
         dataIndex: "company",
         key: "company",
      },

      {
         title: intl.messages["app.pages.common.action"],
         key: "action",
         render: (text, record) => (
            <span className="link ant-dropdown-link">
               {role["variants/id"] ? (
                  <Link href={"/settings/" + record._id}>
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

   const getData = () => {
      api
         .get("/settings")
         .then((response) => {
            console.log(response.data);
            if (response.data.length > 0) {
               seTdata(response.data);
               router.push("/settings/" + response.data[0]._id);
            }
         })
         .catch((err) => console.log(err));
   };

   useEffect(() => {
      getData();
   }, []);

   return (
      <div>
         {role["superadmin"] ? (
            <Table
               className="table-responsive"
               title={() => "Settings List"}
               columns={columns}
               pagination={{ position: "bottom" }}
               dataSource={data}
            />
         ) : (
            ""
         )}
      </div>
   );
};

export default Default;
