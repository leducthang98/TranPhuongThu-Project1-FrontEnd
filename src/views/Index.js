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
  Col,
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
    name: "Áo Thun A",
    type: "1",
    price: 15000,
    description: "Đây là áo thun",
    amount: "20",
    image: null,
  },
  {
    id: 2,
    name: "Áo Thun B",
    type: "1",
    price: 10000,
    description: "Đây là áo thun B",
    amount: "10",
    image: null,
  },
  {
    id: 3,
    name: "Áo Thun C",
    type: "1",
    price: 10000,
    description: "Đây là áo thun C",
    amount: "5",
    image: null,
  },
  {
    id: 4,
    name: "Áo thun D",
    type: "1",
    price: 10000,
    description: "Đây là áo thun D",
    amount: "30",
    image: null,
  },
  {
    id: 5,
    name: "Áo thun D",
    type: "1",
    price: 10000,
    description: "Đây là áo thun D",
    amount: "30",
    image: null,
  },
  {
    id: 6,
    name: "Áo thun D",
    type: "1",
    price: 10000,
    description: "Đây là áo thun D",
    amount: "30",
    image: null,
  },
  {
    id: 7,
    name: "Áo thun D",
    type: "1",
    price: 10000,
    description: "Đây là áo thun D",
    amount: "30",
    image: null,
  },
  {
    id: 8,
    name: "Áo thun D",
    type: "1",
    price: 10000,
    description: "Đây là áo thun D",
    amount: "30",
    image: null,
  },
  {
    id: 9,
    name: "Áo thun D",
    type: "1",
    price: 10000,
    description: "Đây là áo thun D",
    amount: "30",
    image: null,
  },
  {
    id: 10,
    name: "Áo thun D",
    type: "1",
    price: 10000,
    description: "Đây là áo thun D",
    amount: "30",
    image: null,
  },
  {
    id: 11,
    name: "Áo thun D",
    type: "1",
    price: 10000,
    description: "Đây là áo thun D",
    amount: "30",
    image: null,
  },
  {
    id: 12,
    name: "Áo thun D",
    type: "1",
    price: 10000,
    description: "Đây là áo thun D",
    amount: "30",
    image: null,
  },
  {
    id: 13,
    name: "Áo thun D",
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
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">Icons</h3>
                </CardHeader>
                <CardBody>
                  <Row className=" icon-examples">
                    <div className="gridContainer">
                      {listData.map((item) => {
                        return <div className="item">{item.description}</div>;
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
