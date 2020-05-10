import React, { useState } from 'react'
import { Checkbox } from 'antd';

function CheckBox(props) {

    const [Checked, setChecked] = useState([]);

    const handleToggle = (value) => {

        //누른 것의 인덱스
        //currentIndex 가 -1이면 안눌린것
        const currentIndex = Checked.indexOf(value);

        //전체 Checked된 State에서 현재 누른 Checkbox가 이미 있다면
        const newChecked = [...Checked]

        if (currentIndex === -1) {
            //State에 넣어준다.
            newChecked.push(value)
        } else {
            //빼주고
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked);
        props.handleFilters(newChecked)
    }

    const renderCheckboxList = () =>

        props.List && props.List.map((value, index) => {
            return <React.Fragment key={index}>
                <Checkbox onChange={() => handleToggle(value.id)} checked={Checked.indexOf(value.id) === -1 ? false : true} />
                <span style={{ padding: '5px' }}>
                    {value.categoryName}
                </span>
                <br />
            </React.Fragment >
        });

    return (
        <div>
            {renderCheckboxList()}
        </div>
    )
}

export default CheckBox