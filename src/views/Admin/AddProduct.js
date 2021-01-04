import Header from 'components/Headers/Header'
import React, { useState } from 'react'
import Card from 'reactstrap/lib/Card'
import Col from 'reactstrap/lib/Col'
import Container from 'reactstrap/lib/Container'
import FormGroup from 'reactstrap/lib/FormGroup'
import Input from 'reactstrap/lib/Input'
import Label from 'reactstrap/lib/Label'
import Row from 'reactstrap/lib/Row'

function AddProduct() {
    const [info, setInfo] = useState('')
    const [item, setItem] = useState('')
    const [isChecked, setChecked] = useState(false)
    const [type, setType] = useState(null)
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
    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Card className="shadow">
                    <Row>
                        <Col>

                            <FormGroup >
                                <Label> Tên sản phẩm </Label>
                                <Input name='name' value={item.name} style={{ color: '#000',   }} onChange={(e) => { handleChange(e) }} ></Input>
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
                                {/* <img style={{ width: '450px', }} src={item.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaJHHovVO36rCgZDgAad5hchXWr1ZSil8bfw&usqp=CAU"} /> */}
                            </FormGroup>

                            <FormGroup>
                                <Label>  Mô tả </Label>
                                <Input name="description" value={item.description} style={{ color: '#000' }} onChange={(e) => { handleChange(e) }}></Input>
                            </FormGroup>
                        </Col>
                    </Row>
                </Card>
            </Container>
        </>
    )
}

export default AddProduct