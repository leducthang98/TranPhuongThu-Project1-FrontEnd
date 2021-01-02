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
  UncontrolledAlert,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input
} from "reactstrap";
import { baseUrl, getAllItem } from '../../domain'
// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";
import "../index.css";

import Header from "components/Headers/Header.js";
import ModalNews from "./ModalNews";
import MakeRequest from "views/MakeRequest";

const listData = [
  {
    id: 1,
    name: "Sky uses cookies to create a better experience for you",
    title: 'Sky uses cookies to create a better experience for you',
    description: 'Sky News requires your consent for our trusted partners to store and access cookies, unique identifiers, personal data, and information on your browsing behaviour on this device. This applies to Sky News only. You can change your preferences at any time in “Privacy Options”, located at the bottom of every page. You don’t have to accept, but some personalised content and advertising may not work if you don’t. Our partners use your data for:',
    image: "https://e3.365dm.com/20/12/768x432/skynews-papers-thursday_5201469.jpg?20201209232059'",
  },
  {
    id: 1,
    name: "Sky uses cookies to create a better experience for you",
    title: 'Sky uses cookies to create a better experience for you',
    description: 'Sky News requires your consent for our trusted partners to store and access cookies, unique identifiers, personal data, and information on your browsing behaviour on this device. This applies to Sky News only. You can change your preferences at any time in “Privacy Options”, located at the bottom of every page. You don’t have to accept, but some personalised content and advertising may not work if you don’t. Our partners use your data for:',
    image: "https://e3.365dm.com/20/12/768x432/skynews-papers-thursday_5201469.jpg?20201209232059'",
  },
  {
    id: 1,
    name: "Sky uses cookies to create a better experience for you",
    title: 'Sky uses cookies to create a better experience for you',
    description: 'Sky News requires your consent for our trusted partners to store and access cookies, unique identifiers, personal data, and information on your browsing behaviour on this device. This applies to Sky News only. You can change your preferences at any time in “Privacy Options”, located at the bottom of every page. You don’t have to accept, but some personalised content and advertising may not work if you don’t. Our partners use your data for:',
    image: "https://e3.365dm.com/20/12/768x432/skynews-papers-thursday_5201469.jpg?20201209232059'",
  },
  {
    id: 1,
    name: "Sky uses cookies to create a better experience for you",
    title: 'Sky uses cookies to create a better experience for you',
    description: 'Sky News requires your consent for our trusted partners to store and access cookies, unique identifiers, personal data, and information on your browsing behaviour on this device. This applies to Sky News only. You can change your preferences at any time in “Privacy Options”, located at the bottom of every page. You don’t have to accept, but some personalised content and advertising may not work if you don’t. Our partners use your data for:',
    image: null,
  },
  {
    id: 1,
    name: "Sky uses cookies to create a better experience for you",
    title: 'Sky uses cookies to create a better experience for you',
    description: 'Sky News requires your consent for our trusted partners to store and access cookies, unique identifiers, personal data, and information on your browsing behaviour on this device. This applies to Sky News only. You can change your preferences at any time in “Privacy Options”, located at the bottom of every page. You don’t have to accept, but some personalised content and advertising may not work if you don’t. Our partners use your data for:',
    image: null,
  },
  {
    id: 1,
    name: "Sky uses cookies to create a better experience for you",
    title: 'Sky uses cookies to create a better experience for you',
    description: 'Sky News requires your consent for our trusted partners to store and access cookies, unique identifiers, personal data, and information on your browsing behaviour on this device. This applies to Sky News only. You can change your preferences at any time in “Privacy Options”, located at the bottom of every page. You don’t have to accept, but some personalised content and advertising may not work if you don’t. Our partners use your data for:',
    image: null,
  },
  {
    id: 1,
    name: "Sky uses cookies to create a better experience for you",
    title: 'Sky uses cookies to create a better experience for you',
    description: 'Sky News requires your consent for our trusted partners to store and access cookies, unique identifiers, personal data, and information on your browsing behaviour on this device. This applies to Sky News only. You can change your preferences at any time in “Privacy Options”, located at the bottom of every page. You don’t have to accept, but some personalised content and advertising may not work if you don’t. Our partners use your data for:',
    image: null,
  },
  {
    id: 1,
    name: "Sky uses cookies to create a better experience for you",
    title: 'Sky uses cookies to create a better experience for you',
    description: 'Sky News requires your consent for our trusted partners to store and access cookies, unique identifiers, personal data, and information on your browsing behaviour on this device. This applies to Sky News only. You can change your preferences at any time in “Privacy Options”, located at the bottom of every page. You don’t have to accept, but some personalised content and advertising may not work if you don’t. Our partners use your data for:',
    image: null,
  },

];

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      isMouseOver: [],
      displayModal: false,
      activeNav: 1,
      alertVisible: false
    }
  }
  componentDidMount() {
    this.getData()
  }

  getData = async () => {

    const data = await MakeRequest("GET", baseUrl + "news/all")
    const res = data.data

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

    }
    const res = await MakeRequest("GET", baseUrl + "news/all", searchData)
    if (res && res.data && res.data.message === "ok" && res.data.code === 0) {
      this.setState({
        ...this.state,
        listData: res.data.data
      })
    }
  }
  handleMouseOver = async (isMouseOver, idx) => {
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
  reload(data) {
    this.setState({
      ...this.state,
      listData: data
    })
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
                <FormGroup style={{ display: 'flex', alignSelf: 'center' , paddingTop:'20px'}}>
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
                <CardBody>
                  <Row className=" icon-examples">
                    <div
                      className="gridNewsContainer">
                      {
                        this.state.listData.map((item, idx) => {
                          return <div
                            style={{ width: 200, marginLeft: 10, marginBottom: 15 }}
                            onMouseEnter={() => this.handleMouseOver(isMouseOver, idx)}
                            className="item">
                            <div style={{}}>
                              <img
                                alt="..."
                                className=" img-fluid shadow"
                                src={item?.image || 'https://e3.365dm.com/20/12/768x432/skynews-papers-thursday_5201469.jpg?20201209232059'}
                                style={{ width: 350 }}
                              ></img>
                              {
                                (this.state.isMouseOver[idx]) ? (<ModalNews data={item} reload={(data) => this.reload(data)} />
                                ) : ('')
                              }
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}  >
                              <h3 style={{ color: 'black', fontWeight: '500', textAlign: 'center', fontSize: 20 }}>{item.title}</h3>
                              <p style={{ fontSize: '11px', fontWeight: '500', color: '#000', paddingLeft: '20px', paddingTop: '5px' }}>
                                <i class="fas fa-eye"></i>
                                {item.view}

                              </p>
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

export default News;
