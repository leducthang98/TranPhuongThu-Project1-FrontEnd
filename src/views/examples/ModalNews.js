
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Col, Row } from 'reactstrap';
import Label from 'reactstrap/lib/Label';
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

    return (
        <div>
            <Button style={{ position: 'absolute', zIndex: '1', marginTop: '-50px', marginLeft: '50px' }} color="danger" onClick={toggle}>Chi tiết</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>  {data.title.toLowerCase()}</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>
                            <FormGroup>
                                <img style={{ width: '450px' }} src={data.image} />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <p style={{ color: '#000' }}>{data.description}</p>
                            </FormGroup>
                        </Col>
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
