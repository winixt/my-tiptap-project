import React, { useState } from 'react';
import styled from 'styled-components';
import ColorIcon from '../icons/color';


const ColorPickerWrap = styled.span`
display: inline-block;
position: relative;
`;

const ColorPickerStyle = styled.div`
position: absolute;
top: 25px;
display: grid;
grid-gap: 4px;
grid-template-columns: repeat(7, 16px);
`




const ColorPicker = (props) => {
    const [visible, setVisible] = useState(false);

    const pickColor = (color) => {
        console.log(color);
        setVisible(false);
    };
    const showColor = () => {
        console.log(visible);
        setVisible(true)
    }

    return <ColorPickerWrap>
        <ColorIcon onClick={showColor} />
        {
            visible && <ColorPickerStyle>
            {
                props.colors.map((color) => {
                    return <span onClick={() => pickColor(color)} style={{backgroundColor: color}}></span>
                })
            }
        </ColorPickerStyle>
        }
    </ColorPickerWrap>
}

export default ColorPicker;