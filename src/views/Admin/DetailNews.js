
import { baseUrl, baseImage } from '../../domain';

import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Col, Row } from 'reactstrap';
import Label from 'reactstrap/lib/Label';
import MakeRequest from 'views/MakeRequest';
import imageDefault from './default.png'
import './Modalhome.css'
const DetailNews = (props) => {
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
                    <img style={{ width: '300px', height: '200px' }} src={pathFile} />
                    <Button onClick={(e) => clearFile()}>x</Button>
                </>
            ) : (
                item.image === null ? (<img style={{ width: '300px', height: '200px' }} src={imageDefault} />) : (<img style={{ width: '300px', height: '200px' }} src={baseImage + item.image} />)

            )
        return show
    }
    const getAllItem = async () => {
        const data = await MakeRequest("get", baseUrl + "news/all")
        const res = data.data

        if (res.code === 0) {
            return res.data
        }

    }
    const saveImage = async (dataPost) => {
        const res = await MakeRequest('post', baseUrl + `upload/photo`, dataPost
            , {
                'Content-Type': 'multipart/form-data'
            }
        )
        if (res.data && res.data.code === 0) {
            return res.data

        } else {
            alert('Không lưu được ảnh!')
        }
    }
    const updateButton = async () => {
        let image = null;
        if (file.name) {
            let dataPost = new FormData()
            dataPost.append('image', file)
            image = await saveImage(dataPost)
            console.log(image.data);
        }
        if (image != null) {
            const data = {
                title: item.title,
                content: item.content,
                view: 0,
                image: image.data.imagePath,

            }
            const res = MakeRequest('put', baseUrl + "news/" + item.id, data)
            if (res && res.data && res.data.code === 0) {
                const allNews = await getAllItem()
                console.log(allNews);
                props.updateData(allNews)
                alert("Cập nhật thành công")
                toggle()
            } else {
                alert("Cập nhật thất bại!")
            }
        } else {
            const data = {
                title: item.title,
                content: item.content,
                view: 0,
                image: item.image,

            }
            const res = MakeRequest('put', baseUrl + "news/" + item.id, data)
            if (res && res.data && res.data.code === 0) {
                const allNews = await getAllItem()
                console.log(allNews);
                props.updateData(allNews)
                alert("Cập nhật thành công")
                toggle()
            } else {
                alert("Cập nhật thất bại!")
            }
        }
    }
    useEffect(() => {
     }, [item])

    return (
        <div>
            <Button color="info" onClick={toggle}>Chi tiết</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>
                    <h5>{data.title.toUpperCase()}</h5>
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>

                            <FormGroup >
                                <Label> Tiêu đề </Label>
                                <Input name='title' value={item.title} style={{ color: '#000' }} onChange={(e) => { handleChange(e) }} ></Input>
                            </FormGroup>



                            <FormGroup>
                                <Label>  Nội dung </Label>
                                <Input id="description-input" type="textarea" name="content" value={item.content} style={{ color: '#000' }} onChange={(e) => { handleChange(e) }}></Input>
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
                    {/* <Button color="success" onClick={() => updateButton()}>Cập nhật</Button> */}

                    <Button color="secondary" onClick={toggle}>Đóng</Button>
                </ModalFooter>
            </Modal>
        </div >
    );
}

export default DetailNews;
