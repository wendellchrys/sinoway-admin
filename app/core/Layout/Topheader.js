import { useContext, useEffect, useState } from "react";
import Link from "next/link";

import { Layout, Menu, Dropdown, Button, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { changeCollapsed_r, switchLanguage } from "../../../redux/actions";

import { languageData } from "../../../config";
import { AuthContext } from "../../../contexts/AuthContext";
import { useIntl } from "react-intl";

const { Header } = Layout;

const Sidebar = () => {
   const dispatch = useDispatch();
   const { logout, user } = useContext(AuthContext);
   const [size, setSize] = useState([0, 0]);
   const { locale } = useSelector(({ settings }) => settings);
   const intl = useIntl();

   useEffect(() => {
      if (size[0] > 770) {
         dispatch(changeCollapsed_r(false));
      }

      function updateSize() {
         setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
   }, []);

   useEffect(() => {}, []);

   return (
      <Header className="site-layout-background">
         <Dropdown
            placement="topRight"
            arrow
            className="float-right w-22"
            overlay={
               <Menu>
                  <Menu.Item key="0">
                     <Link href={"/staff/" + user?.id}>Profile</Link>
                  </Menu.Item>

                  <Menu.Divider key="2" />
                  <Menu.Item
                     key="3"
                     onClick={async () => {
                        logout();
                     }}
                  >
                     {intl.messages["layout.sidebar.logout"]}
                  </Menu.Item>
               </Menu>
            }
         >
            <Button type="text">{user?.name}</Button>
         </Dropdown>
         <Select
            showSearch
            className="float-right w-22"
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
      </Header>
   );
};

export default Sidebar;
