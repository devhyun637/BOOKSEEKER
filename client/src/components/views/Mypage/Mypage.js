import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.div`
    width: 100%;
    background-color: #ffffff;
    padding: 10px 20px;
    border-top: 1px solid gray;
`;

const NavList = styled.ul`
    margin: 0px;
    padding-left: 0px;
    list-style-type: none;
    align-itmes:center;
    width: 100%;
`;

const NavListItems = styled.li`
    padding: 5px 5px;
    border-bottom: 2px solid #f7f7f7;
`;

const NavListLink = styled(Link)`  
    color: #717171;
    &:hover {
        text-decoration: none;
        color: rgb(4, 146, 194);
    } 
`;

const NavListIcon = styled.div``;

const NavListName = styled.div`
    color: inherit;
    font-size: 20px;
`;

function Mypage() {

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const handleUserName = (userName) => {
        let data = userName;
        setUserName(data);
    }

    const handleUserEmail = (userEmail) => {
        let data = userEmail;
        setUserEmail(data);
    }

    const onClickHandler = () => {
        axios.get('/api/users/logout')
            .then(res => {
                if (res.data.isLogoutSuccess) {
                    document.location.href = "/";
                } else {
                    alert('로그아웃 실패');
                }
            });
    }

    axios.get('/api/users/search')
        .then(res => {
        if (res.data.isSearchSuccess) {
            handleUserName(res.data.name);
            handleUserEmail(res.data.email);
        } else {
            alert(res.data.message);
        }
    })


    return (
        <div>
            <br />
            <p style={{ 
                margin: '10px',
                marginBottom: '-10px',
                textAlign: 'center',
            }}>{userName}</p>
            <p style={{ 
                margin: '10px',
                marginBottom: '20px',
                textAlign: 'center',
            }}>{userEmail}</p>
            <Nav>
            <br />
                    <NavList>
                        <NavListItems>
                            <NavListLink to="/mypage/booktrailer/upload/">
                                <NavListName>
                                    북트레일러등록
                        </NavListName>
                            </NavListLink>
                        </NavListItems>

                        <NavListItems>
                            <NavListLink to="#">
                                <NavListName>
                                    등록한 북트레일러
                        </NavListName>
                            </NavListLink>
                        </NavListItems>

                        <NavListItems>
                            <NavListLink to="/likepage">
                                <NavListName>
                                    좋아요한 북트레일러
                        </NavListName>
                            </NavListLink>
                        </NavListItems>
                        
                        <NavListItems>
                            <NavListLink to="#" onClick={onClickHandler}>
                                <NavListName>
                                    로그아웃
                        </NavListName>
                            </NavListLink>
                        </NavListItems>
                    </NavList>
                </Nav>
        </div>
    )
}

export default Mypage;
