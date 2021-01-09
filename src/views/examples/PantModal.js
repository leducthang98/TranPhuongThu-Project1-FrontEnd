
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Col, Row } from 'reactstrap';
import Label from 'reactstrap/lib/Label';
import './Modalhome.css'
import { baseImage } from '../../domain'

const HomeModal = (props) => {
    const {
        data,
        buttonLabel,
        className
    } = props;
    useState(() => {
        //console.log(props.data);
    }, [])
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (
        <div>
            <Button style={{ position: 'absolute', zIndex: '1', marginTop: '-50px', marginLeft: '50px' }} color="danger" onClick={toggle}>Chi tiết</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}> Thông tin áo {data.name.toLowerCase()}</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col> <FormGroup>
                            <img style={{ width: '450px' }} thumb src={baseImage+data.image||"../../assets/img/default.png"} />

                        </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <p style={{ color: '#000' }}>{data.description}</p>
                            </FormGroup>
                            <div style={{ paddingTop: '20px', textAlign: 'center' }}>
                                <i class="fas fa-plus-circle"></i>
                                <label style={{
                                    width: '80px', height: '30px', border: '1px solid #525f7f',
                                    textAlign: 'center'
                                }}>{data.amount}</label>
                                <i class="fas fa-minus-circle"></i>
                            </div>
                        </Col>
                    </Row>
                </ModalBody>

                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default HomeModal;
