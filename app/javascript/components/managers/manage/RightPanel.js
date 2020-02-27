import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const RightPanel = () => {
    const [selectedValue, setSelectedValue] = useState('Menu');


    return (
        <div className="manager-right-panel">
            <Dropdown>
                <Dropdown.Toggle>
                    {selectedValue}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={(event) => console.log(event.target.value)}>Menu</Dropdown.Item>
                    <Dropdown.Item>Promo</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default RightPanel;