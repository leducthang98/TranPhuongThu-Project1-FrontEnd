
import React, { useEffect, useState } from 'react'
import './table-responsive.css'
import { withRouter } from 'react-router-dom'

import {

    Card,
    CardHeader,
    CardBody,
    Table,
    Container,
    Row,
} from "reactstrap";
import imageDefault from './default.png'
import "../index.css";

import Header from "components/Headers/Header.js";
import { baseUrl, baseImage } from "../../domain";
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
 
    useEffect(() => {
        getAllItem()
    }, [])
    const content = () => {

        let show = listData.map((item, idx) => {
            return (
                <tr key={idx}>
                    <td scope="row">{idx + 1}</td>
                    <td scope="row" >
                        {item.fullname}
                    </td>
                    <td scope="row">
                        {item.username}
                    </td>
                    <td scope="row">
                        {item.image === null ? (<img style={{ width: '75px', height: '75px' }} src={imageDefault} />) : (<img style={{ width: '75px', height: '75px' }} src={baseImage + item.image} />)}
                    </td >
                    <td scope="row">{item.email} </td>

                    <td scope="row">
                        {item.gender === 1 ? ("nam") : ("nữ")}
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

                    <CardBody>
                        <Row>
                            <div className="col">
                                <Card className="shadow">
                                    <CardHeader className="border-0">
                                    </CardHeader>
                                    <Table className="align-items-center table-flush" responsive>
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col">STT</th>
                                                <th scope="col">Tên đầy đủ</th>
                                                <th scope="col">Tên đăng nhập</th>
                                                <th scope="col" >Ảnh đại diện</th>
                                                <th scope="col" >Email</th>
                                                <th scope="col" >Giới tính</th>
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