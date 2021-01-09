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
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import store from "./store/store";

import UserLayout from "./layouts/Admin.js";
import AdminLayout from "./layouts/AdminInAdmin.js";
import AuthLayout from "./layouts/Auth";
import 'react-notifications-component/dist/theme.css';
import ReactNotification from 'react-notifications-component';
import { Provider } from "react-redux";

ReactDOM.render(
  <>
    <Provider store={store}>
      <ReactNotification />
      <BrowserRouter>
        <Switch>
          {(localStorage.getItem("role") === "user" && localStorage.getItem("token")) ?
            (<Route path="/user" render={props => <UserLayout {...props} />} />)
            : (null)}
          {(localStorage.getItem("role") === "admin" && localStorage.getItem("token")) ?
            (<><Route path="/admin" render={props => <AdminLayout {...props} />} />
              <Redirect from="/admin/item" to="/admin/item/list" />
            </>
            )
            : (null)}
          <> <Route path="/auth" render={props => <AuthLayout {...props} />} />
            <Redirect from="/" to="/auth" />
            {/* <Redirect from="/user/" to="/user/home" /> */}
          </>

        </Switch>
      </BrowserRouter>
    </Provider >
  </>,
  document.getElementById("root")
);
