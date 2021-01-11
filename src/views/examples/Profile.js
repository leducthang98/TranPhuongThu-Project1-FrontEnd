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
import { baseUrl , baseImage} from '../../domain'
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
import imageDefault from '../default.png'
import MakeRequest from "../MakeRequest";
// core components
import UserHeader from "../../components/Headers/UserHeader";
import Label from "reactstrap/lib/Label";
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        username: '',
        age: '',
      },
      checked: false
    }
  }
  async componentDidMount() {
    this.getProfile()
  }
  getProfile = async () => {
    const res = await MakeRequest('get', "http://103.142.26.130:6001/user/me")
    if (res && res.data && res.data.code === 0) {
      await this.setState({
        ...this.state,
        userInfo: {
          ...this.state.userInfo,
          username: res.data.data.username,
          fullname: res.data.data.fullname,
          age: res.data.data.age,
          email: res.data.data.email,
          gender: res.data.data.gender,
          image: res.data.data.image,
          address: res.data.data.address || "Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
        },
        male: (res.data.data.gender === 1) ? (true) : (false),
        female: (res.data.data.gender === 2) ? (true) : (false)

      })
    }
    console.log(this.state.checked);
  }
  handleUpdateProfile = async () => {
    console.log(this.state.userInfo);
    if (this.state.checked === false) {
      this.setState({
        ...this.state,
        userInfo: {
          ...this.state.userInfo,
          gender: 2
        }
      })
    } else {
      this.setState({
        ...this.state,
        userInfo: {
          ...this.state.userInfo,
          gender: 1
        }
      })
    }
    const dataUpdate = {
      age: this.state.userInfo.age,
      image: this.state.userInfo.image,
      email: this.state.userInfo.email,
      username: this.state.userInfo.username,
      fullname: this.state.userInfo.fullname,
      gender: this.state.userInfo.gender,
      address: this.state.userInfo.address,

    }
    const res = await MakeRequest("PUT", baseUrl + "user/update/me", dataUpdate)
    if (res && res.data && res.data.code === 0) {

      alert("Cập nhật thành công")
    }

  }
  handleChange = async (e) => {
    const { name, value } = e.target
    await this.setState({
      ...this.state,
      userInfo: {
        ...this.state.userInfo,
        [name]: value
      }
    })
  }
  handleCheckClick = (e) => {
    this.setState({
      ...this.state,
      checked: !this.state.checked

    });

  }
  render() {
    console.log(this.state.checked);
    return (
      <>
        <UserHeader image={this.state.userInfo.image} username={this.state.userInfo.username} />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        {this.state.userInfo.image === null ? (
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={imageDefault}
                          />
                        ) : (
                            <img
                              alt="..."
                              // className="rounded-circle"
                              src={baseImage+this.state.userInfo.image}
                            />
                          )}

                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
{/*                   
                  <div className="d-flex justify-content-between">
                    <Button
                      className="mr-4"
                      color="info"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      Connect
                    </Button>
                    <Button
                      className="float-right"
                      color="default"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      Message
                    </Button>
                  </div>
                */}
                 </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <div style={{ height: '50px', width: '100%' }}></div>
                  <div className="text-center">
                    <h3>
                      {this.state.userInfo.username}
                      <span className="font-weight-light">{this.state.userInfo.age}</span>
                    </h3>

                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      {this.state.userInfo.address}
                    </div>
                    <hr className="my-4" />
                    <p>
                      Ryan — the name taken by Melbourne-raised, Brooklyn-based
                      Nick Murphy — writes, performs and records all of his own
                      music.
                    </p>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      Show more
                    </a>
                  </div>
                </CardBody>

              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My account</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        Settings
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Thông tin cá nhân
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Họ và tên
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={this.state.userInfo.fullname}
                              id="input-username"
                              placeholder="Họ và tên"
                              type="text"
                              name="fullname"
                              onChange={(e) => this.handleChange(e)}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-email"
                              placeholder="Email"
                              value={this.state.userInfo.email}
                              type="email"
                              name="email"
                              onChange={(e) => this.handleChange(e)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Giới tính
                            </label>

                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="male" checked={this.state.checked}
                                onChange={(e) => this.handleCheckClick(e)}
                              />{"  "}Nam        </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="female"
                                checked={!this.state.checked}
                                onChange={(e) => this.handleCheckClick(e)}
                              />{"  "}Nữ        </Label>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      Địa chỉ liên hệ
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Địa chỉ
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={this.state.userInfo.address || "Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"}
                              id="input-address"
                              placeholder="Địa chỉ"
                              type="text"
                              name="address"
                              onChange={(e) => this.handleChange(e)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <div style={{ paddingLeft: '200px', paddingTop: '30px' }}>
            <Button
              color="info"
              onClick={() => {
                this.handleUpdateProfile()
              }}
            >
              Cập nhật</Button>
          </div>
        </Container>
      </>
    );
  }
}

export default Profile;
