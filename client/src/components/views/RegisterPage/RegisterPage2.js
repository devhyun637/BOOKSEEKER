import React, { useState } from 'react'
import axios from 'axios'
import { Button, Card } from 'antd';
import CheckBox from '../Sections/CheckBox';

function RegisterPage2(props) {

    const [category, setCategory] = useState(null);
    const [Filters, setFilters] = useState([]);

    const onClick = async () => {
        try {
            const res = await axios.get('/api/categories');
            setCategory(res.data);
        } catch (e) {
            console.log(e)
        }
    }

    const handleFilters = (filter) => {
        let newFilters = [...Filters];
        newFilters = filter;

        setFilters(newFilters);
        props.handleCategory(newFilters)

    }

    return (
        <div style={{ position: 'relative', textAlign: 'center' }}>
            <Button style={{
                background: 'white',
                color: 'blue',
                border: '1px solid blue',
                padding: 0,
                width: '80%',
                margin: '0 auto'
            }}
                block
                onClick={onClick}
                className="bnt">
                카테고리 선택
            </Button>
            <Card style={{ padding: '0px', border: 'none', textAlign: 'left' }}>
                <CheckBox List={category} handleFilters={filter => handleFilters(filter)} />
            </Card>
        </div>
    )
}

export default RegisterPage2