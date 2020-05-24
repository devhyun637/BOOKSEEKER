import React, { useState } from 'react';
import { withRouter } from 'react-router';
import APISearch from '../SearchPage/APISearch';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import axios from 'axios';

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
    const [Hashtags, setHashtags] = useState([]);
    const [Authors, setAuthors] = useState([]);
    const [publisher, setPublisher] = useState("");

    const componentDidMount = () => {
        const info = props.history.location.state

        let body = {
            email: info.email,
            name: info.name,
            password: info.password,
            confirmpassword: info.confirmpassword,
            birthDate: info.birthDate,
            gender: info.gender,
            categoryIds: info.categoryIds,
            hashtags: info.hashtags,
            book: Hashtags,
            publisher: publisher,
            authors: Authors
        }

        return body
    }


    const sendOnNull = (e) => {
        e.preventDefault();
        alert("정교한 책추천이 어렵습니다. 그래도 건너뛰시겠습니까?");
        setSkipButtonShow('none');
        setRegisterButtonShow('');
    }

    // 
    const sendRegister = (e) => {
        e.preventDefault();
        let data = componentDidMount()
        console.log(data);

        axios.post('/api/users/register', data)
            .then((res) => {
                if (res.data.isRegisterSuccess) {
                    console.log("회원가입 성공!")
                    props.history.push('/login');
                } else {
                    alert(res.data.message)
                }
            })

    }

    //APISearch에서 받아온 책정보 book state에 저장
    const handleHashtag = (filter) => {
        // console.log("API에서 받아온 책 정보: ", filter);
        let data = componentDidMount().hashtags;
        let newHashtag = [...data];

        for (let i = 0; i < filter.length; i++) {
            newHashtag.push(filter[i]);
        }
        setPublisher(filter[0]);
        setAuthors(filter.slice(1,));
        setHashtags(newHashtag);
        setRegisterButtonShow('');
    }

    return (
        <Box>
            <Title>
                가장 기억에 남는 <br />
                책을 알려주세요.
            </Title>
            <br />
            <APISearch handleHashtag={filter => handleHashtag(filter)} />
            <br />
            <form onSubmit={sendOnNull}>
                <Button style={{
                    margin: "10px",
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
                    margin: "10px",
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