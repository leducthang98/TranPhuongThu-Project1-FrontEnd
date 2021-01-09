
import React, { useEffect, useState } from 'react'
import { baseUrl, baseImage } from '../../domain'
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
import axios from "axios";
import MakeRequest from "../MakeRequest";
import FormGroup from "reactstrap/lib/FormGroup";
import Input from "reactstrap/lib/Input";
import DetailNew from './DetailNews';
import DetailNews from './DetailNews';

function ListNews(props) {
    const [listData, setList] = useState([])
    const getAllItem = async () => {
        const data = await MakeRequest("get", baseUrl + "news/all")
        const res = data.data

        if (res.code === 0) {
            setList(res.data)
        }

    }

    const updateData = (data) => {
        console.log(data);
        setList(data)
    }
    const HandleDelItem = async (item, idx) => {
        const res = await MakeRequest("delete", baseUrl + "news/" + item.id)
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
        const res = await MakeRequest("GET", baseUrl + "item/all", data)
        if (res && res.data && res.data.message === "ok" && res.data.code === 0) {
            setList(res.data.data
            )
        }
    }
    const handleSearch = async (inputSearch) => {

        console.log();
        const searchData = {
            searchData: inputSearch.target.value
        }
        const res = await MakeRequest("GET", "http://103.142.26.130:6001/news/search", searchData)
        // console.log('res:', res)
        if (res.data.code === 0) {
            setList(res.data.data)
        }
    }
    const HandleDetail = (item, idx) => {

    }
    useEffect(() => {
        getAllItem()
    }, [])
    const content = () => {

        let show = listData.map((item, idx) => {
            return (
                <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td  >
                        {item.title}
                    </td>
                    <td>
                        <img style={{ width: '75px', height: '75px' }} src={baseImage + item.image}></img>
                    </td>
                    <td>{item.content} đ</td>

                    <td>
                        {item.view}
                    </td>

                    <td style={{ display: 'flex' }}>
                        <DetailNews data={item} updateData={(data) => updateData(data)} />
                        <Button color="danger" onClick={() => HandleDelItem(item, idx)}>Xóa</Button>

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
                    <FormGroup style={{ display: 'flex', alignSelf: 'center', paddingTop: '20px', paddingLeft: '20px', margin: '0px' }}>
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
                                                <th >Tiêu đề</th>
                                                <th >Ảnh</th>
                                                <th >Nội dung</th>
                                                <th >Lượt xem</th>
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

export default ListNews