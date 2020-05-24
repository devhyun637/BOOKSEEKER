import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.div`
    width: 100%;
    background-color: #ffffff;
    padding: 10px 20px;
    border-top: 1px solid #f7f7f7;
`;

const NavList = styled.ul`
    margin: 0px;
    padding-left: 0px;
    list-style-type: none;
    align-itmes:center;
    width: 100%;
`;

const NavListItems = styled.li`
    width: 25%;
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
    font-size: 13px;
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
            <p>{userName}</p>
            <p>{userEmail}</p>

            <Nav>
                    <NavList>
                        <NavListItems>
                            <NavListLink to="#">
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
                    </NavList>
                </Nav>

            <button onClick={onClickHandler}>
                로그아웃
            </button>
        </div>
    )
}

export default Mypage
