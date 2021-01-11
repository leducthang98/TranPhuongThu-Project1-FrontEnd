
import { baseUrl, baseImage } from '../../domain';

import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Col, Row } from 'reactstrap';
import Label from 'reactstrap/lib/Label';
import MakeRequest from 'views/MakeRequest';
import imageDefault from './default.png'
import './Modalhome.css'
import Table from 'reactstrap/lib/Table';
const DetailOrder = (props) => {
    const [item, setItem] = useState([])
    const [order, setOrder] = useState('')
    const [isChecked, setChecked] = useState(false)
    const [file, setFile] = useState('')
    const [pathFile, setPath] = useState('')
    const [type, setType] = useState(null)

    const {
        id,
        className
    } = props;

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const getOrder = async () => {
        const data = await MakeRequest("get", baseUrl + "order/" + id)
        const res = data.data
        console.log(res);
        if (res.code === 0) {
            setItem(res.data.item)
            setOrder(res.data)
        }
    }
    const content = () => {
        let show = item.map((item, idx) => {
            return (
                <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td  >
                        {item.item_id}
                    </td>
                    <td>
                        {item.item_name}
                    </td>
                    <td>
                        {item.price}
                    </td>
                    <td>
                        {item.amount}
                    </td>
                    {/* <td style={{ display: 'flex' }}>
                        {parseInt(item.price) * parseInt(item.amount)} đ
                    </td> */}
                </tr>
            )
        })
        return show
    }
    useEffect(() => {
        getOrder()
    }, [])
    useEffect(() => {
        console.log(item);
    }, [item])
    return (
        <div>
            <Button color="info" onClick={toggle}>Chi tiết</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>
                    <h5 style={{ fontSize: '15px' }}>Đơn hàng   {id}</h5>
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>
                            <div style={{ display: 'flex', width: '100%', paddingLeft: '50px', paddingBottom: '30px' }}>
                                <div style={{ width: '50%' }}>

                                    <p style={{ color: '#000', fontWeight: 500, margin: '0px', fontSize: '13px', fontFamily: 'Open Sans, sans-serif' }}>Khách hàng:  {order.fullname}</p>
                                </div>
                                <div style={{ width: '50%' }}>
                                    <p style={{ color: '#000', fontWeight: 500, margin: '0px', fontSize: '13px', fontFamily: 'Open Sans, sans-serif' }}> Địa chỉ: {order.address}</p>
                                </div>
                            </div>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th >STT</th>
                                        <th >Mã sản phẩm</th>
                                        <th >Tên sản phẩm</th>
                                        <th >Giá tiền </th>
                                        <th >Số lượng </th>
                                        {/* <th >Tổng tiền</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {content()}
                                </tbody>

                            </Table>

                            <div style={{ float: 'right', paddingRight:'100px' }}>
                                <p>{order.totalMoney} đ</p>
                            </div>

                        </Col>
                    </Row>
                </ModalBody>

                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Đóng</Button>
                </ModalFooter>
            </Modal>
        </div >
    );
}

export default DetailOrder;
