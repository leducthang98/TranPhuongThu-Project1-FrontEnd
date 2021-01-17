import React from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import { store } from 'react-notifications-component';
import * as actions from '../../store/actions/actions'
import imageDefault from '../default.png'

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
import { listData } from "./data";
import HomeModal from "./ModalHome";
import MakeRequest from "views/MakeRequest";
import FormGroup from "reactstrap/lib/FormGroup";
import Input from "reactstrap/lib/Input";
import Label from "reactstrap/lib/Label";
import { seachByText } from "domain";
import { connect } from "react-redux";
import { baseImage, baseUrl, getAllItem } from "../../domain";



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

  componentDidMount() {
    this.getData()
  }
  getData = async () => {
    const params = {
      type: 2
    }
    const data = await MakeRequest("GET", "http://103.142.26.130:6001/item/all", params)
    const res = data.data
    //console.log("8666   ", res);

    if (res.code === 0 && res.message === "ok") {
      await this.setState({
        ...this.state,
        listData: res.data
      })
    }
  }
  handleSearch = async (e) => {
    const { name, value } = e.target
    this.setState({
      ...this.state,
      [name]: value
    })
    const searchData = {
      searchData: e.target.value,
      type: 2
    }
    const res = await MakeRequest("GET", "http://103.142.26.130:6001/item/search", searchData)
    if (res && res.data && res.data.message === "ok" && res.data.code === 0) {
      this.setState({
        ...this.state,
        listData: res.data.data
      })
    }
  }
  handleAddToCart = async (item, idx) => {
    console.log(item);
    let dataToStore = {
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      type: item.type,
      amount: item.amount,
      num: 1
    }
    const oldStore = this.props.cart
    let added = null
    console.log(oldStore);
    if (oldStore.length === 0) {
      oldStore.push(dataToStore)
    } else {
      for (let index = 0; index < oldStore.length; index++) {
        const element = oldStore[index];
        if (element.id === dataToStore.id) {
          const num = parseInt(element.num) + 1
          console.log(num);
          oldStore[index] = {
            id: element.id,
            name: element.name,
            image: element.image,
            price: element.price,
            type: element.type,
            amount: element.amount,
            num: num
          }
          added = true
          console.log('1', added);
          break;
        } else {
          added = false
          console.log('138', added);
          continue;
        }
      }
      if (added === false) {
        console.log('3', added);
        oldStore.push(dataToStore)
      }
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
  handleSort = async (e) => {
    const { name, value } = e.target
    const sortType = value.charAt(0)
    const Sortcolumn = value.slice(1, value.length)

    const data = {
      sortType: sortType,
      sortColumn: Sortcolumn,
      type: 2
    }
    const res = await MakeRequest("GET", baseUrl + "item/all", data)
    if (res && res.data && res.data.message === "ok" && res.data.code === 0) {
      await this.setState({
        ...this.state,
        listData: res.data.data
      })
    }
  }
  handleMouseOver = async (isMouseOver, idx) => {
    //console.log(1111);
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
    //console.log(this.state.isMouseOver);
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
                <div style={{ display: 'flex', paddingTop: '20px' , paddingRight: '50px'}}>
                  <FormGroup style={{ display: 'flex', alignSelf: 'center', paddingRight: '150px', paddingLeft: '100px', margin: '0px' }}>
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
                  <FormGroup style={{ margin: '0px' }}>
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

                    {
                      this.state.listData.map((item, idx) => {
                        return (
                          <Col xs="6" sm="3">
                            <div
                              style={{ width: 200, marginLeft: 10, marginBottom: 15 }}
                              onMouseEnter={() => this.handleMouseOver(isMouseOver, idx)}
                              className="item">
                              <div>
                                {item.image === null ? (<img style={{ width: '200px', height: '200px' }} src={imageDefault} />)
                                  : (<img style={{ width: '200px', height: '200px' }} src={baseImage + item.image} />)}
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
                                    //console.log('ok')
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
                                  style={{ marginTop: 10, marginLeft: 10, width: '90%', marginBottom: 5 }} outline color="primary"
                                  onClick={() => this.handleAddToCart(item, idx)}
                                >Thêm vào giỏ hàng</Button>
                                <h3 style={{ color: 'red', fontWeight: 'bold' }}>({item.price} VND)</h3>
                                <p style={{ marginTop: -5, fontWeight: 'normal' }}>{item.name}</p>

                              </div>

                            </div>
                          </Col>
                        )
                      })}
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
