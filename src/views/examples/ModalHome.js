
import { baseImage } from 'domain';
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Col, Row } from 'reactstrap';
import Label from 'reactstrap/lib/Label';
import './Modalhome.css'
const HomeModal = (props) => {
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
    const handleAddToCart = () => {

        setModal(!modal);
    }
    return (
        <div>
            <Button style={{ position: 'absolute', zIndex: '1', marginTop: '-50px', marginLeft: '50px' }} color="danger" onClick={toggle}>Chi tiết</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}> {data.name.toLowerCase()}</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>
                            <FormGroup>
                                <img style={{ width: '450px' }} src={(data.image != null) ? (baseImage + data.image) : ("../../assets/img/default.png")} />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <p style={{ color: '#000' }}>{data.description}</p>
                            </FormGroup>
                            <div style={{ paddingTop: '20px', display: 'flex', textAlign: 'center', paddingLeft: '150px' }}>
                                <button style={{ height: '30px', background: 'none', borderRight: 'none' }}>
                                    <i class="fas fa-minus-circle" onClick={() => {
                                        if (amount === 1) {
                                            setAmount(1)
                                        } else {

                                            setAmount(amount - 1)
                                        }
                                    }}></i>
                                </button>
                                <p style={{
                                    width: '80px', height: '30px', border: '1px solid #525f7f',
                                    paddingLeft: '5px', paddingRight: '5px',
                                    textAlign: 'center'
                                }}>{parseInt(amount)}</p>
                                <button style={{ height: '30px', background: 'none', borderLeft: 'none' }}>
                                    <i class="fas fa-plus-circle" onClick={() => {
                                        if (amount === data.amount) {
                                            setAdd(amount)
                                        } else {
                                            setAmount(amount + 1)
                                        }

                                    }}></i>
                                </button>
                            </div>
                        </Col>
                    </Row>
                </ModalBody>

                <ModalFooter>
                    <Button color="primary" onClick={() => {
                        handleAddToCart()
                    }}>Thêm vào giỏ hàng</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default HomeModal;
