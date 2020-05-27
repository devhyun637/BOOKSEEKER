import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

function PythonPage(props) {

    const [contents, setContents] = useState("");
    
    const handleClick = () =>{

        axios.get('/api/python/test').then(res => {
            console.log(res);
            setContents(<h1>res.data.data</h1>);
        });
    }


    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            
                <Button onClick={handleClick}>
                    페이지 보기
                </Button>
            파이썬: {contents}
        </div>
    )
}

export default withRouter(PythonPage);