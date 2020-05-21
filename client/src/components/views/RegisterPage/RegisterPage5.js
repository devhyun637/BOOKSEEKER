import React, { useState } from 'react';
import { withRouter } from 'react-router';
import APISearch from '../SearchPage/APISearch';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

//스타일 component
const Box = styled.div`
    width: 100%;
    height: auto;
    // border: 1px solid black;
    text-align: center;
    positon: absolute;
    left: 50%;
    top: 50%;

    transform: translate(0,25%);
`;

const Title = styled.h2`
    margin: 20px;
    text-align: left;
`;

function RegisterPage5(props) {
    const [skipButtonShow, setSkipButtonShow] = useState('');
    const [registerButtonShow, setRegisterButtonShow] = useState('none');

    const sendOnNull = (e) => {
        e.preventDefault();
        alert("정교한 책추천이 어렵습니다. 그래도 건너뛰시겠습니까?");
        setSkipButtonShow('none');
        setRegisterButtonShow('');
    }

    const sendRegister = (e) => {
        e.preventDefault();

        //회원가입 코드 여기서 넣어주기
    }

    return (
        <Box>
            <Title>
                가장 기억에 남는 <br />
                책을 알려주세요.
            </Title>
            <br />
            <APISearch />
            <br />
            <form onSubmit={sendOnNull}>
                <Button style={{
                    margin: "20px",
                    border: "0.5px solid #717171",
                    backgroundColor: "white",
                    color: "gray",
                    display: `${skipButtonShow}`
                }}
                    type="submit"
                >건너뛰기</Button>
            </form>

            <form onSubmit={sendRegister}>
                <Button style={{
                    margin: "20px",
                    border: "0.5px solid #717171",
                    backgroundColor: "black",
                    color: "white",
                    display: `${registerButtonShow}`
                }}
                    type="submit"
                >회원가입</Button>
            </form>
        </Box>
    )
}

export default withRouter(RegisterPage5)