/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import News from "views/examples/News.js";
import Order from "views/examples/Order";


var routes = [
  {
    path: "/index",
    name: "Trang chủ",
    icon: "ni ni-shop text-red",
    component: Index,
    layout: "/admin",
    render: true
  },
  {
    path: "/icons",
    name: "Quần",
    icon: "ni ni-bold-right text-red",
    component: Icons,
    layout: "/admin",
    render: true
  },
  {
    path: "/maps",
    name: "Áo",
    icon: "ni ni-bold-right text-red ",
    component: Maps,
    layout: "/admin",
    render: true
  },
  {
    path: "/news",
    name: "Tin tức",
    icon: "ni ni-circle-08 text-pink",
    component: News,
    layout: "/admin",
    render: true
  },
  {
    path: "/order",
    name: "Đơn hàng",
    icon: "ni ni-circle-08 text-pink",
    component: Order,
    layout: "/admin",
    render: true
  },
  {
    path: "/tables",
    name: "Giỏ hàng",
    icon: "ni ni-bag-17 text-blue",
    component: Tables,
    layout: "/admin",
    render: true
  },

  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    render: false
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
    render: false
  },
  {
    path: "/user-profile",
    name: "profile",
    icon: "ni ni-circle-08 text-pink",
    component: Profile,
    layout: "/admin",
    render: false
  },
 


];
export default routes;
