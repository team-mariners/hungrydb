import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Index = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    return (
        <div>
            <h1>Hello!</h1>
            <Button type="button" onClick={() => setIsModalVisible(true)}>Hit me!</Button>
            <Modal show={isModalVisible} onHide={() => setIsModalVisible(false)}>
                Modal body!
            </Modal>
        </div>
    )
};

export default Index;