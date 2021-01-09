
import React, { useEffect, useState } from 'react'
// import { baseUrl } from 'domain'
// import Card from 'reactstrap/lib/Card'
// import CardHeader from 'reactstrap/lib/CardHeader'
// import Container from 'reactstrap/lib/Container'
// import Row from 'reactstrap/lib/Row'
// import Table from 'reactstrap/lib/Table'
// import MakeRequest from 'views/MakeRequest'
// import Header from 'components/Headers/Header'
// import AdminHeader from 'components/Headers/AdminHeader'
import { withRouter } from 'react-router-dom'

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
import {
    chartOptions,
    parseOptions,
    chartExample1,
    chartExample2,
} from "variables/charts.js";
import "../index.css";

import Header from "components/Headers/Header.js";
import { baseUrl, getAllItem } from "../../domain";
import axios from "axios";
import MakeRequest from "../MakeRequest";
import FormGroup from "reactstrap/lib/FormGroup";
import Input from "reactstrap/lib/Input";
import { connect } from "react-redux";
import DetailItem from './DetailItem';

function ListOrder(props) {
    const [listData, setList] = useState([])
    const [status, setStatus] = useState('')
    const getAllItem = async () => {
        const data = await MakeRequest("get", baseUrl + "order/all")
        const res = data.data

        if (res.code === 0 && res.message === "ok") {
            setList(res.data)
        }

    }
    const HandleDelItem = async (item, idx) => {
        const res = await MakeRequest("delete", baseUrl + "order/" + item.id)
        if (res.data.code === 0) {
            await getAllItem()
            alert("Xóa thành công")
        } else {
            alert("Xóa thất bại do " + res.data.message)
        }
    }
    const handleSort = async (e) => {
        const { name, value } = e.target
        const sortType = value.charAt(0)
        const Sortcolumn = value.slice(1, value.length)

        const data = {
            sortType: sortType,
            sortColumn: Sortcolumn,

        }
        const res = await MakeRequest("GET", baseUrl + "order/all", data)
        if (res && res.data && res.data.message === "ok" && res.data.code === 0) {
            setList(res.data.data
            )
        }
    }
    // const handleSearch = async (inputSearch) => {

    //     console.log();
    //     const searchData = {
    //         searchData: inputSearch.target.value
    //     }
    //     const res = await MakeRequest("GET", "http://103.142.26.130:6001/order/search", searchData)
    //     // console.log('res:', res)
    //     if (res.data.code === 0) {
    //         setList(res.data.data)
    //     }
    // }

    const handleAccept = (item) => {
        const res = MakeRequest('put', baseUrl + "order/cancel/" + item.id)
        if (res && res.data && res.data.message === "ok" && res.data.code === 0) {
            alert("Đơn hàng đã được xử lý")
            setList(res.data.data)
        } else {
            alert("Xảy ra lỗi " + res.data.message)
        }

    }

    const buttonReder = (item, idx) => {
        if (item.status === 1) {
            return (
                <>
                    <Button color="danger" onClick={() => handleAccept(item, idx)}>Chấp nhận</Button>
                    {/* <Button color="danger" onClick={() => HandleDelItem(item, idx)}>Chi tiết</Button> */}
                </>)
        }
        if (item.status === 2) {
            return (
                <>
                    <Button color="danger" onClick={() => HandleDelItem(item, idx)}>Chi tiết</Button>
                </>)
        }
        if (item.status === 3) {
            return (
                <>
                    <Button color="danger" onClick={() => HandleDelItem(item, idx)}>Chi tiết</Button>

                </>)
        }
        if (item.status === 4) {
            return (
                <>
                    <Button color="danger" onClick={() => HandleDelItem(item, idx)}>Chi tiết</Button>

                </>)
        }
    }
    useEffect(() => {
        getAllItem()
    }, [])
    useEffect(() => {
        console.log(status)
    }, [status])
    const content = () => {
        let show = listData.map((item, idx) => {
            return (
                <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td  >
                        {item.order_id}
                    </td>
                    <td>
                        {item.fullname}
                    </td>
                    <td>{
                        (item.status === 1) ? ("Đơn hàng chờ xử lý") : ((item.status === 2) ? ("Đơn đã xử lý") : ((item.status === 3) ? ("Đơn đã hủy") : ((item.status === 4) ? ("Đơn khách hàng hủy") : (null))))
                    }</td>

                    <td>
                        {item.create_time}
                    </td>
                    <td>
                        {item.address}
                    </td>

                    <td style={{ display: 'flex' }}>
                        {buttonReder(item, idx)}

                    </td>
                </tr>
            )
        })
        return show
    }
    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Card className="shadow">
                    <div style={{ display: 'flex', paddingTop: '20px' }}>
                        {/* <FormGroup style={{ display: 'flex', alignSelf: 'center', paddingRight: '200px', paddingLeft: '100px', margin: '0px' }}>
                            <Input
                                style={{ width: '500px' }}
                                type="search"
                                name="dataSearch"
                                id="exampleSearch"
                                placeholder="Tìm kiếm"
                                onChange={(e) => {
                                    handleSearch(e)
                                }}
                            />
                            <Button>
                                <i class="fas fa-search"></i></Button>
                        </FormGroup> */}
                        {/* <FormGroup style={{ margin: '0px' }}>
                            <Input type="select" name="select" id="exampleSelect" onChange={(e) => {
                                handleSort(e)
                            }}>
                                <option name="price" value="1price">Sắp xếp</option>
                                <option name="price" value="1price">Giá thấp đến cao</option>
                                <option name="price" value="0price">Giá cao đến thấp</option>
                                <option value="1" value="1name">Sắp xếp theo tên A-Z</option>
                                <option value="0" value="0name">Sắp xếp theo tên Z-A</option>

                            </Input>
                        </FormGroup> */}

                    </div>
                    <CardBody>
                        <Row>
                            <div className="col">
                                <Card className="shadow">
                                    <CardHeader className="border-0">
                                    </CardHeader>
                                    <Table className="align-items-center table-flush" responsive>
                                        <thead className="thead-light">
                                            <tr>
                                                <th >STT</th>
                                                <th >Mã đơn hàng</th>
                                                <th >Tên khách hàng</th>
                                                <th >Trạng thái </th>
                                                <th >Ngày tạo </th>
                                                <th >Địa chỉ</th>
                                                <th >Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {content()}
                                        </tbody>

                                    </Table>
                                </Card>
                            </div>
                        </Row>
                    </CardBody>
                </Card>
            </Container>
        </>
    )
}

export default ListOrder