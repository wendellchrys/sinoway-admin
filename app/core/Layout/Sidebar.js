import { useContext, useEffect } from "react";
import Link from "next/link";

import { Layout, Menu } from "antd";
import {
   MenuUnfoldOutlined,
   MenuFoldOutlined,
   DashboardOutlined,
   CheckSquareOutlined,
   OrderedListOutlined,
   DollarOutlined,
   CodeSandboxOutlined,
   DeleteRowOutlined,
   PartitionOutlined,
   PullRequestOutlined,
   FileDoneOutlined,
   TeamOutlined,
   UsergroupAddOutlined,
   CloseSquareOutlined,
   ControlOutlined,
   ChromeOutlined,
   FileImageOutlined,
} from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { changeCollapsed_r } from "../../../redux/actions";

import IntlMessages from "../../../util/IntlMessages";
import { AuthContext } from "../../../contexts/AuthContext";

const { Sider } = Layout;

const Sidebar = () => {
   const { logout } = useContext(AuthContext);

   const dispatch = useDispatch();

   const { collapsed } = useSelector(({ settings }) => settings);
   const { user } = useSelector(({ login }) => login);

   const { role } = user;

   function updateSize() {
      if (window.innerWidth < 770) {
         dispatch(changeCollapsed_r(true));
      } else {
         dispatch(changeCollapsed_r(false));
      }
   }

   useEffect(() => {
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
   }, []);

   return (
      <Sider
         trigger={null}
         collapsible
         collapsed={collapsed}
         style={{
            maxWidth: "100%!important",
            width: "100%",
            height: "100%",
            borderRight: "1px solid #cccccc54",
         }}
      >
         <div
            className="sidebarOpenBtn"
            onClick={() => dispatch(changeCollapsed_r(!collapsed))}
         >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
         </div>
         <div className="logo">Jdinxin Admin</div>
         <Menu
            theme="dark"
            mode="inline"
            className="bg-black"
            defaultSelectedKeys={["1"]}
         >
            <Menu.Item key="/" icon={<DashboardOutlined />}>
               <Link href="/">
                  <a>
                     <span>
                        <IntlMessages id="layout.sidebar.dashboard" />
                     </span>
                  </a>
               </Link>
            </Menu.Item>

            {role?.ordersview ? (
               <Menu.Item key="orders" icon={<DollarOutlined />}>
                  <Link href="/orders/list">
                     <a>
                        <span>
                           {" "}
                           <IntlMessages id="layout.sidebar.orders" />{" "}
                        </span>
                     </a>
                  </Link>
               </Menu.Item>
            ) : (
               ""
            )}

            {role?.productsview ? (
               <Menu.Item key="products" icon={<CheckSquareOutlined />}>
                  <Link href="/products/list">
                     <a>
                        <span>
                           <IntlMessages id="layout.sidebar.products" />
                        </span>
                     </a>
                  </Link>
               </Menu.Item>
            ) : (
               ""
            )}
            {role?.variantsview ? (
               <Menu.Item key="variants" icon={<DeleteRowOutlined />}>
                  <Link href="/variants/list">
                     <a>
                        <span>
                           {" "}
                           <IntlMessages id="layout.sidebar.variants" />{" "}
                        </span>
                     </a>
                  </Link>
               </Menu.Item>
            ) : (
               ""
            )}
            {role?.categoriesview ? (
               <Menu.Item key="categories" icon={<OrderedListOutlined />}>
                  <Link href="/categories/list">
                     <a>
                        <span>
                           <IntlMessages id="layout.sidebar.categories" />{" "}
                        </span>
                     </a>
                  </Link>
               </Menu.Item>
            ) : (
               ""
            )}
            {role?.brandsview ? (
               <Menu.Item key="brands" icon={<ChromeOutlined />}>
                  <Link href="/brands/list">
                     <a>
                        <span>
                           <IntlMessages id="layout.sidebar.brands" />
                        </span>
                     </a>
                  </Link>
               </Menu.Item>
            ) : (
               ""
            )}

            {role?.cargoesview ? (
               <Menu.Item key="cargoes" icon={<CodeSandboxOutlined />}>
                  <Link href="/cargoes/list">
                     <a>
                        <span>
                           {" "}
                           <IntlMessages id="layout.sidebar.cargoes" />{" "}
                        </span>
                     </a>
                  </Link>
               </Menu.Item>
            ) : (
               ""
            )}

            {role?.orderstatusview ? (
               <Menu.Item key="orderstatus" icon={<PartitionOutlined />}>
                  <Link href="/orderstatus/list">
                     <a>
                        <span>
                           {" "}
                           <IntlMessages id="layout.sidebar.orderStatus" />{" "}
                        </span>
                     </a>
                  </Link>
               </Menu.Item>
            ) : (
               ""
            )}
            {role?.paymentmethodsview ? (
               <Menu.Item key="paymentmethods" icon={<PullRequestOutlined />}>
                  <Link href="/paymentmethods/list">
                     <a>
                        <span>
                           {" "}
                           <IntlMessages id="layout.sidebar.paymentMethods" />{" "}
                        </span>
                     </a>
                  </Link>
               </Menu.Item>
            ) : (
               ""
            )}
            {role?.homesliderview ? (
               <Menu.Item key="homeslider" icon={<FileImageOutlined />}>
                  <Link href="/homeslider/list">
                     <a>
                        <span>
                           {" "}
                           <IntlMessages id="layout.sidebar.homeSlider" />{" "}
                        </span>
                     </a>
                  </Link>
               </Menu.Item>
            ) : (
               ""
            )}
            {role?.topmenuview ? (
               <Menu.Item key="topmenu" icon={<FileDoneOutlined />}>
                  <Link href="/topmenu/list">
                     <a>
                        <span>
                           {" "}
                           <IntlMessages id="layout.sidebar.topMenuContent" />{" "}
                        </span>
                     </a>
                  </Link>
               </Menu.Item>
            ) : (
               ""
            )}
            {role?.customersview ? (
               <Menu.Item key="customers" icon={<UsergroupAddOutlined />}>
                  <Link href="/customers/list">
                     <a>
                        <span>
                           <IntlMessages id="layout.sidebar.customers" />{" "}
                        </span>
                     </a>
                  </Link>
               </Menu.Item>
            ) : (
               ""
            )}
            {role?.staffview ? (
               <Menu.Item key="staff" icon={<TeamOutlined />}>
                  <Link href="/staff/list">
                     <a>
                        <span>
                           {" "}
                           <IntlMessages id="layout.sidebar.manager" />{" "}
                        </span>
                     </a>
                  </Link>
               </Menu.Item>
            ) : (
               ""
            )}
            {role?.superadmin ? (
               <Menu.Item key="settings" icon={<ControlOutlined />}>
                  <Link href="/settings/list">
                     <a>
                        <span>
                           {" "}
                           <IntlMessages id="layout.sidebar.settings" />{" "}
                        </span>
                     </a>
                  </Link>
               </Menu.Item>
            ) : (
               ""
            )}
            <Menu.Item
               key="/signin"
               icon={<CloseSquareOutlined />}
               onClick={() => {
                  logout();
               }}
            >
               <Link href="/signin">
                  <a>
                     <span>
                        {" "}
                        <IntlMessages id="layout.sidebar.logout" />{" "}
                     </span>
                  </a>
               </Link>
            </Menu.Item>
         </Menu>
      </Sider>
   );
};

export default Sidebar;
