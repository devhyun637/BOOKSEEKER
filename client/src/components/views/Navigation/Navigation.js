import React, { useState } from 'react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HeartOutlined, UserOutlined, SearchOutlined, HomeOutlined } from '@ant-design/icons'
import { BsFillPersonPlusFill } from 'react-icons/bs'
import {useDispatch} from 'react-redux';
import {auth} from '../../../_actions/user_action';
import {useEffect} from 'react';


const Nav = styled.div`
    position: fixed;
    width: 100%;
    background-color: #ffffff;
    padding: 10px 20px;
    left: 0px;
    bottom: 0px;
    border-top: 1px solid #f7f7f7;
`;

const NavList = styled.ul`
    margin: 0px;
    padding-left: 0px;
    list-style-type: none;
    display: flex;
    align-itmes:center;
    justify-content: space-between;
    width: 100%;
    text-align: center;
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

function Navigation(props) {

    const [hiddenNav, sethiddenNav] = useState({
        visibility: 'visible'
    });

    const [verify, setVerify] = useState(false);

    const dispatch = useDispatch();

    //스크롤 움직이면 Navigation 숨기기
    useScrollPosition(
        ({ prevPos, currPos }) => {
            const isVisible = currPos.y > prevPos.y

            const shouldBeStyle = {
                visibility: isVisible ? 'visible' : 'hidden'
            }

            if (JSON.stringify(shouldBeStyle) === JSON.stringify(hiddenNav)) return
            sethiddenNav(shouldBeStyle)
        }, [hiddenNav]
    )

    //back에 req날리기
    useEffect(() => {
        dispatch(auth()).then(res => {
            setVerify(res.payload.verify);
        })
        
     }, []);
    

    if(verify){
        return (
            <div style={{ ...hiddenNav }}>
            <Nav>
                <NavList>
                    <NavListItems>
                        <NavListLink to="/community">
                            <NavListIcon>
                                <HomeOutlined style={{
                                    fontSize: '25px'
                                }} />
                            </NavListIcon>
                            <NavListName>
                                커뮤니티
                        </NavListName>
                        </NavListLink>
                    </NavListItems>

                    <NavListItems>
                        <NavListLink to="/recommend">
                            <NavListIcon>
                                <SearchOutlined style={{
                                    fontSize: '25px'
                                }} />
                            </NavListIcon>
                            <NavListName>
                                추천페이지
                        </NavListName>
                        </NavListLink>
                    </NavListItems>

                    <NavListItems>
                        <NavListLink to="/timeline">
                            <NavListIcon>
                                <HeartOutlined style={{
                                    fontSize: '25px'
                                }} />
                            </NavListIcon>
                            <NavListName>
                                타임라인
                        </NavListName>
                        </NavListLink>
                    </NavListItems>

                    <NavListItems>
                        <NavListLink to="/login">
                            <NavListIcon>
                                <UserOutlined style={{
                                    fontSize: '25px'
                                }} />
                            </NavListIcon>
                            <NavListName>
                                마이페이지
                        </NavListName>
                        </NavListLink>
                    </NavListItems>
                </NavList>
            </Nav>
        </div>
        )
    }else{
        return (
            <div style={{ ...hiddenNav }}>
            <Nav>
                <NavList>
                    <NavListItems>
                        <NavListLink to="/recommend">
                            <NavListIcon>
                                <SearchOutlined style={{
                                    fontSize: '25px'
                                }} />
                            </NavListIcon>
                            <NavListName>
                                추천페이지
                            </NavListName>
                        </NavListLink>
                    </NavListItems>
    
                    <NavListItems>
                        <NavListLink to="/login">
                            <NavListIcon>
                                <UserOutlined style={{
                                    fontSize: '25px'
                                }} />
                            </NavListIcon>
                            <NavListName>
                                로그인
                            </NavListName>
                        </NavListLink>
                    </NavListItems>
    
                    <NavListItems>
                        <NavListLink to="/register">
                            <NavListIcon>
                                <BsFillPersonPlusFill style={{
                                    fontSize: '25px'
                                }} />
                            </NavListIcon>
                            <NavListName>
                                회원가입
                            </NavListName>
                        </NavListLink>
                    </NavListItems>
                </NavList>
            </Nav>
            </div>
        )
    }

    
}

export default Navigation;
