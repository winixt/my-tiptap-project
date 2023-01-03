import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import ArrowDownIcon from '../icons/arrow-down'



const PickerWrap = styled.span`
display: inline-block;
position: relative;
padding: 3px 5px;
`;

const SelectInput = styled.span`
    display: inline-flex;
    width: 98px;
    font-weight: bold;
    justify-content: space-between;
    align-items: center;
    padding: 2px 4px;
    color: #333;
    border: 1px solid #dbdbdb;
    cursor: pointer;
`

const PickerListStyle = styled.div`
    position: absolute;
    top: 28px;
    padding: 4px;
    background-color: #fff;
    z-index: 999;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
    & h1, & h2, & h3, & h4, & h5, & h6 {
        white-space: nowrap;
        margin: 8px 0;
        cursor: pointer;
        &:hover {
            color: #1677ff;
        }
    }
`

const headList = [
    {
        level: 1,
        tag: 'h1',
        label: 'Heading 1'
    },
    {
        level: 2,
        tag: 'h2',
        label: 'Heading 2'
    },
    {
        level: 3,
        tag: 'h3',
        label: 'Heading 3'
    },
    {
        level: 4,
        tag: 'h4',
        label: 'Heading 4'
    },
    {
        level: 5,
        tag: 'h5',
        label: 'Heading 5'
    },
    {
        level: 6,
        tag: 'h6',
        label: 'Heading 6'
    }
]

const HeadPicker = (props) => {
    const [visible, setVisible] = useState(false);
    const toggleSelectHeading = () => {
        setVisible(!visible)
    };

    const pickHeading = (item) => {
        setVisible(false);
        props.onSelect(item.level);
    }

    const currentHeading = useMemo(() => {
        const currentHead = headList.find(item => item.level === props.currentLevel);
        return currentHead ? currentHead.label : 'Normal';
    }, [props.currentLevel])

    return <PickerWrap>
        <SelectInput onClick={toggleSelectHeading}> {currentHeading} <ArrowDownIcon style={{color: '#bfbfb', transition: 'all 0.3s', transform: visible ? 'rotate(-180deg)' : ''}} /> </SelectInput>
        {visible && <PickerListStyle>
                {
                    headList.map(item => {
                        return <item.tag key={item.level} onClick={() => pickHeading(item)}>{item.label}</item.tag>
                    })
                }
            </PickerListStyle>}
    </PickerWrap>
}

export default HeadPicker;