import { baseUrl, loginApi } from "../../domain";
import React from "react";
import { withRouter } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";
import axios from "axios";
import MakeRequest from "views/MakeRequest";

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }
  async _onClickLogin() {
    await localStorage.removeItem("token")
    await localStorage.removeItem("role")
    const data = {
      username: this.state.username,
      password: this.state.password
    }

    const response = await MakeRequest('post', baseUrl + "auth/login", data)
    let authData = response.data;
    if (authData && authData.code === 0) {
      await localStorage.setItem("token", authData.data.token)
      const infor = await MakeRequest("GET", baseUrl + "user/me")
      if (infor && infor.data.code === 0 && infor.data.data.role === "user") {
        await localStorage.setItem("role", infor.data.data.role)
        if (localStorage.getItem("role") === "user") {
          console.log(51);
          window.location.href = "http://localhost:3000/user/home"
        }
      }
      if (infor && infor.data.code === 0 && infor.data.data.role === "admin") {
        await localStorage.setItem("role", infor.data.data.role)
        if (localStorage.getItem("role") === "admin") {

          
             window.location.href = "http://localhost:3000/admin/home"
            
        }
      }
    } else {
      alert('' + authData.message)
    }

  }
  render() {
    // js
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      onChange={(e) => {
                        this.setState({
                          ...this.state,
                          username: e.target.value
                        })
                      }}
                      placeholder="Tên đăng nhập" type="user" autoComplete="new-email" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      onChange={(e) => {
                        this.setState({
                          ...this.state,
                          password: e.target.value
                        })
                      }}
                      placeholder="Mật khẩu" type="password" autoComplete="new-password" />
                  </InputGroup>
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />

                </div>
                <div className="text-center">
                  <Button
                    onClick={() => this._onClickLogin()}
                    className="my-4" color="primary" type="button">
                    Đăng nhập
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">

            </Col>
            <Col className="text-right" xs="6">
              {/* <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Tạo tài khoản mới</small>
              </a> */}
            </Col>
          </Row>
        </Col>
      </>
    );
  }
}

export default withRouter(Login);
