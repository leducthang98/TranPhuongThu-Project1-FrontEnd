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
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import { store } from 'react-notifications-component';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Alert,
  Col,
  UncontrolledAlert
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";
import "./index.css";

import Header from "components/Headers/Header.js";
const listData = [
  {
    id: 1,
    name: "Áo thun",
    type: "1",
    price: 15000,
    description: "Đây là áo thun",
    amount: "20",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaJHHovVO36rCgZDgAad5hchXWr1ZSil8bfw&usqp=CAU',
  },
  {
    id: 2,
    name: "Áo khoác gió",
    type: "1",
    price: 10000,
    description: "Đây là áo thun B",
    amount: "10",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaJHHovVO36rCgZDgAad5hchXWr1ZSil8bfw&usqp=CAU',
  },
  {
    id: 3,
    name: "Áo nỉ",
    type: "1",
    price: 10000,
    description: "Đây là áo thun C",
    amount: "5",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaJHHovVO36rCgZDgAad5hchXWr1ZSil8bfw&usqp=CAU',
  },
  {
    id: 4,
    name: "Quần âu",
    type: "1",
    price: 10000,
    description: "Đây là áo thun D",
    amount: "30",
    image: null,
  },
  {
    id: 5,
    name: "Áo hoodie Mỹ",
    type: "1",
    price: 10000,
    description: "Đây là áo thun D",
    amount: "30",
    image: null,
  },
  {
    id: 6,
    name: "Áo LV",
    type: "1",
    price: 10000,
    description: "Đây là áo thun D",
    amount: "30",
    image: null,
  },
  {
    id: 7,
    name: "Quần bò da",
    type: "1",
    price: 10000,
    description: "Đây là áo thun D",
    amount: "30",
    image: null,
  },
  {
    id: 8,
    name: "Quần jogger hàng hiệu",
    type: "1",
    price: 10000,
    description: "Đây là áo thun D",
    amount: "30",
    image: null,
  },
  {
    id: 9,
    name: "Áo thu đông",
    type: "1",
    price: 10000,
    description: "Đây là áo thun D",
    amount: "30",
    image: null,
  },
  {
    id: 10,
    name: "Quần đồng phục học sinh",
    type: "1",
    price: 10000,
    description: "Đây là áo thun D",
    amount: "30",
    image: null,
  },
  {
    id: 11,
    name: "Quần short",
    type: "1",
    price: 10000,
    description: "Đây là áo thun D",
    amount: "30",
    image: null,
  },
  {
    id: 12,
    name: "Áo ba lỗ",
    type: "1",
    price: 10000,
    description: "Đây là áo thun D",
    amount: "30",
    image: null,
  },
  {
    id: 13,
    name: "Quần sịp",
    type: "1",
    price: 10000,
    description: "Đây là áo thun D",
    amount: "30",
    image: null,
  },
];

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: "data1",
      alertVisible: false
    };
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1",
    });
  };
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className=" mt--7" fluid>
          {/* Table */}
          <Row>
            <div className=" col">
              <Card className=" shadow">
                <CardBody>
                  <Row className=" icon-examples">
                    <div

                      className="gridContainer">
                      {
                        listData.map((item) => {
                          return <div
                            style={{ width: 200, marginLeft: 10, marginBottom: 15 }}
                            className="item">
                            <img
                              alt="..."
                              className=" img-fluid rounded shadow"
                              src={item?.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaJHHovVO36rCgZDgAad5hchXWr1ZSil8bfw&usqp=CAU'}
                              style={{ width: 200 }}
                            ></img>

                            <div
                              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
                            >
                              <Button
                                onClick={() => {
                                  console.log('ok')
                                  store.addNotification({
                                    title: "Thông báo",
                                    message: "Đã thêm: " + item.name,
                                    type: "success",
                                    insert: "top",
                                    container: "bottom-left",
                                    animationOut: ["animate__animated animate__fadeOut"],
                                    dismiss: {
                                      duration: 2000,

                                    }
                                  });
                                }}
                                style={{ marginTop: 10, marginLeft: 10, width: '90%', marginBottom: 5 }} outline color="primary">Thêm vào giỏ hàng</Button>
                              <h3 style={{ color: 'red', fontWeight: 'bold' }}>({item.price} VND)</h3>
                              <p style={{ marginTop: -5, fontWeight: 'normal' }}>{item.name}</p>

                            </div>

                          </div>;
                        })}
                    </div>
                  </Row>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Index;
