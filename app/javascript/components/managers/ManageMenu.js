import React, { useState } from 'react';
import ToolBar from './manageMenu/ToolBar';
import Modal from '../utilities/Modal';
import Button from 'react-bootstrap/Button';

const ManageMenu = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    return (
        <div className="p-3">
            <h1>Menu</h1>
            <ToolBar />
            <Button type="button" onClick={() => setIsModalVisible(true)}>Hit me!</Button>
            <Modal show={isModalVisible} onClose={() => setIsModalVisible(false)}>
                <h1>Hello!</h1>
            </Modal>
        </div>
    )
};

export default ManageMenu;