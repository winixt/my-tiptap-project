import React, { useState } from 'react';
import styled from 'styled-components';
import ColorIcon from '../icons/color';
import BgIcon from '../icons/bg-color';


const ColorPickerWrap = styled.span`
display: inline-block;
position: relative;
padding: 3px 5px;
`;

const ColorPickerStyle = styled.div`
position: absolute;
top: 25px;
display: grid;
grid-gap: 4px;
grid-template-columns: repeat(7, 16px);
padding: 4px;
background-color: #fff;
z-index: 999;
box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
`;

const ColorCell = styled.span`
display: inline-block;
height: 16px;
`


const PickerIcon = (props) => {
    
    if (props.type === 'bg') {
        return <BgIcon onClick={props.onClick} />
    }

    return <ColorIcon onClick={props.onClick} />
}

const ColorPicker = (props) => {
    const [visible, setVisible] = useState(false);

    const pickColor = (color) => {
        setVisible(false);
        props.onSelect(color);
    };
    const toggleColor = () => {
        setVisible(!visible)
    };

    

    return <ColorPickerWrap>
        <PickerIcon type={props.type} onClick={toggleColor} />
        {
            visible && <ColorPickerStyle>
            {
                props.colors.map((color) => {
                    return <ColorCell key={color} onClick={() => pickColor(color)} style={{backgroundColor: color}}></ColorCell>
                })
            }
        </ColorPickerStyle>
        }
    </ColorPickerWrap>
}

export default ColorPicker;