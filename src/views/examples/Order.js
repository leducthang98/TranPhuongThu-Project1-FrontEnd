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
import { baseUrl, getAllItem } from "../../domain";
import MakeRequest from "views/MakeRequest";
import FormGroup from "reactstrap/lib/FormGroup";
import Input from "reactstrap/lib/Input";
import * as actions from '../../store/actions/actions'
import { connect } from "react-redux";

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      isMouseOver: [],
      displayModal: false,
      activeNav: 1,
      alertVisible: false,
      dataSearch: ''

    }
  }
  componentDidMount() {

    this.getData()
  }

  getData = async () => {

    const data = await MakeRequest("GET", baseUrl + "order/me")
    const res = data.data
    //console.log("8666   ", res);

    if (res.code === 0 && res.message === "ok") {
      await this.setState({
        ...this.state,
        listData: res.data
      })
    }
  }
  subtable = (items) => {
    let count = 0
    let show = items.map((item, idx) => {
      count += parseInt(item.count) * parseInt(item.price)
      return (
        <tr key={idx}>
          <td scope="row">
            {item.name}
          </td>
          <td>
            <img style={{ width: '75px', height: '75px' }} src={item.image} />
          </td>
          <td>{item.price} đ</td>
          <td>{item.count}  </td>
          <td>
            {parseInt(item.count) * parseInt(item.price)}
          </td>

        </tr>
      )
    })
    return show
  }


  content = () => {
    let show = this.state.listData.map((value, idx) => {
      const items = value.items
      console.log(value);
      return (
        <div>
          <Card className="shadow">
            <CardHeader className="border-0">
              <p className="mb-0"></p>
            </CardHeader>
            <div style={{ width: '100%', height: '30px' , display:'flex'}}></div>
            <p style={{ textAlign: 'center', color: '#000' }}>Đơn hàng {idx + 1}</p>
            <p style={{ textAlign: 'center', color: '#000' }} > {"     "+value.created_time}</p>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th >Tên sản phẩm</th>
                  <th >Ảnh</th>
                  <th >Giá tiền</th>
                  <th >Số lượng</th>
                  <th >Thành tiền</th>
                  {/* <th >Completion</th> */}

                </tr>
              </thead>
              <tbody>
                {this.subtable(value.items)}
              </tbody>
            </Table>
            <div style={{
              display: 'flex', paddingLeft: '50px', width: '500p',
              border: '1px solid #f7fafc', paddingTop: '15px'
            }}>
              <div style={{ width: "300px" }}>
                <p style={{ fontWeight: 500, color: '#000' }}>Tổng hóa đơn  </p >
              </div>
              <div>
                <p style={{ fontWeight: 500, color: '#000' }}>{value.totalMoney} đ</p>
              </div>
            </div>
            <div style={{ width: '100%', height: '30px' }}></div>
          </Card>

        </div >

      )
    })
    return show;
  }
  render() {

    var isMouseOver = this.state.isMouseOver
    isMouseOver.length = this.state.listData.length

    return (
      <>
        <Header />
        {/* Page content */}
        <Container className=" mt--7" fluid>
          {/* Table */}
          <Row>
            <div className=" col">


              {this.content()}
            </div>
          </Row>
        </Container>
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    cartAdd: (value) => dispatch(actions.addToCart(value)),
  };
};
const mapStateToProps = (store) => {
  return {
    cart: store.cart.cart
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Order);
