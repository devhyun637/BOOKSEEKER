import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

const NavListI = styled.i`
    height: 20px;
`;

const NavListName = styled.div`
    color: inherit;
    font-size: 13px;
`;

function Navigation() {
    return (
        <Nav>
            <NavList>
                <NavListItems>
                    <NavListLink to="/community">
                        <NavListIcon>
                            <NavListI className="fas fa-home fa-lg"></NavListI>
                        </NavListIcon>
                        <NavListName>
                            커뮤니티
                        </NavListName>
                    </NavListLink>
                </NavListItems>

                <NavListItems>
                    <NavListLink to="/recommend">
                        <NavListIcon>
                            <NavListI className="fas fa-search fa-lg"></NavListI>
                        </NavListIcon>
                        <NavListName>
                            추천
                        </NavListName>
                    </NavListLink>
                </NavListItems>

                <NavListItems>
                    <NavListLink to="/timeline">
                        <NavListIcon>
                            <NavListI className="far fa-heart fa-lg"></NavListI>
                        </NavListIcon>
                        <NavListName>
                            타임라인
                        </NavListName>
                    </NavListLink>
                </NavListItems>

                <NavListItems>
                    <NavListLink to="/login">
                        <NavListIcon>
                            <NavListI className="fas fa-user fa-lg"></NavListI>
                        </NavListIcon>
                        <NavListName>
                            마이페이지
                        </NavListName>
                    </NavListLink>
                </NavListItems>
            </NavList>
        </Nav>
    )
}

export default Navigation;