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
import Label from "reactstrap/lib/Label";
const UserContext = React.createContext()

class Icons extends React.Component {
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
  static contextType = UserContext
  componentDidMount() {

    this.getData()
  }
  handleSearch = async (e) => {
    const { name, value } = e.target
    this.setState({
      ...this.state,
      [name]: value
    })
    const searchData = {
      searchData: e.target.value,
      type: 1
    }
    const res = await MakeRequest("GET", "http://103.142.26.130:6001/item/search", searchData)
    if (res && res.data && res.data.message === "ok" && res.data.code === 0) {
      this.setState({
        ...this.state,
        listData: res.data.data
      })
    }
  }
  getData = async () => {
    const params = {
      type: 1
    }
    const data = await MakeRequest("GET", getAllItem, params)
    const res = data.data
    //console.log("8666   ", res);

    if (res.code === 0 && res.message === "ok") {
      await this.setState({
        ...this.state,
        listData: res.data
      })
    }
  }
  handleAddToCart = async (item, idx) => {
    console.log(item);
    const dataToStore = {
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      type: item.type,
      amount: item.amount,
      num: 1
    }
    const oldStore = this.props.cart
    let count = 0
    for (let index = 0; index < oldStore.length; index++) {
      console.log("index", index);
      const data = oldStore[index]
      console.log("oldStore[index]  ", oldStore[index]);
      console.log("oldStore.length ", oldStore.length);
      console.log("oldStore ", oldStore);

      console.log(data);
      if (item.id === data.id) {
        console.log(112);
        count++
        if (item.amount > data.amount) {
          oldStore[idx] = {
            id: data.id,
            name: data.name,
            image: data.image,
            price: data.price,
            type: data.type,
            amount: data.amount,
            num: parseInt(data.amount) + 1
          }
        } else {
          console.log(125);
          oldStore[idx] = {
            id: data.id,
            name: data.name,
            image: data.image,
            price: data.price,
            type: data.type,
            amount: data.amount,
            num: parseInt(item.amount)
          }
        }
      }
    }
    if (count === 0) {
      console.log(125);
      oldStore.push(dataToStore)
    }
    await this.props.cartAdd(oldStore)
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
  }
  handleMouseOver = async (isMouseOver, idx) => {
    for (let index = 0; index < this.state.listData.length; index++) {
      isMouseOver[index] = false
      if (index === idx) {
        isMouseOver[index] = true
      }
    }
    await this.setState({
      ...this.state,
      isMouseOver: isMouseOver
    })
    //console.log(this.state.isMouseOver);
  }

  handleSort = async (e) => {
    const { name, value } = e.target
    const sortType = value.charAt(0)
    const Sortcolumn = value.slice(1, value.length)

    const data = {
      sortType: sortType,
      sortColumn: Sortcolumn,
      type:1
    }
    const res = await MakeRequest("GET", baseUrl + "item/all", data)
    if (res && res.data && res.data.message === "ok" && res.data.code === 0) {
      await this.setState({
        ...this.state,
        listData: res.data.data
      })
    }
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
              <Card className=" shadow">
                <div style={{ display: 'flex' }}>
                  <FormGroup style={{ display: 'flex', alignSelf: 'center', paddingRight:'200px' }}>
                    <Input
                      style={{ width: '500px' }}
                      type="search"
                      name="dataSearch"
                      id="exampleSearch"
                      placeholder="Tìm kiếm"
                      onChange={(e) => {
                        this.handleSearch(e)
                      }}
                    />
                    <Button>
                      <i class="fas fa-search"></i></Button>
                  </FormGroup>
                  <FormGroup>
                     <Input type="select" name="select" id="exampleSelect" onChange={(e) => {
                      this.handleSort(e)
                    }}>
                      <option name="price" value="1price">Sắp xếp</option>
                      <option name="price" value="1price">Giá thấp đến cao</option>
                      <option name="price" value="0price">Giá cao đến thấp</option>
                      <option value="1" value="1name">Sắp xếp theo tên A-Z</option>
                      <option value="0" value="0name">Sắp xếp theo tên Z-A</option>

                    </Input>
                  </FormGroup>

                </div>
                <CardBody>
                  <Row className=" icon-examples">
                    <div

                      className="gridContainer">
                      {
                        this.state.listData.map((item, idx) => {
                          return (
                            <div
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
                                  onClick={() => this.handleAddToCart(item, idx)}
                                  style={{ marginTop: 10, marginLeft: 10, width: '90%', marginBottom: 5 }} outline color="primary">Thêm vào giỏ hàng</Button>
                                <h3 style={{ color: 'red', fontWeight: 'bold' }}>({item.price} VND)</h3>
                                <p style={{ marginTop: -5, fontWeight: 'normal' }}>{item.name}</p>

                              </div>

                            </div>)
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
export default connect(mapStateToProps, mapDispatchToProps)(Icons);
