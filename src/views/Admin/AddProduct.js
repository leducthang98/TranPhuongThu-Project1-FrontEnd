import Header from 'components/Headers/Header'
import { baseUrl, baseImage } from '../../domain'
import React, { useEffect, useState } from 'react'
import Button from 'reactstrap/lib/Button'
import Card from 'reactstrap/lib/Card'
import Col from 'reactstrap/lib/Col'
import Container from 'reactstrap/lib/Container'
import FormGroup from 'reactstrap/lib/FormGroup'
import Input from 'reactstrap/lib/Input'
import Label from 'reactstrap/lib/Label'
import Row from 'reactstrap/lib/Row'
import MakeRequest from 'views/MakeRequest'
import imageDefault from './default.png'
import './Modalhome.css'

function AddProduct() {
    const [item, setItem] = useState('')
    const [file, setFile] = useState('')

    const [pathFile, setPath] = useState('')
    const [type, setType] = useState(null)
    const handleCheckBox = (e) => {
        const { value, name } = e.target
        console.log(value);
        setItem({
            ...item,
            type: value
        })
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setItem({
            ...item,
            [name]: value
        })
    }
    const handleFile = (e) => {
        e.preventDefault();
        const url = e.target.files[0]
        console.log(url);
        setFile(e.target.files[0])
        var path = (window.URL || window.webkitURL).createObjectURL(url)
        setPath(path)
    }
    useEffect(() => { console.log(file) }, [file])
    const clearFile = (e) => {
        setFile('')
        setPath('')
    }
    const handleClick = async () => {
        let dataPost = new FormData()
        dataPost.append('image', file)
        const res = await saveImage(dataPost)
        if (res.code === 0) {
            const product = {
                image: res.data.imagePath,
                name: item.name,
                type: item.type,
                price: item.price,
                description: item.description,
                amount: item.amount
            }
            const data = await saveProduct(product)
        }
    }
    const saveProduct = async (product) => {
        const res = await MakeRequest('post', baseUrl + `item/create`, product)
        if (res.data && res.data.code === 0) {
            alert("Thêm sản phẩm thành công")
            return res.data
        } else {
            alert("Thêm sản phẩm thất bại!")
        }
    }
    const saveImage = async (dataPost) => {
        const res = await MakeRequest('post', baseUrl + `upload/photo`, dataPost
            , {
                'Content-Type': 'multipart/form-data'
            }
        )
        if (res.data && res.data.code === 0) {
            // setImgaeSaved(res.data.data)
            return res.data

        } else {
            alert('Không lưu được ảnh!')
            // setLoading(false)
        }
    }
    const preview = () => {
        let show = (file.name) ?
            (
                <>
                    <img height={200} src={pathFile} />
                    <Button onClick={(e) => clearFile()}>x</Button>
                </>
            ) : ('')
        return show
    }
    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Card className="shadow">
                    <Row>
                        <Col style={{ paddingLeft: '100px', paddingTop: '50px', paddingRight: '50px' }}>
                            <FormGroup >
                                <Label> Tên sản phẩm </Label>
                                <Input name='name' value={item.name} style={{ color: '#000', }} onChange={(e) => { handleChange(e) }} ></Input>
                            </FormGroup>
                            <div style={{ display: 'flex' }}>
                                <FormGroup  >
                                    <Label>Số lượng trong kho</Label>
                                    <Input type="number" name="amount" value={item.amount} style={{ color: '#000', width: '100px' }} onChange={(e) => { handleChange(e) }} ></Input>
                                </FormGroup>
                                <FormGroup style={{ paddingLeft: '300px' }} >
                                    <Label>Giá tiền</Label>
                                    <Input type="number" name="price" value={item.price} style={{ color: '#000', width: '300px' }} onChange={(e) => { handleChange(e) }} ></Input>
                                </FormGroup>
                            </div>
                            <FormGroup check style={{ padidngTop: '10px', paddingBottom: '10px' }}>
                                <Label style={{ paddingRight: '200px' }} check>
                                    <Input type="radio" value={1} name="radio1"
                                        onChange={(e) => handleCheckBox(e)} /> {'     '}Quần
                                </Label>
                                <Label check>
                                    <Input type="radio" value={2} name="radio1"
                                        onChange={(e) => handleCheckBox(e)} /> {' '}Áo
                                </Label>
                            </FormGroup>
                            <FormGroup>
                                <Label>  Mô tả </Label>
                                <Input id="description-input" type="textarea" name="description" value={item.description} style={{ color: '#000' }} onChange={(e) => { handleChange(e) }}></Input>
                            </FormGroup>
                            <div>
                                <div style={{ paddingLeft: '30px' }}>
                                    <label for="file-upload" className="custom-file-upload">Tải ảnh minh họa</label>
                                    <Input name='pathFile' id="file-upload" type="file"
                                        style={{ display: 'none' }} onChange={(e) => handleFile(e)} />
                                </div>
                            </div>
                            <FormGroup className='image_preview' style={{ display: 'flex' }}>
                                <div style={{
                                    float: 'right', width: '300px', height: '200px',
                                    marginRight: '100px', display: 'flex', border: '1px solid #e1e1ef'
                                }} >
                                    {preview()}
                                </div>
                            </FormGroup>
                            <div>
                                <Button color="info" onClick={() => {
                                    handleClick()
                                }}>Thêm sản phẩm</Button>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Container>
        </>
    )
}

export default AddProduct