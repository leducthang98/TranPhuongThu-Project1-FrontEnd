
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
import imageDefault from './default.png'
import "../index.css";

import Header from "components/Headers/Header.js";
import { baseUrl, baseImage } from "../../domain";
import axios from "axios";
import MakeRequest from "../MakeRequest";
import FormGroup from "reactstrap/lib/FormGroup";
import Input from "reactstrap/lib/Input";
import { connect } from "react-redux";
import DetailItem from './DetailItem';

function ListAccount(props) {
    const [listData, setList] = useState([])
    const getAllItem = async () => {
        const data = await MakeRequest("get", baseUrl + "user/all")
        const res = data.data

        if (res.code === 0 && res.message === "ok") {
            setList(res.data)
        }

    }

    // const HandleDelItem = async (item, idx) => {
    //     const res = await MakeRequest("delete", baseUrl + "item/" + item.id)
    //     if (res.data.code === 0) {
    //         await getAllItem()
    //         alert("Xóa thành công")
    //     } else {
    //         alert("Xóa thất bại do " + res.data.message)
    //     }
    // }

    // const handleSort = async (e) => {
    //     const { name, value } = e.target
    //     const sortType = value.charAt(0)
    //     const Sortcolumn = value.slice(1, value.length)

    //     const data = {
    //         sortType: sortType,
    //         sortColumn: Sortcolumn,

    //     }
    //     const res = await MakeRequest("GET", baseUrl + "user/all", data)
    //     if (res && res.data && res.data.message === "ok" && res.data.code === 0) {
    //         setList(res.data.data
    //         )
    //     }
    // }
    // const handleSearch = async (inputSearch) => {

    //     console.log();
    //     const searchData = {
    //         searchData: inputSearch.target.value
    //     }
    //     const res = await MakeRequest("GET", "http://103.142.26.130:6001/item/search", searchData)
    //     // console.log('res:', res)
    //     if (res.data.code === 0) {
    //         setList(res.data.data)
    //     }
    // }
    // const HandleDetail = (item, idx) => {

    // }
    useEffect(() => {
        getAllItem()
    }, [])
    const content = () => {

        let show = listData.map((item, idx) => {
            return (
                <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td  >
                        {item.fullname}
                    </td>
                    <td  >
                        {item.username}
                    </td>
                    <td>
                        {item.image === null ? (<img style={{ width: '75px', height: '75px' }} src={imageDefault} />) : (<img style={{ width: '75px', height: '75px' }} src={baseImage + item.image} />)}
                    </td>
                    <td>{item.email} đ</td>

                    <td>
                        {item.gender}
                    </td>
                    <td>
                        {item.address}
                    </td>
                    {/* <td style={{ display: 'flex' }}>
                        <DetailItem data={item} />
                        <Button color="danger" onClick={() => HandleDelItem(item, idx)}>Xóa</Button>

                    </td> */}
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
                    {/* 
                    <div style={{ display: 'flex', paddingTop: '20px' }}>
                        <FormGroup style={{ display: 'flex', alignSelf: 'center', paddingRight: '200px', paddingLeft: '100px', margin: '0px' }}>
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
                        </FormGroup>
                        <FormGroup style={{ margin: '0px' }}>
                            <Input type="select" name="select" id="exampleSelect" onChange={(e) => {
                                handleSort(e)
                            }}>
                                <option name="price" value="1price">Sắp xếp</option>
                                <option name="price" value="1price">Giá thấp đến cao</option>
                                <option name="price" value="0price">Giá cao đến thấp</option>
                                <option value="1" value="1name">Sắp xếp theo tên A-Z</option>
                                <option value="0" value="0name">Sắp xếp theo tên Z-A</option>

                            </Input>
                        </FormGroup>

                    </div>
                     */}
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
                                                <th >Tên đầy đủ</th>
                                                <th >Tên đăng nhập</th>
                                                <th >Ảnh đại diện</th>
                                                <th >Email</th>
                                                <th >Giới tính</th>
                                                <th >Địa chỉ</th>
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

export default ListAccount