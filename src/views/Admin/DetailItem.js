
import { baseUrl } from 'domain';
import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Col, Row } from 'reactstrap';
import Label from 'reactstrap/lib/Label';
import MakeRequest from 'views/MakeRequest';
// import './Modalhome.css'
const DetailItem = (props) => {
    const [item, setItem] = useState('')
    const [isChecked, setChecked] = useState(false)
    const [type, setType] = useState(null)
    const {
        data,
        buttonLabel,
        className
    } = props;
    useState(() => {
        setItem(data)
    }, [])
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const handleCheckBox = (e) => {
        setChecked(!isChecked)
        const { name, value } = e.target
        setType(value)
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setItem({
            ...item,
            [name]: value
        })
    }
    const updateButton = () => {
        const data = {
            type: type,
            name: item.name,
            description: item.description,
            amount: item.amount,
            image: item.image,

        }
        const res = MakeRequest('put', baseUrl + "item/" + item.id, data)
        if(res.data.code===0){
            alert("Cập nhật thành công")
            toggle()
        }
    }
    useEffect(() => {
        // console.log(item);
    }, [item])

    return (
        <div>
            <Button color="info" onClick={toggle}>Chi tiết</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>
                    <h5>{data.name.toLowerCase()}</h5>
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>

                            <FormGroup >
                                <Label> Tên sản phẩm </Label>
                                <Input name='name' value={item.name} style={{ color: '#000' }} onChange={(e) => { handleChange(e) }} ></Input>
                            </FormGroup>
                            <FormGroup  >
                                <Label>Số lượng trong kho</Label>
                                <Input type="number" name="amount" value={item.amount} style={{ color: '#000' }} onChange={(e) => { handleChange(e) }} ></Input>
                            </FormGroup>


                            <FormGroup check style={{ display: 'flex' }}>
                                <Label style={{ paddingRight: '200px' }} check>
                                    <Input type="checkbox" checked={(item.type === 1 ? (!isChecked) : (isChecked))} value={1} onChange={(e) => handleCheckBox(e)} /> {'     '}Quần
                                </Label>
                                <Label check>
                                    <Input type="checkbox" checked={(item.type === 2 ? (!isChecked) : (isChecked))} value={2} onChange={(e) => handleCheckBox(e)} /> {' '}Áo
                                </Label>
                            </FormGroup>

                            <FormGroup>
                                <img style={{ width: '450px', }} src={item.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaJHHovVO36rCgZDgAad5hchXWr1ZSil8bfw&usqp=CAU"} />
                            </FormGroup>



                            <FormGroup>
                                <Label>  Mô tả </Label>
                                <Input name="description" value={item.description} style={{ color: '#000' }} onChange={(e) => { handleChange(e) }}></Input>
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => updateButton()}>Cập nhật</Button>

                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div >
    );
}

export default DetailItem;
