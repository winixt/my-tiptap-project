import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import AlignLeftIcon from '../icons/align-left';
import AlignCenterIcon from '../icons/align-center';
import AlignRightIcon from '../icons/align-right';
import AlignJustifyIcon from '../icons/align-justify';



const PickerWrap = styled.span`
display: inline-block;
position: relative;
padding: 3px 5px;
`;

const PickerListStyle = styled.div`
    position: absolute;
    top: 28px;
    padding: 4px;
    background-color: #fff;
    z-index: 999;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
    & svg {
        cursor: pointer;
        &:hover {
            color: #1677ff;
        }
    }
`

const alignList = [
    {
        component: AlignLeftIcon,
        label: 'left'
    },
    {
        component: AlignCenterIcon,
        label: 'center'
    },
    {
        component: AlignRightIcon,
        label: 'right'
    },
    {
        component: AlignJustifyIcon,
        label: 'justify'
    }
]

const HeadPicker = (props) => {
    const [visible, setVisible] = useState(false);
    const toggleSelectHeading = () => {
        setVisible(!visible)
    };

    const pickAlign = (item) => {
        setVisible(false);
        props.onSelect(item.label);
    }

    const CurrentAlignComp = useMemo(() => {
        const currentAlign = alignList.find(item => item.label === props.currentAlign);
        return currentAlign ? currentAlign.component : alignList[0].component;
    }, [props.currentAlign])

    return <PickerWrap>
        <CurrentAlignComp onClick={toggleSelectHeading}></CurrentAlignComp>
        {visible && <PickerListStyle>
                {
                    alignList.map(item => {
                        return <item.component key={item.label} onClick={() => pickAlign(item)} />
                    })
                }
            </PickerListStyle>}
    </PickerWrap>
}

export default HeadPicker;