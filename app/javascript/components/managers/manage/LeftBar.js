import React from 'react';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Cat from '../../../../assets/images/cat.jpg';

const LeftBar = () => {
    return (
        <div className="manager-left-bar">
            <Image src={Cat} fluid></Image>
            <div className="manager-left-bar-info">
                <p><b>Name: </b>Ameens</p>
                <p><b>Restaurant ID: </b>123</p>
                <p><b>Min Orders Cost: </b>$10</p>
            </div>
            <Button type="button">Edit Details</Button>
        </div>
    )
};

export default LeftBar;