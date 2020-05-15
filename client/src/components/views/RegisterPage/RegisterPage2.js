import React, { useState } from 'react'
import axios from 'axios'
import { Card } from 'antd';
import { Button } from 'react-bootstrap';
import CheckBox from '../Sections/CheckBox';

function RegisterPage2(props) {

    const [category, setCategory] = useState(null);
    const [Filters, setFilters] = useState([]);
    const [show, setShow] = useState('');

    const onClick = async () => {

        try {
            const res = await axios.get('/api/categories');
            setCategory(res.data);
            setShow('none');
            console.log(show);
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
                color: 'black',
                border: '1px solid black',
                padding: 0,
                width: '90%',
                height: '40px',
                margin: '0 auto',
                fontSize: '16px',
                display: `${show}`
            }}
                onClick={onClick}>
                카테고리 선택
            </Button>
            <Card style={{
                padding: '0px',
                border:'none',
                textAlign: 'left',
                fontSize: '16px'
            }}>
                <CheckBox
                    List={category}
                    handleFilters={filter => handleFilters(filter)} />
            </Card>
            <br />
            <br />
        </div>
    )
}

export default RegisterPage2