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

// reactstrap components
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
import Alert from "reactstrap/lib/Alert";
import MakeRequest from "views/MakeRequest";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      checkbox: false
    }
  }

  handleChange = (e) => {
    //console.log(e.target.value);
    const { name, value } = e.target
    this.setState({
      ...this.state,
      [name]: value
    })
  }
  handleSubmit = async () => {
    if (this.state.username.length > 0 && this.state.password.length > 0) {
      if (this.state.checkbox === true) {
        //console.log(JSON.stringify(this.state));
        const data = await MakeRequest("POST", "http://103.142.26.130:6001/auth/regist", this.state)
        const res = data.data
        //console.log("8666   ", res);

        if (res.code === 0 && res.message === "ok") {
          //console.log(res);
          alert("Đăng kí thành công")
          setTimeout(() => {
            this.props.history.push("/auth/login")
          }, 1000);
        } else {
          //console.log(1111111111);
          alert("" + res.message)
        }
      } else {
        alert("Đồng ý với điều khoản sử dụng")
      }
    } else {
      alert('Điền đầy đủ thông tin')
    }
  }

  render() {
    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">

            <CardBody className="px-lg-5 py-lg-5">

              <Form role="form">
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Tên tài khoản" name="username" onChange={(e) => { this.handleChange(e) }} />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" name="email" autoComplete="new-email" onChange={(e) => { this.handleChange(e) }} />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Mật khẩu" name="password" autoComplete="new-password"
                      onChange={(e) => { this.handleChange(e) }} />
                  </InputGroup>
                </FormGroup>
                <div className="text-muted font-italic">

                </div>
                <Row className="my-4">
                  <Col xs="12">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id="customCheckRegister" defaultChecked={this.state.checkbox}
                        type="checkbox" name="checkbox" onChange={(e) => {
                          //console.log(e.target.value);
                          this.setState({
                            ...this.state,
                            checkbox: !this.state.checkbox
                          })
                        }}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheckRegister"

                      >
                        <span className="text-muted">
                          Tôi đồng ý với{" "}
                          <a href="#pablo" onClick={e => e.preventDefault()}>
                            điều khoản sử dụng
                          </a>
                        </span>
                      </label>
                    </div>
                  </Col>
                </Row>
                <div className="text-center">
                  <Button className="mt-4" color="primary" type="button" onClick={() => this.handleSubmit()}>
                    Đăng ký
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

export default Register;
