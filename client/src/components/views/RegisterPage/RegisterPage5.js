import React, { useState } from 'react';
import { withRouter } from 'react-router';
import APISearch from '../SearchPage/APISearch';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { SecurityScanTwoTone } from '@ant-design/icons';

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
    const [book, setbook] = useState([])
    const [Hashtags, setHashtags] = useState([])

    const componentDidMount = () => {
        const info = props.history.location.state
        console.log("책씨바", book)
        
        let body = {
             email: info.email,
             name: info.name,
             password: info.password,
             confirmpassword: info.confirmpassword,
             birthDate: info.birthDate,
             gender: info.gender, 
             categoryIds: info.categoryIds,
             hashtags: info.hashtags,
             book: book
    
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

        // console.log("책정보", bookinfo)
        console.log("바로 회원가입?",data)
        // console.log("한번찍어보자 해시태그", data.hashtags)
       
        axios.post('/api/users/register', data)
                    .then((res) => {
                         if (res.data.isRegisterSuccess) {
                             console.log("회원가입 성공!")
                         } else {
                               alert(res.data.message)
                          }
                          })
                     
        
        //회원가입 코드 여기서 넣어주기
    }


    //APISearch에서 받아온 책정보 book state에 저장
    const onSearchSubmit = (book)  => {
        console.log("API에서 받아온 책 정보: ", book);
        setbook(book)
        
    }

    return (
        <Box>
            <Title>
                가장 기억에 남는 <br />
                책을 알려주세요.
            </Title>
            <br />
            <APISearch onSubmit={onSearchSubmit} />
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