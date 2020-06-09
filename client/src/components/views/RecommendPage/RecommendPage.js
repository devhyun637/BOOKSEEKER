import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

const sampleImage1 = '/images/booktrailer2.jpeg'
const sampleImage2 = '/images/booktrailer2.jpeg';
const sampleImage3 = '/images/booktrailer3.jpeg';

//스타일 component
const RecommandCard = styled.div`
    margin: 30px 0;
`;

const RecommandName = styled.h3`
    margin: 10px 30px;
`;

const RecommandList = styled.ul`
    white-space: nowrap;
    overflow-x: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const RecommandListLi = styled.li`
    list-style: none;
    display: inline-block;
    margin: 10px;
    width: 214px;
`;

const Image1 = styled.div`
    background-image: url(${props => props.bgUrl})
    width: 214px;
    height: 130px;
    background-size: cover;
    background-position: center;
`;

const Image2 = styled.img.attrs({
    src: `${sampleImage2}`
})`
    width: 214px;
    height: 130px;
    background-size:cover;
    background-position: center;
`;

const Image3 = styled.img.attrs({
    src: `${sampleImage3}`
})`
    width: 214px;
    height: 130px;
    background-size:cover;
    background-position: center;
`;

const RecommandLink = styled(Link)`  
    color: black;
    &:hover {
        text-decoration: none;
} 
`;

const Name = styled.p`
    font-weight: bold;
    color: black;
    margin-top: 10px;
    margin-bottom: 0;
    overflow: hidden; 
    text-overflow: ellipsis;
    width: inherit;
`;


function RecommendPage(props) {

    const trailer_id = 8;
    const [todayBookTrailer, setTodayBookTrailer] = useState("");

    useEffect(() => {
        async function fetchData() {
            await axios.get('/api/python/case1').then(res => {

                setTodayBookTrailer(res.data.data.map(
                    (data, index) => (
                        <RecommandListLi key={data.trailer_id}>
                            <RecommandLink to={`/booktrailer/${data.trailer_id}`}>
                                <div style={{
                                    backgroundImage: `url(${data.thumbnail})`,
                                    width: '214px',
                                    height: '130px',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    border: '1px solid black'
                                }}></div>
                                <Name>{data.title}</Name>
                            </RecommandLink>
                        </RecommandListLi>
                    )

                ));
            }).catch(e => {
                console.log(e);
            });
        }

        fetchData();
    }, []);


    return (
        <div>
            <form>
                <Button style={{
                    display: 'block',
                    border: "0px",
                    background: "f7f7f7",
                    color: "#222222",
                    width: '90%',
                    height: '40px',
                    fontSize: '20px',
                    margin: '30px auto',
                    boxShadow: '0 4px 12px 0 rgba(0,0,0,0.1), 0 3px 10px 0 rgba(0,0,0,0.19)'
                }}
                    href="/search"
                    variant="outline-secondary">
                    검색
                    </Button>
            </form>

            {/* 북트레일러 추천페이지 */}
            <div>
                <RecommandCard>
                    <RecommandName>오늘의 북트레일러</RecommandName>
                    <RecommandList>
                        {todayBookTrailer}
                    </RecommandList>
                </RecommandCard>

                <RecommandCard>
                    <RecommandName>00 관련 북트레일러1</RecommandName>
                    <RecommandList>
                        <RecommandListLi>
                            <RecommandLink to="">
                                <Image1 />
                                <Name>사소한 개인의 사소한 것에 대한 사소한 취향</Name>
                            </RecommandLink>
                        </RecommandListLi>
                        <RecommandListLi>
                            <RecommandLink to="">
                                <Image2 />
                                <Name>홍남권 작가의 역사소설, 안시성</Name>
                            </RecommandLink>
                        </RecommandListLi>
                        <RecommandListLi>
                            <RecommandLink to={`/booktrailer/${trailer_id}`}>
                                <Image3 />
                                <Name>몽실이 몽실이 몽실언니</Name>
                            </RecommandLink>
                        </RecommandListLi>
                    </RecommandList>
                </RecommandCard>

                <RecommandCard>
                    <RecommandName>00 관련 북트레일러2</RecommandName>
                    <RecommandList>
                        <RecommandListLi>
                            <RecommandLink to="">
                                <Image1 />
                                <Name>사소한 개인의 사소한 것에 대한 사소한 취향</Name>
                            </RecommandLink>
                        </RecommandListLi>
                        <RecommandListLi>
                            <RecommandLink to="">
                                <Image2 />
                                <Name>홍남권 작가의 역사소설, 안시성</Name>
                            </RecommandLink>
                        </RecommandListLi>
                        <RecommandListLi>
                            <RecommandLink to="">
                                <Image3 />
                                <Name>몽실이 몽실이 몽실언니</Name>
                            </RecommandLink>
                        </RecommandListLi>
                    </RecommandList>
                </RecommandCard>
            </div>
        </div>
    )
}

export default RecommendPage