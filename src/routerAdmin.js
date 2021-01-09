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
import Index from "./views/Index.js";
import Profile from "./views/examples/Profile.js";
import Maps from "./views/examples/Maps.js";
import Register from "./views/examples/Register.js";
import Login from "./views/examples/Login.js";
import Tables from "./views/examples/Tables.js";
import Icons from "./views/examples/Icons.js";
import News from "./views/examples/News.js";
import Order from "./views/examples/Order";
import AdminUser from "./views/Admin";
import AddProduct from "./views/Admin/AddProduct";
import ListProduct from "./views/Admin/ListProduct";
import ListAccount from "views/Admin/ListAccount.js";
import ListNews from "views/Admin/ListNews.js";
import ListOrder from "views/Admin/ListOrder.js";
import AddNews from "views/Admin/AddNews.js";


var routerAdmin = [

    // {
    //     path: "/home",
    //     name: "Trang chủ",
    //     icon: "ni ni-shop text-red",
    //     component: AdminUser,
    //     layout: "/admin",
    //     render: true
    // },
    {
        path: "/item/list",
        name: "Quản lý sản phẩm",
        icon: "ni ni-shop text-red",
        component: ListProduct,
        layout: "/admin",
        menu: true,
        right: "ni ni-bold-right text-blue",
        down: "ni ni-bold-down text-blue",
        submenu: [
            {
                name: "Thêm sản phẩm",
                component: AddProduct,
                path: "/item/add",
                icon: "ni ni-shop text-red",
            },
            {
                name: "Danh sách sản phẩm",
                component: ListProduct,
                path: "/item/list",
                icon: "ni ni-shop text-red",

            },

        ],
        render: true
    },

    {
        path: "/account",
        name: "Danh sách tài khoản",
        icon: "ni ni-shop text-red",
        component: ListAccount,
        layout: "/admin",
        render: true
    },
    {
        path: "/news/list",
        name: "Quản lý tin tức",
        icon: "ni ni-shop text-red",
        component: ListNews,
        layout: "/admin",
        menu: true,
        right: "ni ni-bold-right text-blue",
        down: "ni ni-bold-down text-blue",
        submenu: [
            {
                name: "Thêm tin mới",
                component: AddNews,
                path: "/news/add",
                icon: "ni ni-shop text-red",
            },
            {
                name: "Danh sách tin tức",
                component: ListNews,
                path: "/news/list",
                icon: "ni ni-shop text-red",

            },

        ],
        render: true
    },
    {
        path: "/order/list",
        name: "Quản lý đơn hàng",
        icon: "ni ni-shop text-red",
        component: ListProduct,
        layout: "/admin",
        menu: true,
        right: "ni ni-bold-right text-blue",
        down: "ni ni-bold-down text-blue",
        submenu: [
            // {
            //     name: "Xử lý đơn hàng",
            //     component: AddProduct,
            //     path: "/order/handle",
            //     icon: "ni ni-shop text-red",
            // },
            {
                name: "Danh sách đơn hàng",
                component: ListOrder,
                path: "/order/list",
                icon: "ni ni-shop text-red",

            },

        ],
        render: true
    },
    {
        path: "/user-profile",
        name: "profile",
        icon: "ni ni-circle-08 text-pink",
        component: Profile,
        layout: "/user-profile",
        render: false
    },
];
export default routerAdmin;
