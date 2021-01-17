import Header from 'components/Headers/Header'
import { baseUrl } from '../../domain'
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
import './Modalhome.css'

function AddNews() {
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
        if (file.length < 2) {
            alert("Thêm ảnh cho tin tức")
        } else {
            const res = await saveImage(dataPost)
            if (res.code === 0) {
                const product = {
                    image: res.data.imagePath,
                    title: item.title,
                    content: item.content,
                    view: 0
                }
                const data = await saveProduct(product)
            }
        }
    }
    const saveProduct = async (product) => {
        const res = await MakeRequest('post', baseUrl + `news/create`, product)
        if (res.data && res.data.code === 0) {
            alert("Thêm tin tức thành công")
            return res.data
        } else {
            alert("Thêm tin tức thất bại!")
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
                    <img height={200} src={pathFile || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaJHHovVO36rCgZDgAad5hchXWr1ZSil8bfw&usqp=CAU"} />
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
                        <Col style={{ paddingLeft: '100px', paddingTop:'50px', paddingRight:'50px'}}>
                            <FormGroup >
                                <Label> Tiêu đề</Label>
                                <Input name='title' value={item.name} style={{ color: '#000', }} onChange={(e) => { handleChange(e) }} ></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>  Mô tả </Label>
                                <Input id="description-input" type="textarea" name="content" value={item.description} style={{ color: '#000' }} onChange={(e) => { handleChange(e) }}></Input>
                            </FormGroup>
                            <div>
                                <div style={{ paddingLeft: '30px' }}>
                                    <label for="file-upload" className="custom-file-upload">Tải ảnh minh họa</label>
                                    <Input name='pathFile' id="file-upload" type="file"
                                        style={{ display: 'none' }} onChange={(e) => handleFile(e)} />
                                </div>
                            </div>
                            <FormGroup className='image_preview' style={{display:'flex'}}>
                                <div style={{
                                    float: 'right', width: '300px', height: '200px',
                                    marginRight: '100px', display: 'flex', border: '1px solid #e1e1ef'
                                }} >
                                    {preview()}
                                </div>
                            </FormGroup>
                            <div style={{paddingBottom:'20px'}}>
                                <Button color="info" onClick={() => {
                                    handleClick()
                                }} >Thêm tin mới</Button>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Container>
        </>
    )
}

export default AddNews