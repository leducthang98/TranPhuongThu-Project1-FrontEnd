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
import * as actions from '../../store/actions/actions'


// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { connect } from "react-redux";
import { store } from "react-notifications-component";
import Button from "reactstrap/lib/Button";
import MakeRequest from "views/MakeRequest";
import { baseUrl } from "domain";
import axios from "axios";

class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      total: 0,
      amount: []
    }
  }
  async componentDidMount() {
    await this.setState({
      ...this.state,
      listData: this.props.cart
    })
    let amount = []
    let total = 0
    this.state.listData.map((item) => {
      total += parseInt(item.num) * parseInt(item.price)
      amount.push(item.num)
      this.setState({
        ...this.state,
        amount: amount,
        total: total
      })
    })
  }
  addMore = async (idx, item) => {
    let oldStore = this.state.listData
    let oldAmout = this.state.amount
    let data = ''
    for (let index = 0; index < oldAmout.length; index++) {
      if (index === idx) {
        console.log(index + "==>" + oldAmout[idx] + "==>" + idx);

        (oldAmout[idx] === item.amount) ? (oldAmout[idx] = item.amount)
          : (oldAmout[idx] = parseInt(this.state.amount[idx]) + 1)

        data = {
          id: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          type: item.type,
          amount: item.amount,
          num: oldAmout[idx]
        }
        oldStore[idx] = data
        console.log(oldStore);
        await this.props.cartAdd(oldStore)
      }
    }
    await this.setState({
      ...this.state,
      amount: oldAmout

    })
  }

  minusMore = async (idx, item) => {
    let oldStore = this.state.listData
    let oldAmout = this.state.amount
    let data = ''
    for (let index = 0; index < oldAmout.length; index++) {
      if (index === idx) {
        console.log(index + "==>" + oldAmout[idx] + "==>" + idx);

        (oldAmout[idx] === 1) ? (oldAmout[idx] = 1)
          : (oldAmout[idx] = parseInt(this.state.amount[idx]) - 1)
        data = {
          id: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          type: item.type,
          amount: item.amount,
          num: oldAmout[idx]
        }
        oldStore[idx] = data
        console.log(oldStore);
        await this.props.cartAdd(oldStore)
      }
    }
    await this.setState({
      ...this.state,
      amount: oldAmout
    })
  }
  HandleDelItem = async (item, idx) => {
    let oldStore = this.state.listData
    let oldAmout = this.state.amount
    oldStore.splice(idx, 1)
    this.props.cartAdd(oldStore)
    await this.setState({
      ...this.state,
      listData: this.props.cart
    })
    let amount = []
    this.state.listData.map((item) => {
      amount.push(item.num)
      this.setState({
        ...this.state,
        amount: amount
      })
    })
  }

  handleExportBill = async () => {
    let data = []
    this.state.listData.map((item, idx) => {
      for (let index = 0; index < item.num; index++) {
        data.push(item.id)
      }
    })
    console.log(data);
    const res = await axios({
      method: 'POST',
      url: "http://103.142.26.130:6001/order/create",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
        'Access-Control-Allow-Origin': "*"
      },
      data: data
    });
    let clearStore = []
    if (res && res.data.code === 0) {
      this.props.cartAdd(clearStore)
      this.props.history.push("/admin/order")
    }
  }
  contentInCart = () => {

    let show = this.state.listData.map((item, idx) => {
      return (
        <tr key={idx}>
          <td scope="row">
            {item.name}
          </td>
          <td>
            {item.image}
          </td>
          <td>{item.price} đ</td>

          <td>
            <div style={{ paddingTop: '20px', display: 'flex', textAlign: 'center' }}>
              <button style={{ height: '30px', background: 'none', borderRight: 'none' }}
                onClick={() => this.minusMore(idx, item)
                }
              >
                <i class="fas fa-minus-circle" ></i>
              </button>
              <p style={{
                width: '80px', height: '30px', border: '1px solid #525f7f',
                paddingLeft: '5px', paddingRight: '5px',
                textAlign: 'center'
              }}>{parseInt(this.state.amount[idx])}</p>
              <button style={{ height: '30px', background: 'none', borderLeft: 'none' }}
                onClick={() => this.addMore(idx, item)
                }
              >
                <i class="fas fa-plus-circle"
                ></i>
              </button>
            </div>
          </td>
          <td>
            {parseInt(this.state.amount[idx]) * parseInt(item.price)}
          </td>
          <td>
            <Button onClick={() => this.HandleDelItem(item, idx)}>Xóa</Button>
          </td>
        </tr>
      )
    })
    return show;
  }
  render() {

    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Giỏ hàng</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th >Tên sản phẩm</th>
                      <th >Ảnh</th>
                      <th >Giá tiền</th>
                      <th >Số lượng</th>
                      <th >Thành tiền</th>
                      {/* <th >Completion</th> */}
                      {/* <th >Thành tiền</th> */}

                    </tr>
                  </thead>
                  <tbody>
                    {this.contentInCart()}
                  </tbody>

                </Table>

                {this.state.listData.length > 0 && <div style={{
                  display: 'flex', paddingLeft: '50px', width: '500p',
                  border: '1px solid #f7fafc', paddingTop: '15px'
                }}>
                  <div style={{ width: "300px" }}>
                    <p style={{ fontWeight: 500, color: '#000' }}>Tổng hóa đơn  </p >
                  </div>
                  <div>
                    <p style={{ fontWeight: 500, color: '#000' }}>{this.state.total} đ</p>
                  </div>
                </div>
                }
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
              <div>
                {this.state.listData.length > 0 && <div style={{ paddingLeft: '500px', paddingTop: '30px' }}><Button color="info" onClick={() => {
                  this.handleExportBill()
                }}>Đặt hàng</Button>
                </div>
                }
              </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Tables);
