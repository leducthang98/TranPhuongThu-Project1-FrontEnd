
import { baseUrl, baseImage } from '../../domain';
import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Col, Row } from 'reactstrap';
import Label from 'reactstrap/lib/Label';
import MakeRequest from 'views/MakeRequest';
import './Modalhome.css'
import imageDefault from './default.png'

const DetailItem = (props) => {
    const [item, setItem] = useState('')
    const [isChecked, setChecked] = useState(false)
    const [file, setFile] = useState('')
    const [pathFile, setPath] = useState('')
    const [type, setType] = useState(null)

    const {
        data,
        buttonLabel,
        className
    } = props;
    useEffect(() => {
        setItem(data)
        if (data.type === 1) {
            setChecked(true)
        } else {
            setChecked(false)
        }
    }, [])


    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const handleCheckBox = (e) => {
        const { value, name } = e.target
        console.log(value);
        setChecked(!isChecked)
        setItem({
            ...item,
            type: value
        })
    }

    useEffect(() => {
        console.log(item);
    }, [item])
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
        setFile(e.target.files[0])
        var path = (window.URL || window.webkitURL).createObjectURL(url)
        setPath(path)
    }
    const clearFile = (e) => {
        setFile('')
        setPath('')
    }
    const preview = () => {
        let show = (file.name) ?
            (
                <>
                    <img style={{ width: '300px', height: '200px' }} src={pathFile || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaJHHovVO36rCgZDgAad5hchXWr1ZSil8bfw&usqp=CAU"} />
                    <Button onClick={(e) => clearFile()}>x</Button>
                </>
            ) : (
                item.image === null ? (<img style={{ width: '300px', height: '200px' }} src={imageDefault} />) : (<img style={{ width: '305px', height: '205px' }} src={baseImage + item.image} />)
            )
        return show
    }
    const getAllItem = async () => {
        const data = await MakeRequest("get", baseUrl + "item/all")
        const res = data.data

        if (res.code === 0) {
            return res.data
        }

    }
    const updateButton = async () => {
        let image = null
        console.log(file);
        // console.log(file);
        if (file.name) {
            let dataPost = new FormData()
            dataPost.append('image', file)
            image = await saveImage(dataPost)
            console.log(image.data);
        }
        if (image != null) {
            const data = {
                type: type,
                name: item.name,
                description: item.description,
                amount: item.amount,
                image: image.data.imagePath,
            }
            const url = baseUrl + "item/" + item.id
            console.log(url);
            const res = await MakeRequest('put', url, data)
            console.log(res.data);
            if (res && res.data && res.data.code === 0) {
                const allProduct = await getAllItem()
                console.log(allProduct);
                props.updateData(allProduct)
                alert("Cập nhật thành công")
                toggle()
            } else {
                alert("Cập nhật thất bại!")
            }
        } else {
            const data = {
                type: type,
                name: item.name,
                description: item.description,
                amount: item.amount,
                image: item.image
            }
            const url = baseUrl + "item/" + item.id
            console.log(url);
            const res = await MakeRequest('put', url, data)
            console.log(res.data);
            if (res && res.data && res.data.code === 0) {
                const allProduct = await getAllItem()
                console.log(allProduct);
                props.updateData(allProduct)
                alert("Cập nhật thành công")
                toggle()
            } else {
                alert("Cập nhật thất bại!")
            }
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
                            <FormGroup style={{ display: 'flex' }} >
                                <Label style={{ paddingTop: '6px', paddingRight: '100px' }}>Số lượng trong kho</Label>
                                <Input type="number" name="amount" value={item.amount} style={{ color: '#000', width: '200px' }} onChange={(e) => { handleChange(e) }} ></Input>
                            </FormGroup>
                            <FormGroup check style={{ padidngTop: '10px', paddingBottom: '10px' }}>
                                <Label style={{ paddingRight: '200px' }} check>
                                    <Input type="radio" value={1} name="radio1" checked={isChecked}
                                        onChange={(e) => handleCheckBox(e)} /> {'     '}Quần
                                </Label>
                                <Label check>
                                    <Input type="radio" value={2} name="radio1" checked={!isChecked}
                                        onChange={(e) => handleCheckBox(e)} /> {'     '}Áo
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
                            <FormGroup className='image_preview'>
                                <div style={{
                                    float: 'right', width: '300px', height: '200px',
                                    marginRight: '100px', display: 'flex', border: '1px solid #e1e1ef'
                                }} >
                                    {preview()}
                                </div>
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => updateButton()}>Cập nhật</Button>

                    <Button color="secondary" onClick={toggle}>Đóng</Button>
                </ModalFooter>
            </Modal>
        </div >
    );
}

export default DetailItem;
