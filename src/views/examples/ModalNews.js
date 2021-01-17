
import { baseImage, baseUrl } from '../../domain';
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Col, Row } from 'reactstrap';
import Label from 'reactstrap/lib/Label';
import MakeRequest from 'views/MakeRequest';
import './Modalhome.css'
const ModalNews = (props) => {
    const [addAmount, setAdd] = useState(1)
    const [amount, setAmount] = useState(1)
    const [minusAmount, setMinus] = useState(0)
    const {
        data,
        buttonLabel,
        className
    } = props;
    useState(() => {
    }, [])
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const handleClick = async () => {
        toggle()
        console.log(1111111111111);
        const res = await MakeRequest("put", baseUrl + "news/increaseView/" + data.id)
        if (res && res.data && res.data.code === 0) {
            console.log(res.data.data);
            const listData = await MakeRequest("get", baseUrl + "news/all")
            if (listData && listData.data && listData.data.code === 0) {
                console.log(listData.data);
                props.reload(listData.data.data)
            }
        }
    }
    return (
        <div>
            <Button style={{ position: 'absolute', zIndex: '1', marginTop: '-50px', marginLeft: '50px' }} color="danger" onClick={() => { handleClick() }}>Chi tiết</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}  >
                    {data.title.toUpperCase()}
                    {/* Lượt xem: {data.view} */}
                </ModalHeader>
                <ModalBody>

                    <Row>
                        <FormGroup>
                            <img style={{ width: '450px' }} src={baseImage + data.image || "https://e3.365dm.com/20/12/768x432/skynews-papers-thursday_5201469.jpg?20201209232059"} />
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup>
                            <p style={{ color: '#000' }}>{data.content}</p>
                        </FormGroup>
                    </Row>

                </ModalBody>

                <ModalFooter>

                    <Button color="secondary" onClick={toggle}>Đóng</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalNews;
