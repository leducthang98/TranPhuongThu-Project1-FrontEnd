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
import "../index.css";

import Header from "components/Headers/Header.js";
import HomeModal from "./ModalHome";
const listData = [
  {
    id: 1,
    name: "Áo thun",
    type: "1",
    price: 15000,
    description: "Đây là áo thun",
    amount: "20",
    image: null,
  },
  {
    id: 2,
    name: "Áo khoác gió",
    type: "1",
    price: 10000,
    description: "Đây là áo thun B",
    amount: "10",
    image: null,
  },
  {
    id: 3,
    name: "Áo nỉ",
    type: "1",
    price: 10000,
    description: "Đây là áo thun C",
    amount: "5",
    image: null,
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

class Icons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      isMouseOver: [],
      displayModal: false,
      activeNav: 1,
      alertVisible: false
    }
  } handleMouseOver = async (isMouseOver, idx) => {
    for (let index = 0; index < listData.length; index++) {
      isMouseOver[index] = false
      if (index === idx) {
        isMouseOver[index] = true
      }
    }
    await this.setState({
      ...this.state,
      isMouseOver: isMouseOver
    })
    console.log(this.state.isMouseOver);
  }
  render() {
    var isMouseOver = this.state.isMouseOver
    isMouseOver.length = listData.length

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
                        listData.map((item, idx) => {
                          return <div
                            style={{ width: 200, marginLeft: 10, marginBottom: 15 }}
                            onMouseEnter={() => this.handleMouseOver(isMouseOver, idx)}
                            className="item">
                            <div>
                              <img
                                alt="..."
                                className=" img-fluid rounded shadow"
                                src={item?.image || 'https://i-shop.vnecdn.net/resize/560/560/images/2018/11/16/5bee16b6d7f5b-img_5068.jpg'}
                                style={{ width: 200 }}
                              ></img>
                              {
                                (this.state.isMouseOver[idx]) ? (< HomeModal data={item} />
                                ) : ('')
                              }
                            </div>
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

export default Icons;
